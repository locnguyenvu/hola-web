import { createStore } from 'vuex'
import { holaClient, setAuthorization, clearAuthorization, getToken } from '../http/hola-api'

const store = createStore({
  state() {
    return {
      auth_status: '',
      hola_token: getToken()
    }
  },
  mutations: {
    authSuccess(state) {
      state.auth_status = 'success'
    },
    authFailed(state) {
      state.auth_status = 'failed'
    }
  },
  actions: {
    login({commit}, payload) {
      return new Promise((resolve, reject) => {
        holaClient.post('/login/'+ payload.session_id, {
          pin: payload.pin
        })
          .then(resp => {
            console.log(resp)
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
    logout({commit}) {
      return new Promise((resolve) => {
        clearAuthorization()
        commit('authFailed')
        resolve()
      })
    }
  },
  getters: {
    isAuthorized: state => state.auth_status == 'success' || state.hola_token
  }
})

export default store