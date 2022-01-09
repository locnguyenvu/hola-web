<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark" v-if="isAuthorized">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Hola</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show" @click="routeTo('/spending-log')" >
            <router-link to="/spending-log" class="nav-link" >Spendings</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Settings 
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
              <li><router-link to="/user" class="dropdown-item">User</router-link></li>
            </ul>
          </li>
        </ul>
        <div class="d-flex" v-if="isAuthorized">
          <a class="btn-logout" href="#" @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </nav>
  <!-- Notify center -->
  <div id="notify-center" class="row" v-if="errorMessage">
    <div class="col-12">
      <div class="alert" v-bind:class="{'alert-danger': isServerError, 'alert-warning': isClientError}" role="alert">
        {{errorMessage}} 
      </div>
     </div>
  </div>
  <div id="notify-center" class="row" v-if="notifyMessage">
    <div class="col-12">
      <div class="alert alert-success"  role="alert">
        {{notifyMessage}} 
      </div>
     </div>
  </div>
  <div id="router-view" class="container-fluid">
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
      'errorMessage',
      'notifyMessage'
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

    const routeTo = function(path) {
      router.push(path)
    }

    return { logout, routeTo }
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

.btn-logout {
  color: rgba(255,255,255,.55);
  text-decoration: none;
}

.btn-logout:hover {
  color: rgba(255,255,255,.75);
  text-decoration: none;
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

#router-view {
  margin-top: 75px;
}

</style>
