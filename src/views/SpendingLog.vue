<template>
  <div class='row'>
    <div class='col-12'>
      <table class='table'>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Subject</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'

export default {
  name: 'SpendingLog',
  setup() {
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient
    const spending_logs = ref([])

    const fetchData = function() {
      holaClient.get('/spending-log')
        .then(resp => {
          spending_logs.value = resp.data.data
        })
    }

    onMounted(() => {
      fetchData()
    })
  }
}
</script>
