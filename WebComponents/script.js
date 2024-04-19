class MyButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    console.log("Hello!");
    const node = document.getElementById("my-button").content.cloneNode(true)
    const shadowDOM = this.attachShadow({mode: "closed"});
    const style = document.createElement("style");
    style.innerHTML=`
      .wrapper {
        background: red;
        padding: 16px;
      }
    `;
    shadowDOM.appendChild(style);
    shadowDOM.appendChild(node);
  }
}

customElements.define("my-button", MyButton);