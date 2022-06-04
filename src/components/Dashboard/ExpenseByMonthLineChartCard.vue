<template>
  <div class="card expense-by-month-card">
    <div class="card-header text-center">
      {{time_span}}
    </div>
    <div class="card-body">
      <div class="card-title text-center">
        <strong>{{formatted_average}}</strong> / tháng
      </div>
      <div class="card-text">
        <canvas id="myChart" height="400" width="400" ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,  getCurrentInstance, onMounted } from 'vue'
import { Chart } from 'chart.js';
export default {
  name: 'ExpenseByMonthLineChartCard',
  props: {
    msg: String
  },
  setup() {

    const chart = ref(null)
    const total = ref(0)
    const fromMonth = ref(null)
    const toMonth = ref(null)
    const average = ref(0)
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient

    onMounted(() => {
      holaClient.get('/chart/expense-by-month')
        .then(resp => {
          const reportData = resp.data
          total.value = reportData.total
          fromMonth.value = reportData.from_month
          toMonth.value = reportData.to_month
          average.value = reportData.total / reportData.months.length
          const chartConfig = {
            type: 'line',
            data: {
              labels: reportData.months.map(month => month.key),
                datasets: [{
                  label: 'Chi tiêu',
                  data: reportData.months.map(month => month.value),
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  tension: 0.1
                }]
            }
          }
          new Chart(chart.value.getContext('2d'), chartConfig)
        })
        .catch(error => {
          console.log(error)
        })  
    })

    return { chart, total, fromMonth, toMonth, average }
  },
  computed: {
    formatted_total() {
      return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(this.total)
    },
    formatted_average() {
      return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(this.average)
    },
    time_span() {
      if (this.fromMonth == this.toMonth) {
        return this.fromMonth
      }
      return this.fromMonth + ' - ' + this.toMonth
    }
  }
}
</script>
