<template>
  <div class='row'>
    <div class='col-12'>
      <form class="row shadow mb-2 bg-body rounded">
        <div class="mb-3 col-6 col-sm-6 col-md-4 col-lg-3">
          <label class="form-label"><small>Timerange</small></label>
          <select-time-range v-model:time-range="filter.time_range" ></select-time-range>
        </div>
        <div class="mb-3 col-6 col-sm-6 col-md-4 col-lg-3">
          <label class="form-label"><small>Category</small></label>
          <select-spending-category v-model:category-id="filter.category_id" ></select-spending-category>
        </div>
      </form>
    </div>
    <div class='col-12 d-grip gap-3' v-for="log in spending_logs" :key="log.id">
      <spending-log-card :spending-log="log"></spending-log-card>
    </div>
  </div>
</template>
<script>
import { ref, reactive, watch, getCurrentInstance, onMounted } from 'vue'
import SelectTimeRange from '@/components/Filters/SelectTimeRange.vue'
import SelectSpendingCategory from '@/components/Filters/SelectSpendingCategory.vue';
import SpendingLogCard from '@/components/SpendingLog/SpendingLogCard.vue';
import querystring from 'querystring'
export default {
  name: 'SpendingLogIndex',
  components: {
    SelectTimeRange,
    SelectSpendingCategory,
    SpendingLogCard
  },
  setup() {
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient
    const spending_logs = ref([])
    const filter = reactive({
      "category_id": 0,
      "time_range": null
    })

    const fetchData = function() {
      holaClient.get('/spending-log?'+querystring.stringify({
        category_id: (filter.category_id != 0) ? filter.category_id : '',
        timerange: filter.time_range
      }))
        .then(resp => {
          spending_logs.value = resp.data.data
        })
    }

    watch(filter, () => {
      fetchData()
    }, {deep: true})

    onMounted(() => {
      fetchData()
    })

    return { spending_logs, fetchData, filter }
  }
}
</script>
