<template>
  <div class="home row">
    <div class="col-sm-12 col-md-6 col-lg-6">
      <expense-by-category-pie-chart-card />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ExpenseByCategoryPieChartCard from '@/components/Dashboard/ExpenseByCategoryPieChartCard.vue'

export default {
  name: 'Home',
  components: {
    ExpenseByCategoryPieChartCard
  }
}
</script>
