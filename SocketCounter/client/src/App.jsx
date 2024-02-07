import { useEffect, useState } from 'react';
import './App.css';
import {io} from "socket.io-client";
// 144.39.198.208
function App() {
  const [count, setCount] = useState(0)
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = io();
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    const callback = (newCount) => {
      setCount(newCount);
      if (loading) {
        setLoading(false);
      }
    }
    socket.on("new state", callback);
    return () => {
      socket.off("new state", callback);
    }
  }, [socket, loading]);

  function increment() {
    socket.emit("increment");
  }

  function decrement() {
    socket.emit("decrement");
  }

  return (
    <>
      <h1>{loading ? "Loading... " : count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </>
  )
}

export default App
