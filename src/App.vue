<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isClientError == false">
  <div class="container-fluid">
    <router-link to="/" class="navbar-brand">Hola</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Settings 
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><router-link to="/user" class="dropdown-item">User</router-link></li>
          </ul>
        </li>
      </ul>
      <div class="d-flex nav-item" v-if="isAuthorized">
        <a class="nav-link" href="#" @click="logout">Logout</a>
      </div>
    </div>
  </div>
</nav>
  <router-view/>
</template>
<script>
import { clearAuthorization } from './http/hola-api'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isClientError',
      'isAuthorized'
    ])
  },
  created () {
    this.$holaClient.interceptors.response.use(function (response) {
      if (response.status >= 401) {
        if (response.status == 401) {
          clearAuthorization()
        }
        this.$store.commit('setClientError', response.status)
        this.$router.push('/error')
        return
      }
      return response
    })
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$store.commit('setClientError', 401)
      this.$router.push('/error')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
  font-weight: 600;
}
.nav-item a.router-link-exact-active {
  font-weight: 600;
}
</style>
