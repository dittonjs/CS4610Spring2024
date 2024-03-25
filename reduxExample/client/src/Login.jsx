import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "./utils/use_api";
import { setAuthToken } from "./store/application_slice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const api = useApi();
  const dispatch = useDispatch()

  async function login(e) {
    e.preventDefault();
    const {token} = await api.post("/sessions", {
      email,
      password,
    });

    dispatch(setAuthToken(token));
    navigate("/")
  }

  return (
    <div>
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
    </div>
  )
}