<template>
  <div class="user row">
    <div class="col">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <th scope="row">{{user.id}}</th>
            <td>{{user.tlg_uname}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.$holaClient.get('/usr/')
      .then((resp) => {
        this.users = resp.data.data
      })
  }
}
</script>