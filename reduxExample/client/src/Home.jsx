import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { useCounter } from "./utils/use_counter";
import { requireLogin } from "./utils/require_login";

export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const api = useApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {count, add, subtract} = useCounter();

  async function getUser() {
    const {user} = await api.get("/users/me");
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, [])

  function logout() {
    dispatch(setAuthToken(null));
  }

  return (
    <div>
      <h1>I am on the home page!</h1>
      <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
      <button onClick={logout}>Logout</button>
      <h1>{count}</h1>
      <div>
        <button onClick={add}>Increment</button>
        <button>Decrement</button>
      </div>
    </div>
  )
}