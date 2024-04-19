import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 } from 'uuid';
import {getDatabase, ref, set, onChildAdded, off} from "firebase/database";


function App() {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("Anonymous User");
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    const id = v4();
    const db = getDatabase();
    console.log(message, userName, id);
    await set(
      ref(db, `/messages/${id}`),
      {
        content: message,
        userName: userName
      }
    );
  }

  useEffect(() => {
    setMessages([]);
    const db = getDatabase();
    const myRef = ref(db, "/messages")
    onChildAdded(myRef, (snapshot) => {
      setMessages((messages) => [
        ...messages,
        {
          ...snapshot.val(),
          id: snapshot.key
        }
      ])
    });
    return () => {
      off(myRef);
    }
  }, [])
  console.log(messages);
  return (
    <>
      <div>
        Message
        <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
      </div>
      <div>
        User Name
        <input type="text" value={userName} onChange={e => setUserName(e.target.value)}/>
      </div>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {
          messages.map(m => (
            <div key={m.id}>
              <h3>{m.content}</h3>
              <div>{m.userName}</div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
