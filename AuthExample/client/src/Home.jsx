import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";

export const Home = () => {
  const token = window.localStorage.getItem("jwt") || "asdfasdfasdf";
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  async function getUser() {
    const res = await fetch("/users/me", {
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });
    console.log(res);
    if (res.ok) {
      const body = await res.json();
      console.log(body)
      setUser(body.user);
    } else {
      navigate("/login")
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [])

  return (
    <>
      <div>
        <h1>I am on the home page!</h1>
        {token ? (
          <div>{user && <h1>Welcome, {user.firstName}</h1>}</div>
        ) : (
          <>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/sign_up">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}