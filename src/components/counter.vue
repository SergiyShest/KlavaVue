<template>
    <div class="row">
        <h4>Времени с начала: {{Math.round(this.time / 1000, 10)}} сек</h4>
        <h4>Введено символов: {{ charCount }}</h4>
        <h4>Скорость: {{ avgSpeed }} символов в минуту</h4>
    </div>
</template>
<script>

    export default {
        name: "counter",
        props: {
            inputedCharCount: 0
        },
        data() {
            return {
                charCount:0,
                startTime: 0,
                avgSpeed: 0,
                time: 0
            }
        },
        methods: {
            calculateAvgSpeed: function (inputedCharCount) {
                    this.time = new Date().getTime() - this.startTime;
                    this.avgSpeed = this.getMin(this.time, inputedCharCount);
            },

            update: function () {
                if (this.inputedCharCount > 0) {
                    this.calculateAvgSpeed(this.inputedCharCount);
                    charCount = this.inputedCharCount;
                }
            },
            //take avg speed in min
            getMin: function (milliSec, count) {
                return Math.round(60 / ((milliSec / count) / 1000), 10);
            },
        },
        watch: {
            inputedCharCount: function (newVal, oldVal) {
                if (newVal == 1 && oldVal == 0) { //start meashure  when inputed   first char
                    this.log = 'start meashure  when inputed   first char';
                    this.startTime = new Date().getTime();//Set start Time
                }
                if (newVal == 0 && oldVal > 0) {
                this.calculateAvgSpeed(oldVal);
                 //   this.$store.dispatch('SAVE_SPEED', this.avgSpeed + '/' + this.errorCount);
                this.$emit('result',this.avgSpeed);
                }
               
            }
        },
        beforeMount() {
            setInterval(this.update, 1000);
        }
    };
</script>
<style scoped>

    h4 {
        margin: 2px;
    }

    .column {
        float: left;
        padding: 0px;
    }

    .row:after {
        background-color: gold;
        content: "";
        display: table;
        clear: both;
    }
</style>
