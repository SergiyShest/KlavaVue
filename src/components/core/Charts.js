
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
      chartdata: {
          type: Object,
          default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
    computed: {
    },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  watch:{
    chartdata:function()
    {
      this.renderChart(this.chartdata, this.options);
    }
  }
}