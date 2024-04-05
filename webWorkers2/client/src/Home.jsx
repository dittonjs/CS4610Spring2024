import { useEffect, useState } from "react";
import { useApi } from "./utils/use_api";
import { useDispatch } from "react-redux";
import { setAuthToken } from "./store/application_slice";
import { requireLogin } from "./utils/require_login";


export const Home = () => {
  requireLogin();
  const [user, setUser] = useState(null);
  const api = useApi();
  const dispatch = useDispatch();
  const [fib, setFib] = useState("1");
  const [result, setResult] = useState(null);

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
      <div>
        Compute Fib
      </div>
      <input type="text" value={fib} onChange={e => setFib(e.target.value)} />
      <div>
        {/* <button onClick={computeFib}>Compute</button> */}
      </div>
      {result}
    </div>
  )
}