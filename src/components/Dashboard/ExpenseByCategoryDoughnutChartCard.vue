<template>
  <div class="card expense-by-category-card">
    <div class="card-header text-center">
      Tổng chi tiêu {{time_span}}
    </div>
    <div class="card-body">
      <div class="card-title text-center">
        <strong>{{formatted_total}}</strong>
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
  name: 'ExpenseByCategoryDoughnutChartCard',
  props: {
    msg: String
  },
  setup() {

    const chart = ref(null)
    const total = ref(0)
    const fromMonth = ref(null)
    const toMonth = ref(null)
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient

    const colors = [
      'rgba(235, 64, 52)',
      'rgba(100, 227, 108)',
      'rgba(111, 150, 189)',
      'rgba(224, 203, 79)',
      'rgba(16, 230, 178)',
      'rgba(17, 54, 45)',
      'rgba(99, 142, 230)',
      'rgba(117, 72, 176)',
      'rgba(222, 42, 222)',
      'rgba(117, 9, 35)',
      'rgba(122, 116, 118)'
    ];

    onMounted(() => {
      holaClient.get('/chart/expense-by-category')
        .then(resp => {
          const reportData = resp.data
          total.value = reportData.total
          fromMonth.value = reportData.from_month
          toMonth.value = reportData.to_month
          const chartConfig = {
            type: 'doughnut',
            data: {
              labels: reportData.categories.map(cat => cat.dis_name),
                datasets: [{
                  label: 'Tổng tiền ' + reportData.total,
                  data: reportData.categories.map(cat => cat.value),
                  backgroundColor: colors.slice(0, reportData.categories.length),
                  hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
          }
          new Chart(chart.value.getContext('2d'), chartConfig)
        })
        .catch(error => {
          console.log(error)
        })  
    })

    return { chart, total, fromMonth, toMonth }
  },
  computed: {
    formatted_total() {
      return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(this.total)
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
