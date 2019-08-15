<template>
    <div class="row">
        <!--<h3>Ошибок: {{ state }}</h3>-->
        <h4 class="column">Ошибок: {{ errorCount }}</h4>
        <h4 class="column">Введено символов: {{ inputedCharCount }}</h4>
        <h4 class="column">Средняя скорость: {{ totalSpeed }}</h4>
       <h3>скорость {{ currentSpeed }}</h3>
        <h3>timeBegin {{ timeBegin }}</h3>
    </div>
</template>
<script>
   // import { bus } from '../store/bus'
    //this compontonent measured time beetwin key press, calculated avg speed  show  and  store
    export default {
        name: "speedometer",
        props: {
            inputedCharCount: 0,
            errorCount: 0,
            runningp:false
        },

        data() {
            return {
                timeBegin: 0,
                currentSpeed: 0,
                tickTime: 0
            }
        }
        ,
        methods: {
            //take avg speed in min
            getMin: function (milliSec, count) {
                return Math.round(60 / ((milliSec / count) / 1000), 10);
            },

            startNewMeasuuring: function () {
                this.timeBegin = 0;
                this.totalSpeed = 0;
                this.tickTime = 0;
                this.running = true;
            }
        }
        ,
        computed: {
         
            running: {
                get:
                    function () {
                        return this.$store.getters.GET_RUNNING;
                    },

                set:
                    function (newValue) {
                        this.$store.dispatch('SAVE_RUNNING', newValue);
                    }
            },
            totalSpeed: {
                get:
                    function () {
                        //get from 
                        var res = this.$store.getters.GET_SPEED.toString();

                        if(res==null||res=='0') {res= '0/0';}
                     
                        if (res == "0/0") {
                             this.startNewMeasuuring();
                        }
                        var srt_arr = res.split('/');
                        var totalSp = srt_arr[0];
                        console.log(totalSp);
                      return parseInt( totalSp);

                    },

                set:
                    function (newValue) {
                        this.$store.dispatch('SAVE_SPEED', newValue+'/'+this.errorCount);
                    }
            }

        }
        ,
        watch: {

               runningp:
                function (newVal) {
                    console.log('=========================RUNNING' + newVal);
                    this.startNewMeasuuring();
                }
           
            ,

            inputedCharCount: function (newVal) {
//start meashure  when inputing char count changed
                if (this.running == false) return;
                var timeNow = new Date();

                if (this.inputedCharCount == 0) {
                    this.timeBegin = 0
                    console.log("begin " + this.totalSpeed);
                    this.timeBegin = timeNow.getTime();
                    this.tickTime = this.timeBegin;
                } else {
                    var tick = timeNow.getTime() - this.tickTime;
                    var tickFromBegin = timeNow.getTime() - this.timeBegin;
                   
                    this.currentSpeed = this.getMin(tick, 1);//
                    this.totalSpeed = this.getMin(tickFromBegin, this.inputedCharCount);
                    this.tickTime = timeNow.getTime();//save time for next

                }
            }
             ,
            totalSpeed: function (newValue) {
                console.log("totalSpeed=>" + newValue)
                if (!newValue) {
                    this.startNewMeasuuring();
                }
            }
        }
     
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

    h4 {
        margin: 2px;
       
    }

    .column {
        float: left;
        padding: 0px;

        /* width: 50%;  height: 300px; Should be removed. Only for demonstration */
    }

    /* Clear floats after the columns */
    .row:after {
        background-color: gold;
        content: "";
        display: table;
        clear: both;
    }
</style>
