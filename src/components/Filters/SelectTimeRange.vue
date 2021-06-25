<template>
  <select class="form-select" :value="timeRange" @change="$emit('update:timeRange', $event.target.value)">
    <option value=''>Hôm nay</option>
    <option v-for="option in options" :key="option.id" >
      {{option.value}}
    </option>
  </select>
</template>

<script>
import { ref, onMounted } from 'vue'
import moment from 'moment'
export default {
  name: 'SelectTimeRange',
  emits: ['update:timeRange'],
  props: {
    timeRange: String
  },
  setup() {

    const options = ref([])
    onMounted(() => {
      var keeper = moment()
      do {
        var option_value = keeper.format('Y').concat('-', keeper.format('MM'))
        options.value.push({
          key: option_value,
          value: option_value
        })
        keeper = keeper.subtract(moment.duration(1, 'M'))
      } while (option_value != '2020-07')
    })

    return { options }
  }
}
</script>
