import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class MyButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Hello!");
    this.appendChild(document.getElementById("my-button").content.cloneNode(true))
  }
}

customElements.define("my-button", MyButton);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
