<template>
    <div style="height:80px">
        <chart :chartdata="chartdata"  :height="100" />
    </div>
</template>
<script>
    import chart from "./core/Charts.js";

    export default {
        name: "klvaChart",
        components: {
            chart
        },
        data: function () {
            return {
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
                };
                const result = this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
                console.log(result);
                result.forEach(x => {
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
    }

</script>