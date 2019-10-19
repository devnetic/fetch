const fetch = require('./../index')

// GET
fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => {
    console.log(response.json())
  })
  .catch(error => {
    console.log(error)
  })

// POST
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

// PUT
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

  // PATCH
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

// DELETE
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    console.log(error)
  })
