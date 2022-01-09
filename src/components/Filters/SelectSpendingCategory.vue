<template>
  <select class="form-select" :value="categoryId" @change="$emit('update:categoryId', parseInt($event.target.value))">
    <option value='0'>Tất cả</option>
    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.display_name}}</option>
  </select>
</template>
<script>
import { ref, getCurrentInstance } from 'vue'
export default {
  name: "SelectSpendingCategory",
  props: {
    categoryId: Number 
  },
  emits: ['update:categoryId'],
  setup() {
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient
    const categories = ref([])

    const fetchData = function() {
      holaClient.get('/spending-category')
        .then(resp => {
          categories.value = resp.data.data
        })
    }

    return { categories, fetchData }
  },
  created() {
    this.fetchData()
  }
}
</script>
