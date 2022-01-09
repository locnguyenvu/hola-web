<template>
  <div class="card mb-2 shadow-sm bg-body">
    <div class="card-header">
      [{{createdAt}}] {{spendingLog.category}}
      <router-link class="btn-sm btn-outline-primary float-end" :to="{name: 'SpendingLog.Detail', params: {spending_id: spendingLog.id}}"><font-awesome-icon icon="edit" /></router-link>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">{{spendingLog.subject}}</div>
        <div class="col-6 text-end">{{amount}} 
          <span class="badge bg-danger" v-if="spendingLog.transaction_type == 'credit'">C</span>
          <span class="badge bg-primary" v-if="spendingLog.transaction_type == 'debit'">D</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import moment from 'moment'
import numeral from 'numeral'
export default {
  name: "SpendingLogCard",
  props: {
    spendingLog: Object
  },
  setup(props) {
    const createdAt = computed(() => {
      var date = moment(props.spendingLog.created_at)
      return date.format('YYYY-MM-DD')
    })

    const amount = computed(() => {
      return numeral(props.spendingLog.amount).format('0,0')
    })
    return { createdAt, amount }
  },
}
</script>
