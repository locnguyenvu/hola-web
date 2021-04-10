<template>
  <div class="card spending-pie-chart-card">
    <div class="card-header">
      Tổng chi tiêu
    </div>
    <div class="card-body">
      <div class="card-title">
        {{formatted_total}}
      </div>
      <div class="card-text">
        <canvas id="myChart" ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,  getCurrentInstance, onMounted } from 'vue'
import { Chart } from 'chart.js';
export default {
  name: 'SpendingPieChartCard',
  props: {
    msg: String
  },
  setup() {

    const chart = ref(null)
    const total = ref(0)
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
      holaClient.get('/chart')
        .then(resp => {
          const reportData = resp.data
          total.value = reportData.total
          const chartConfig = {
            type: 'pie',
            data: {
              labels: reportData.categories.map(cat => cat.dis_name),
                datasets: [{
                  label: 'Tổng tiền ' + reportData.total,
                  data: reportData.categories.map(cat => cat.value),
                  backgroundColor: colors.slice(0, reportData.categories.length),
                  hoverOffset: 4
                }]
            }
          }
          new Chart(chart.value.getContext('2d'), chartConfig)
        })
    })

    return { chart, total }
  },
  computed: {
    formatted_total() {
      return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(this.total)
    }
  }
}
</script>
<style scope>
.spending-pie-chart {
  height: 400px;
}
</style>