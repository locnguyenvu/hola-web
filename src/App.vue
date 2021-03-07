<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> | 
    <router-link to="/login/11">Login</router-link>
  </div>
  <router-view/>
</template>
<script>
import { clearAuthorization } from './http/hola-api'
export default {
  name: 'App',
  created () {
    this.$holaClient.interceptors.response.use(function (response) {
      console.log(response)
      if (response.status == '401') {
        clearAuthorization()
        this.$router.push('/home')
        return
      }
      return response
    })
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
}
</style>
