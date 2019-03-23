<template>
    <div class="watcher" >
        <h3>ошибок {{ errorCount }}</h3>
        <h3>введено символов {{ inputedCharCount }}</h3>
        <h3>общая скорость {{ totalSpeed }}</h3>
        <h3>скорость {{ currentSpeed }}</h3>
    </div>
</template>
<script>
    export default {
        name: "watcher",
        props: {
            inputedCharCount: 0,
            errorCount:0

        },
        data() {
            return {
                timeBegin: 0,
                currentSpeed: 0,
                totalSpeed: 0,
                tickTime: 0
            }
        },
        methods: {
            getMin: function (milliSec,count) {
               // return Math.floor(milliSec / (1000 * 60),2);
                return Math.round(60 / ((milliSec / count )/1000),10) ;
            }

        },
        watch: {
            inputedCharCount: function (newVal) {
                var dat = new Date();

                if (this.inputedCharCount == 0 || this.timeBegin==0) {
                    //init date on new
                    this.timeBegin = dat.getTime();
                    this.tickTime = this.timeBegin;
                } else {
                    var tick = dat.getTime() - this.tickTime;
                    var tickFromBegin = dat.getTime() - this.timeBegin;
                    console.log('tick=' + tickFromBegin + ' time=' + tick+'  timeBegin='+60/(tick/1000));
                    this.currentSpeed = this.getMin(tick,1);
                    this.totalSpeed = this.getMin(tickFromBegin, this.inputedCharCount);
                    this.tickTime = dat.getTime();
                 

                }
            }

        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h3 {
        margin: 4px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    .watcher {
        
        border: 2px;
        border-radius: 2;
        border-width: 2px;
        color: #42b983;
        text-align: right;
    }
</style>
