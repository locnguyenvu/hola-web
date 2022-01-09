<template>
  <div class='row'>
    <div class='col-12'>
      <form class="row shadow mb-2 bg-body rounded">
        <div class="mb-4 col-12 col-sm-12 col-md-4 col-lg-3">
          <label class="form-label"><small>Category</small></label>
          <select-spending-category v-model:category-id="filter.category_id" ></select-spending-category>
        </div>
        <div class="mb-3 col-12 col-sm-12 col-md-4 col-lg-3">
          <label class="form-label"><small>Timerange</small></label>
          <div class="form-input">
            <DatePicker v-model="filter.date_range" is-range v-show="true" is-expanded />
          </div>
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
import SelectSpendingCategory from '@/components/Filters/SelectSpendingCategory.vue'
import SpendingLogCard from '@/components/SpendingLog/SpendingLogCard.vue'
import querystring from 'querystring'
import moment from 'moment'
export default {
  name: 'SpendingLogIndex',
  components: {
    SelectSpendingCategory,
    SpendingLogCard,
  },
  setup() {
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient
    const spending_logs = ref([])
    const filter = reactive({
      "category_id": 0,
      "date_range": {
        start: new Date(),
        end: new Date()
      },
    })

    const fetchData = function() {
      let from_date = moment(filter.date_range.start).hour(0).minute(0).second(0)
      let to_date = moment(filter.date_range.end).hour(23).minute(59).second(59)
      holaClient.get('/spending-log?'+querystring.stringify({
        category_id: (filter.category_id != 0) ? filter.category_id : '',
        from_date: from_date.format("YYYY-MM-DD HH:mm:ss"),
        to_date: to_date.format("YYYY-MM-DD HH:mm:ss"),
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
