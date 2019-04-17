// CommitChart.js
import { Bar } from 'vue-chartjs'
 
// export default {
//   extends: Bar,
//   mounted () {
//     // Overwriting base render method with actual data.
//     this.renderChart({
//       labels: [1,2,3,4,5,6,7,8,8, 10, 11,12, 13,2,3,4,5,6,7,8,8, 10, 11,12, 13],
//       datasets: [
//         {
//           label: 'GitHub Commits',
//           backgroundColor: '#f87979',
//           data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
//         },
//         {
//           label: 'errors',
//           backgroundColor: '#f5909',
//           data: [4, 2, 1, 3, 1, 4, 3, 83, 43, 23, 10, 33]
//         }  
     
//       ]
//     })
//   }
// }

import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    result: {
      type: Array,
      default: []
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed:{
  chartdata:function(){
    var data={ labels: [],
    datasets: [{
        label: 'Data One',
        backgroundColor: '#f87979',
        data: []
    }]}
    ;
    var i=0;
this.result.forEach(x => {
  var arrR=x.split('/');
  var res= parseInt(arrR[0]);
  data.labels.push(i);
  data.datasets[0].data.push(res);
  i++;
});

return data;
}
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