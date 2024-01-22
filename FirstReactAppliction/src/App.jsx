import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Message} from "./Message";

function App() {
  const [count, setCount] = useState(0);
  console.log(count)
  return (
    <div>
      <button id="my-button" onClick={() => setCount(count + 1)}>{count}</button>
      <Message name="Joseph" age={32} />
      <Message name="Catelyn" age={29} />
    </div>
  )
}


export default App
