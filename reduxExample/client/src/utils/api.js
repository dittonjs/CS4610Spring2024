import { createContext } from "react";

export class Api {
  authToken = null;

  constructor(initialToken) {
    this.authToken = initialToken
  }

  async makeRequest(url, method, body) {
    const options = {};
    if (method === 'POST' || method === 'PUT') {
      options.body = JSON.stringify(body);
    }

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
        'Content-Type': 'application/json',
      },
      ...options,
    });
    return res.json();
  }

  get(url) {
    return this.makeRequest(url, 'GET');
  }

  post(url, body = {}) {
    return this.makeRequest(url, 'POST', body);
  }

  put(url, body = {}) {
    return this.makeRequest(url, 'PUT', body);
  }

  del(url) {
    return this.makeRequest(url, 'DELETE');
  }
}

export const ApiContext = createContext(new Api());