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
            <td>{{user.telegram_username}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
export default {
  name: 'User',
  setup() {
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient
    const users = ref([])

    const fetchUser = function() {
      holaClient.get('/user')
        .then(resp => {
          users.value = resp.data.data
        })
    }

    onMounted(fetchUser)

    return {
      users,
      fetchUser
    }
  }
}
</script>