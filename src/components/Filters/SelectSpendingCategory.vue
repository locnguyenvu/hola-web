<template>
  <select class="form-select" :value="categoryId" @change="$emit('update:categoryId', $event.target.value)">
    <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{cat.display_name}}</option>
  </select>
</template>
<script>
import { ref, getCurrentInstance, onMounted } from 'vue'
export default {
  name: "SelectSpendingCategory",
  props: {
    categoryId: String
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

    onMounted(() => { fetchData() })

    return { categories, fetchData }
  },
}
</script>
