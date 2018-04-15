const nodeFetch = require('node-fetch')
const { FACEBOOK_API_TOKEN, FACEBOOK_API_BASE_URL } = require('./constants')

// fetch('http://httpbin.org/post', {
// 	method: 'POST',
// 	body:    JSON.stringify(body),
// 	headers: { 'Content-Type': 'application/json' },
// })

async function fetch(path, options = {}) {
  const response = await nodeFetch(path, options)
  const json = await response.json()
  return json
}

function get(path, options = {}) {
  return fetch(path, { ...options, method: 'GET' })
}

function post(path, options = {}) {
  return fetch(path, { ...options, method: 'POST' })
}

function getFb(path, options = {}) {
  const headers = { ...(options.headers || {}), Authorization: `Bearer ${FACEBOOK_API_TOKEN}` }
  return get(`${FACEBOOK_API_BASE_URL}/${path}`, { ...options, headers })
}

function postFb(path, options = {}) {
  const headers = { ...(options.headers || {}), Authorization: `Bearer ${FACEBOOK_API_TOKEN}` }
  return post(`${FACEBOOK_API_BASE_URL}/${path}`, { ...options, headers })
}

module.exports = {
  fetch,
  get,
  post,
  getFb,
  postFb,
}
