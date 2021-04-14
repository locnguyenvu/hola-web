import axios from 'axios'
import store from '../store'

const LOCALSTORAGE_ALIAS = 'hola-token'
const holaApiBaseUrl = process.env.VUE_APP_HOLAA_API_URL

const holaClient = axios.create({
  'baseURL': holaApiBaseUrl,
})

holaClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    store.commit('setErrorHttpStatusCode', error.response.status)
    store.commit('setErrorMessage', "Something went wrong!")
    return Promise.reject(error);
  });

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
