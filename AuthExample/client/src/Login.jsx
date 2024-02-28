import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    const res = await fetch("/sessions", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
      })
    });
    const {token} = await res.json();
    window.localStorage.setItem("jwt", token);
    navigate("/")
  }

  return (
    <>
      <h2>Login</h2>
      <form className="sign-up-form" onSubmit={login}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />

        <button>Sign In</button>
      </form>
    </>
  )
}