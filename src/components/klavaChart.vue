<template>
    <div>
        <chart :chartdata="chartdata" />
   </div>    
</template>
<script>
//import { Bar } from 'vue-chartjs' :width="300" :height="50"
import chart from "./core/Charts.js";
import {
    LoadUserAchivment,
    SaveUserAchivment
} from "./settingFunctions.js";
export default {
    //extends: Bar,
    name: "klvaChart",
    components: {
        newSetting,
        chart
    },
    data: function () {
        return {
            result: ["33/3", "13/3", "53/3"],
            options: {
                type: Object,
                default: null
            }
        }
    },

    computed: {
        chartdata: function () {
            var data = {
                labels: [],
                datasets: [{
                    label: 'Results',
                    backgroundColor: '#0079ff',
                    data: []
                },
                {
                    label: 'Errors',
                    backgroundColor: '#f87979',
                    data: []
                },
                ]
            }
                ;

            this.result.forEach(x => {
                var arrR = x.split('/');
                var res = parseInt(arrR[0]);
                var err = parseInt(arrR[1]) * 10;

                data.datasets[0].data.push(res);
                data.datasets[1].data.push(err);

            });
            for (var i = 0; i < 100; i++) {
                data.labels.push(i);
            }

            return data;
        }
    }
    //,
    //mounted() {
    //    this.renderChart(this.chartdata, this.options)
    //},
    //watch: {
    //    chartdata: function () {
    //        this.renderChart(this.chartdata, this.options);
    //    }
    //}
}
</script>