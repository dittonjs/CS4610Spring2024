import { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    })
    console.log(await res.json());
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

        <button>Create Account</button>
      </form>
    </>
  )
}