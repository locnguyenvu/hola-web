<template>
  <div class="user">

  </div>
</template>
<script>
export default {
  name: 'User',
  mounted() {
    this.$holaClient.get('/usr/')
      .then(function(resp) {
        console.log(resp)
      })
  }
}
</script>