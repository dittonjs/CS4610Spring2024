import { useEffect, useState } from "react"
import { Note } from "./Note";

function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([]);
  const [quote, setQuote] = useState(null);

  function save() {
    setNotes([ ...notes, { title, content }]);
    setTitle("");
    setContent("");
  }

  useEffect(() => {
    console.log(notes);
  }, [notes])

  async function loadQuote() {
    const res = await fetch("https://api.quotable.io/quotes/random");
    const quotes = await res.json();
    setQuote(quotes[0]);
  }



  useEffect(() => {
    loadQuote();
    const click = () => {
      console.log(notes);
    }
    window.addEventListener("click", click);
    return () => {
      window.removeEventListener("click", click)
    }
  }, [notes]);

  return (
      <>
        <form className="note-form">
          <label>
            Note Title
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              />
          </label>
          <label>
            Note Content
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              />
          </label>
          <button type="button" onClick={save}>Save</button>
        </form>
        {quote && (
          <h2>{quote.content} - {quote.author}</h2>
        )}
        <div>
          {
            notes.map((note) => (
              <Note key={note.title} note={note} />
            ))
          }
        </div>
      </>
  )
}

export default App
