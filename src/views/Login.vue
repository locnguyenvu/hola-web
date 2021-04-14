<template>
  <div class="login">
    <div class="row">
      <div class="col-md-12">
        <h1> Login </h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-3 col-sm-8 form-group">
        <input class="form-control" type="password" name="password" v-model="pin" required />
      </div>
    </div>
    <div class="row align-items-center mt-3">
      <div class="col align-self-center">
        <button type="button" class="btn btn-primary" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
export default {
  name: "Login",
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const pin = ref(null)

    const login =function() {
      store.dispatch('login', {
        session_id: route.params.session_id,
        pin: pin.value
      }).then(() => {
        router.push('/')
      })
    }
    return { login, pin }
  }
}
</script>