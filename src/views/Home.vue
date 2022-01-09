<template>
  <div class="home row">
    <div class="col-sm-12 col-md-4 col-lg-4">
      <expense-by-category-doughnut-chart-card />
    </div>
    <div class="col-sm-12 col-md-4 col-lg-4">
      <expense-by-month-line-chart-card />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ExpenseByCategoryDoughnutChartCard from '@/components/Dashboard/ExpenseByCategoryDoughnutChartCard.vue'
import ExpenseByMonthLineChartCard from '@/components/Dashboard/ExpenseByMonthLineChartCard.vue'

export default {
  name: 'Home',
  components: {
    ExpenseByCategoryDoughnutChartCard,
    ExpenseByMonthLineChartCard
  }
}
</script>
