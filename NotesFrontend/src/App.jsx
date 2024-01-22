import { useState } from "react"



function App() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [notes, setNotes] = useState([]);

  function save() {
    // copy
    const newState = [...notes, {
      title,
      content,
    }];
    // add new stuff

    // replace old state with new state
    setNotes(newState);
    setTitle("");
    setContent("");

  }

  console.log(notes)

  return (
    <>
      <form onSubmit={e => e.preventDefault()} className="note-form">
        <label htmlFor="">
          Note Title
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="">
          Note Content
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </label>
        <button onClick={save}>Save</button>
      </form>
    </>
  )
}

export default App
