const http = require('http')
const https = require('https')
const { URL } = require('url')

const Response = require('./Response')

/**
 * @typedef {Object} Init
 * @property {http.Agent>|boolean} Controls Agent behavior.
 * @property {string} auth  Basic authentication i.e. 'user:password' to compute an Authorization header.
 * @property {Function} createConnection  A function that produces a socket/stream to use for the request when the agent option is not used. This can be used to avoid creating a custom Agent class just to override the default createConnection function. See agent.createConnection() for more details. Any Duplex stream is a valid return value.
 * @property {number} defaultPort  Default port for the protocol. Default: agent.defaultPort if an Agent is used, else undefined.
 * @property {number} family  IP address family to use when resolving host or hostname. Valid values are 4 or 6. When unspecified, both IP v4 and v6 will be used.
 * @property {Object} headers  An object containing request headers.
 * @property {string} host  A domain name or IP address of the server to issue the request to. Default: 'localhost'.
 * @property {string} hostname  Alias for host. To support url.parse(), hostname will be used if both host and hostname are specified.
 * @property {string} localAddress  Local interface to bind for network connections.
 * @property {string} method  A string specifying the HTTP request method. Default: 'GET'.
 * @property {string} path  Request path. Should include query string if any. E.G. '/index.html?page=12'. An exception is thrown when the request path contains illegal characters. Currently, only spaces are rejected but that may change in the future. Default: '/'.
 * @property {number} port  Port of remote server. Default: defaultPort if set, else 80.
 * @property {string} protocol  Protocol to use. Default: 'http:'.
 * @property {boolean} setHost  Specifies whether or not to automatically add the Host header. Defaults to true.
 * @property {string} socketPath  Unix Domain Socket (cannot be used if one of host or port is specified, those specify a TCP Socket).
 * @property {number} timeout  A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected.
 */

/**
 * Utility function that converts a URL object into an ordinary options object
 * as expected by the http.request and https.request APIs.
 *
 * @param {URL} url
 * @returns {Object}
 */
const urlToOptions = (url) => {
  const options = {
    protocol: url.protocol,
    hostname: typeof url.hostname === 'string' && url.hostname.startsWith('[') ?
      url.hostname.slice(1, -1) :
      url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: `${url.pathname || ''}${url.search || ''}`,
    href: url.href
  }

  if (url.port !== '') {
    options.port = Number(url.port)
  }

  if (url.username || url.password) {
    options.auth = `${url.username}:${url.password}`
  }

  return options
}

/**
 *
 * @param {string} url
 * @param {Init} [init]
 * @returns {Promise<Response>}
 */
const fetch = (url, init = {}) => {
  const options = Object.assign({}, init, urlToOptions(new URL(url)))
  const protocol = options.protocol === 'http:' ? http : https

  return new Promise((resolve, reject) => {
    const request = protocol.request(options, (response) => {
      let data = ''

      response.setEncoding('utf8')

      // A chunk of data has been recieved.
      response.on('data', (chunk) => {
        data += chunk
      })

      // The whole response has been received.
      response.on('end', () => {
        resolve(new Response(data, url, response))
      })
    })

    request.on('error', (error) => {
      reject(error.message)
    })

    if (options.body) {
      // Write data to request body
      request.write(options.body)
    }

    request.end()
  })
}

module.exports = exports = fetch
