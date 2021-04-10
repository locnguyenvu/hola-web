<template>
  <div class="home row">
    <div class="col-sm-12">
      <spending-pie-chart-card msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SpendingPieChartCard from '@/components/Dashboard/SpendingPieChartCard.vue'

export default {
  name: 'Home',
  components: {
    SpendingPieChartCard
  }
}
</script>
