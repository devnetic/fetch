# fetch

![npm (scoped)](https://img.shields.io/npm/v/@devnetic/fetch)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@devnetic/fetch?color=red)
![npm](https://img.shields.io/npm/dt/@devnetic/fetch)
![GitHub issues](https://img.shields.io/github/issues-raw/devnetic/fetch)
![GitHub](https://img.shields.io/github/license/devnetic/fetch)

The Fetch package provides an interface for fetching resources (including across the network).

This package it's a wrapper around `http|https` Node.js native packages.

# Usage

## GET
```javascript
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response.json())
  })
  .catch(error => {
    console.log(error)
  })
```

## POST
```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    console.log(error)
  })
```

## PUT
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    console.log(error)
  })
```

## PATCH
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'foo'
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    console.log(error)
  })
```

## DELETE
```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    console.log(error)
  })
```

# Parameters

* **url** `<string|URL>`
* **init** `<Object>`
  * **agent** `<http.Agent|boolean>` Controls Agent behavior. Possible values:
    * **undefined** (default): use http.globalAgent for this host and port.
    * **Agent** object: explicitly use the passed in Agent.
    * **false**: causes a new Agent with default values to be used.
  * **auth** `<string>` Basic authentication i.e. 'user:password' to compute an Authorization header.
  * **createConnection** `<Function>` A function that produces a socket/stream to use for the request when the agent option is not used. This can be used to avoid creating a custom Agent class just to override the default createConnection function. See agent.createConnection() for more details. Any Duplex stream is a valid return value.
  * **defaultPort** `<number>` Default port for the protocol. Default:  agent.defaultPort if an Agent is used, else undefined.
  * **family** `<number>` IP address family to use when resolving host or hostname. Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
  * **headers** <Object> An object containing request headers.
  * **host** `<string>` A domain name or IP address of the server to issue the request to. Default: 'localhost'.
  * **hostname** `<string>` Alias for host. To support url.parse(), hostname will be used if both host and hostname are specified.
  * **localAddress** `<string>` Local interface to bind for network connections.
  * **method** `<string>` A string specifying the HTTP request method. Default: 'GET'.
  * **path** `<string>` Request path. Should include query string if any. E.G. *'index.html?age=12'*. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future. **Default**: *'/'*.
  * **port** `<number>` Port of remote server. Default: defaultPort if set, else 80.
  * **protocol** `<string>` Protocol to use. Default: 'http:'.
  * **setHost** <boolean> Specifies whether or not to automatically add the Host header. Defaults to true.
  * **socketPath** `<string>` Unix Domain Socket (cannot be used if one of host or port is specified, those specify a TCP Socket).
  * **timeout** `<number>` A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected.
