<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAuthorized">
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
        <div class="d-flex nav-item log-out-btn" v-if="isAuthorized">
          <a class="nav-link" href="#" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
  <div id="notify-center" class="row" v-if="errorMessage">
    <div class="col-12">
      <div class="alert" v-bind:class="{'alert-danger': isServerError, 'alert-warning': isClientError}" role="alert">
        {{errorMessage}} 
      </div>
     </div>
  </div>
  <div id="router-view" class="container">
    <router-view/>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { mapGetters, useStore } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isClientError',
      'isServerError',
      'isAuthorized',
      'errorMessage'
    ])
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = function() {
      store.dispatch('logout')
      store.commit('setClientError', 401)
      router.push('/error')
    }

    return { logout }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#router-view {
  margin-top: 15px;
}

#notify-center {
  padding: 15px;
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

/* .navbar-nav .nav-item .dropdown-menu {
  background: transparent;
  border: none;
  padding: 0;
} */

.log-out-btn .nav-link {
  color: rgba(0,0,0,.7);
  padding-left: 0px;
}
</style>
