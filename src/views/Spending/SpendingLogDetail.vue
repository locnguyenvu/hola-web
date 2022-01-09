<template>
  <div class="row">
    <div class="accordion" id="accordionSpendingLog">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Main
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" >
          <div class="accordion-body">
            <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Subject</label>
              <input type="text" v-model="spendingLog.subject" class="form-control" />
            </div>
            <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Amount</label>
              <input type="text" v-model="spendingLog.amount" class="form-control" inputmode="numeric" />
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
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Split 
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionSpendingLog">
          <div class="accordion-body">
            <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Amount</label>
              <input type="text" v-model="splitLog.amount" class="form-control" inputmode="numeric" />
            </div>
            <div class="mb-3 col-12 col-sm-12 col-md-6 col-lg-6">
              <label class="form-label">Category</label>
              <select-spending-category v-model:category-id="splitLog.category_id"></select-spending-category>
            </div>
            <div class="clearfix"></div>
            <div class="col-12">
              <button class="btn btn-primary float-end" @click="sendSplit">Split</button>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
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
    const splitLog = ref({
      amount: null,
      category_id: null
    })
    const holaClient = getCurrentInstance().appContext.config.globalProperties.$holaClient
    const store = useStore()

    onMounted(() => {
      holaClient.get('/spending-log/' + route.params.spending_id)
        .then((response) => {
          spendingLog.value = response.data.data
        })  
    })

    const sendUpdate = function() {
      holaClient.put('/spending-log/' + route.params.spending_id, {
        "subject": spendingLog.value.subject,
        "spending_category_id": spendingLog.value.category_id,
        "transaction_type": spendingLog.value.transaction_type,
        "amount": spendingLog.value.amount
      })
        .then(() => {
          store.dispatch('notify', 'Update success!')
        })
    }

    const sendSplit = function() {
      holaClient.post('/spending-log/' + route.params.spending_id + '/split', {
        "category_id": splitLog.value.category_id,
        "amount": splitLog.value.amount
      })
        .then(() => {
          store.dispatch('notify', 'Update success!')
        })
    }

    return {
      spendingLog,
      splitLog,
      sendUpdate,
      sendSplit
    }
  }
}
</script>
