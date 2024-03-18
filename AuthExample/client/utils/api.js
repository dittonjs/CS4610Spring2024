import { createContext } from "react";

export class Api {
  token = window.localStorage.getItem("jwt")

  async makeRequest(uri, method, body) {
    const options = {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }

    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(uri, options);
    return res.json();
  }

  get(uri) {
    return this.makeRequest(uri, "get")
  }

  post(uri, body) {
    return this.makeRequest(uri, "post", body)
  }

  put(uri, body) {
    return this.makeRequest(uri, "put", body)
  }

  del(uri) {
    return this.makeRequest(uri, "del")
  }
}

export const ApiContext = createContext(new Api());