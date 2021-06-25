<template>
  <div class="home row">
    <div class="col-sm-12 col-md-4 col-lg-4">
      <expense-by-category-pie-chart-card />
    </div>
    <div class="col-sm-12 col-md-4 col-lg-4">
      <expense-by-month-line-chart-card />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ExpenseByCategoryPieChartCard from '@/components/Dashboard/ExpenseByCategoryPieChartCard.vue'
import ExpenseByMonthLineChartCard from '@/components/Dashboard/ExpenseByMonthLineChartCard.vue'

export default {
  name: 'Home',
  components: {
    ExpenseByCategoryPieChartCard,
    ExpenseByMonthLineChartCard
  }
}
</script>
