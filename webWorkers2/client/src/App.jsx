import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import MyWorker from "./my_worker?worker";
import { useEffect, useState } from "react";

const App = () => {

  const [fib, setFib] = useState("1");
  const [result, setResult] = useState(null);
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const worker = new MyWorker();
    worker.addEventListener("message", ({data}) => {
      setLoading(false);
      setResult(data.payload);
    });
    setWorker(worker);
    return () => {
      worker.terminate();
    }
  }, [])

  return (
    <div>
      <div>
        Compute Fib
      </div>
      <input type="text" value={fib} onChange={e => setFib(e.target.value)} />
      <div>
        <button onClick={() => {
          setLoading(true);
          worker.postMessage({
            type: "computeFib",
            payload: parseInt(fib),
          })
        }}>Compute</button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) :
        result
      }
    </div>
  );
}

export default App
