<template>
  <div class="login">
    <div class="row">
      <div class="col-md-12">
        <h1> Login </h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-3 form-group">
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
export default {
  name: "Login",
  data() {
    return {
      pin: ''
    }
  },
  methods: {
    login: function() {
      this.$store.dispatch('login', {
        session_id: this.$route.params.session_id,
        pin: this.pin
      }).then(() => {
        this.$router.push('/about')
      })
    }
  }
}
</script>