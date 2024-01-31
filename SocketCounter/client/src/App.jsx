import { useEffect, useState } from 'react';
import './App.css';
import {io} from "socket.io-client";

function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState(null);



  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [])

  useEffect(() => {
    if (!socket) return;
    socket.on("increment", () => {
      setCount(currentCount => currentCount + 1);
    });
  }, [socket])

  function increment() {
    socket.emit("increment", "Hello, world!")
  }

  function decrement() {
    socket.emit("decrement", "Hello, world!")
  }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

export default App
