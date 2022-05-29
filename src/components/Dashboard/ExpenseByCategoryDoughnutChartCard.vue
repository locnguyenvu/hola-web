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
      'rgb(0, 63, 92)',
      'rgb(47, 75, 124)',
      'rgb(102, 81, 145)',
      'rgb(160, 81, 149)',
      'rgb(212, 80, 135)',
      'rgb(249, 93, 106)',
      'rgba(99, 142, 230)',
      'rgb(255, 124, 67)',
      'rgb(255, 166, 0)',
    ];

    const transformForChartData = function(categories) {
      var chartData = []
      for (let i = 0; i < 4; i++) {
        chartData.push(categories[i])
      }
      let sumTheRest = 0
      for (let i = 4; i < categories.length; i++) {
        sumTheRest += categories[i].value
      }
      chartData.push({
        "dis_name": "Những khoản khác",
        "name": "others",
        "value": sumTheRest
      })
      return chartData
    }

    onMounted(() => {
      holaClient.get('/chart/expense-by-category')
        .then(resp => {
          const reportData = resp.data
          const chartData = transformForChartData(reportData.categories)
          total.value = reportData.total
          fromMonth.value = reportData.from_month
          toMonth.value = reportData.to_month
          const chartConfig = {
            type: 'doughnut',
            data: {
              labels: chartData.map(cat => cat.dis_name),
              datasets: [{
                label: 'Tổng tiền ' + reportData.total,
                data: chartData.map(cat => cat.value),
                backgroundColor: colors.slice(0, chartData.length),
                hoverOffset: 4
              }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true
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
