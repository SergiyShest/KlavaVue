<template>
    <div class="speedometer">
        <h3>Ошибок: {{ state }}</h3>
        <h3>Ошибок: {{ errorCount }}</h3>
        <h3>Введено символов: {{ inputedCharCount }}</h3>
        <h3>Средняя скорость: {{ totalSpeed }}</h3>
        <h3>скорость {{ currentSpeed }}</h3>
        <h3>timeBegin {{ timeBegin }}</h3>
    </div>
</template>
<script>
    import { bus } from '../store/bus'
    //this compontonent measured time beetwin key press, calculated avg speed  show  and  store
    export default {
        name: "speedometer",
        props: {
            inputedCharCount: 0,
            errorCount: 0
        },

        data() {
            return {
                timeBegin: 0,
                currentSpeed: 0,
                tickTime: 0,
                state: ''
            }
        }
        ,
        methods: {
            getMin: function (milliSec, count) {
                return Math.round(60 / ((milliSec / count) / 1000), 10);
            },
            startNew: function () {

                this.timeBegin = 0;
                this.totalSpeed = 0;
                this.tickTime = 0;
                this.running = true;
                console.log('start New ' );
                this.state = "startNew"

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
                        return this.$store.getters.GET_SPEED;
                    },

                set:
                    function (newValue) {
                        this.$store.dispatch('SAVE_SPEED', newValue);
                        //console.log("totalSpeedStored=>" + newValue)
                    }
            }

        }
        ,
        watch: {
            inputedCharCount: function (newVal) {
                if (this.running == false) return;
                var timeNow = new Date();

                if (this.inputedCharCount == 0 || this.timeBegin == 0) {
                    console.log("begin " + this.totalSpeed);
                    this.timeBegin = timeNow.getTime();
                    this.tickTime = this.timeBegin;
                } else {
                    var tick = timeNow.getTime() - this.tickTime;
                    var tickFromBegin = timeNow.getTime() - this.timeBegin;
                    // console.log('tick=' + tickFromBegin + ' time=' + tick+'  timeBegin='+60/(tick/1000));
                    this.currentSpeed = this.getMin(tick, 1);//
                    this.totalSpeed = this.getMin(tickFromBegin, this.inputedCharCount);
                    this.tickTime = timeNow.getTime();//save time
                    // console.log(this.totalSpeed);
                    // sessionStorage.setItem('speed', this.totalSpeed);
                  // this.$store.dispatch('SAVE_SPEED', this.totalSpeed);
                }
            }
            ,
            running: function (newValue) {
                console.log("running=>" + newValue)
            },
            totalSpeed: function (newValue) {
                console.log("totalSpeed=>" + newValue)
                if (this.totalSpeed == 0) {
                    this.startNew();
                }
            }
        }
        ,
        //computed: {
        //    running: {
        //        get:
        //            function () {
        //                return this.$store.getters.GET_RUNNING;
        //            },
        //        set:
        //            function (newValue) {
        //                this.$store.dispatch('SAVE_RUNNING', newValue);
        //            }
        //    }*
        //}
        //,
        //created: function () {
        //    bus.$on('stop', function () {
        //        this.running = false;
        //        console.log('stop running=' + this.running);
        //        this.state = "stop"
        //    });
        //    bus.$on('start', function () {
        //        alert('start');
        //    }
        //    );
        //    bus.$on('startNew', function (root) {
        //        //this.startNew();
        //        //this.timeBegin = 0;
        //        //this.currentSpeed = 0;
        //        //this.totalSpeed = 0;
        //        //root.$store.dispatch('SAVE_SPEED', 0);
        //        //this.tickTime = 0;
        //        //this.running = true;
        //        //console.log('startNew totalSpeed=' + this.totalSpeed);
        //        //this.state = "startNew"

        //    }
        //    );
        //    bus.$on('storeResult', function (result) {
        //        console.log('store =' + result);
        //        sessionStorage.setItem("result", result);
        //        this.state = "storeResult"
        //    }
        //    );

        //}
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

    .speedometer {
        border: 2px;
        border-radius: 2;
        border-width: 2px;
        color: #42b983;
        text-align: left;
    }
</style>
