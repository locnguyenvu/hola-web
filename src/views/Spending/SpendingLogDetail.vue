<template>
  <div class="row">
    <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      <label class="form-label">Subject</label>
      <input type="text" :value="spendingLog.subject" class="form-control" />
    </div>
    <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      <label class="form-label">Amount</label>
      <input type="text" :value="spendingLog.amount" class="form-control" />
    </div>
    <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      <label class="form-label">Payment type</label>
      <select v-model="spendingLog.transaction_type" class="form-control">
        <option value="debit">Debit</option>
        <option value="credit">Credit</option>
      </select>
    </div>
    <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
      <label class="form-label">Category</label>
      <select-spending-category v-model:category-id="spendingLog.category_id"></select-spending-category>
    </div>
    <div class="clearfix"></div>
    <div class="col-12">
      <button class="btn btn-primary float-end" @click="sendUpdate">Save</button>
    </div>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SelectSpendingCategory from '@/components/Filters/SelectSpendingCategory.vue'
export default {
  name: "SpendingLogDetail",
  components: { 
    SelectSpendingCategory
  },
  setup() {
    const route = useRoute()
    const spendingLog = ref({})
    const holaClient = getCurrentInstance().appContext.config.globalProperties.$holaClient
    const store = useStore()

    onMounted(() => {
      holaClient.get('/spending-log/' + route.params.spending_id)
        .then((response) => {
          spendingLog.value = response.data.data
        })  
    })

    const sendUpdate = function() {
      holaClient.put('/spending-log/' + route.params.spending_id, spendingLog.value)
        .then(() => {
          store.dispatch('notify', 'Update success!')
        })
    }

    return {
      spendingLog,
      sendUpdate
    }
  }
}
</script>
