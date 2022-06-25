<template>
  <div class="card watch-monthly-expense">
    <div class="card-header text-center">
      {{time_span}}
    </div>
    <div class="card-body">
      <div class="card-title text-center">
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
  name: 'WatchMonthlyExpenseLineChartCard',
  props: {
    msg: String
  },
  setup() {

    const chart = ref(null)
    const fromMonth = ref(null)
    const toMonth = ref(null)
    const curInstance = getCurrentInstance()
    const holaClient = curInstance.appContext.config.globalProperties.$holaClient

		const chartColors = [
			{"color": "rgb(0, 63, 92)", "bgcolor": "rgb(127, 159, 173)", },
			{"color": "rgb(47, 75, 124)", "bgcolor": "rgb(151, 165, 189)", },
			{"color": "rgb(102, 81, 145)", "bgcolor": "rgb(178, 168, 200)", },
		]

    onMounted(() => {
      holaClient.get('/chart/watch-monthly-expense')
        .then(resp => {
          const reportData = resp.data
					fromMonth.value = reportData["key"][0]
					toMonth.value = reportData["key"][reportData["key"].length-1]
					let dataset = []
					for ( let i = 0; i < reportData["data"].length; i++) {
						let fill = '-1'
						if (i == 0) {
							fill = true
						}
						dataset.push({
							label: reportData["data"][i]["name"],
							fill: fill,
							data: reportData["data"][i]["data"],
							borderColor: chartColors[i]["color"],
							backgroundColor: chartColors[i]["bgcolor"],
						})
					}
          const chartConfig = {
            type: 'line',
            data: {
              labels: reportData["key"],
							datasets: dataset
						},
						options: {
							scales: {
								y: {
									stacked: true
								}
							},
							plugins: {
								filler: {
									propagate: false
								},
								'samples-filler-analyser': {
									target: 'chart-analyser'
								}
							},
							interaction: {
								intersect: false,
							},
						},
          }
          new Chart(chart.value.getContext('2d'), chartConfig)
        })
        .catch(error => {
          console.log(error)
        })  
    })

    return { chart, fromMonth, toMonth, }
  },
  computed: {
    time_span() {
      if (this.fromMonth == this.toMonth) {
        return this.fromMonth
      }
      return this.fromMonth + ' - ' + this.toMonth
    }
  }
}
</script>
