import { createStore } from 'vuex'
import { holaClient, setAuthorization, clearAuthorization, getToken } from '../http/hola-api'

const store = createStore({
  state() {
    return {
      auth_status: '',
      hola_token: getToken(),
      error_http_status_code : 0,
      error_message: null,
      notify_message: null
    }
  },
  mutations: {
    authSuccess(state) {
      state.auth_status = 'success'
    },
    authFailed(state) {
      state.auth_status = 'failed'
    },
    setErrorHttpStatusCode(state, code) {
      state.error_http_status_code = code 
    },
    setErrorMessage(state, msg) {
      state.error_message = msg
    },
    setNotifyMessage(state, msg) {
      state.notify_message = msg
    }
  },
  actions: {
    login({commit}, payload) {
      return new Promise((resolve, reject) => {
        holaClient.post('/login/'+ payload.session_id, {
          pin: payload.pin,
          otp: payload.otp
        })
          .then(resp => {
            const token = resp.data.token
            setAuthorization(token)
            commit('authSuccess')
            resolve(resp)
          })
          .catch(err => {
            commit('authFailed')
            clearAuthorization()
            reject(err)
          })
      })
    },
    setToken({commit}, token) {
      return new Promise((resolve) => {
        setAuthorization(token)
        commit('authSuccess')
        resolve()
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        clearAuthorization()
        commit('authFailed')
        window.location = '/login.html'
        resolve()
      })
    },
    notify({commit}, message) {
      commit('setNotifyMessage', message)
      return new Promise((resolve) => {
        setTimeout(function () { commit('setNotifyMessage', null); }, 3000)
        resolve()
      })
    }
  },
  getters: {
    isAuthorized: state => state.auth_status == 'success' || state.hola_token,
    isClientError: state => state.error_http_status_code >= 400 && state.error_http_status_code < 500,
    isServerError: state => state.error_http_status_code >= 500,
    errorMessage: state => state.error_message,
    notifyMessage: state => state.notify_message
  }
})

export default store
