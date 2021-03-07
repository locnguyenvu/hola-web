import axios from 'axios'

const LOCALSTORAGE_ALIAS = 'hola-token'
const holaApiBaseUrl = process.env.VUE_APP_HOLAA_API_URL

const holaClient = axios.create({
  'baseURL': holaApiBaseUrl,
})

function clearAuthorization() {
  localStorage.removeItem(LOCALSTORAGE_ALIAS)
  delete holaClient.defaults.headers.common['Authorization']
}

function setAuthorization(token) {
  localStorage.setItem(LOCALSTORAGE_ALIAS, token)
  holaClient.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

function getToken() {
  return localStorage.getItem(LOCALSTORAGE_ALIAS)
}

const token = localStorage.getItem(LOCALSTORAGE_ALIAS)
if (token) {
  setAuthorization(token)
}

export { holaClient, clearAuthorization, setAuthorization , getToken }
