<template>
    <div class="info">
        <speedometer :inputedCharCount="inputedCharCount" :errorCount="errorCount" />
        <klava-inp :Example="Example" :Inputed="inputedString" align="left"
                   v-on:error="errorCount++"
                   v-on:next="nextSentation()"
                   v-on:ok="inputedCharCount++" />
        <input class="inputStr" type="text" v-model="inputedString" v-on:keyup.enter="nextText()" autofocus
               v-bind:placeholder="placeholder"
               align="left" />
        <br />
        <div class="row">
            <setting class="column" v-on:langChanged="changeLang($event)" style="width:auto"/>
            <chart class="column" style="min-width:80%" />
        </div>
    </div>
</template>
<script>

    import { GetKvasiText } from "./TextCreation.js";
    import speedometer from "./speedometer.vue";
    import klavaInp from "./klavaInp.vue";
    import setting from "./setting.vue";
    import chart from "./klavaChart.vue";
    import { get } from "http";
    import { bus } from '../store/bus'

    export default {
        name: "Klava",
        components: {
            klavaInp, speedometer, setting, chart
        },
        props: {
        },

        data() {
            return {
                AllExample: [],
                speed: 0,
                placeholder: 'input string above',
                inputedCharCount: 0,
                inputedString: '',
                errorCount: 0,
                nextSentationIndex: 0,
                running: true,

                sentationCount: 2,
                lang: 'ru',
                avaiableLang: ['ru', 'en']
            };
        },
        methods: {
            changeLang: function (e) {
                this.lang = e;
                this.AllExample = GetKvasiText(this.sentationCount, this.lang);
            },
            nextSentation: function () {//
                this.inputedString = '';

                if (this.nextSentationIndex < this.AllExample.length - 1) {
                    this.nextSentationIndex++;
                    this.placeholder = 'nextIndex=' + this.nextSentationIndex + ' ' + this.AllExample.length + '';
                }
                else {

                    var currSpeed = this.$store.getters.GET_SPEED;
                    this.placeholder = 'Your speed is ' + currSpeed + ' press enter for continue';


                    this.fixResult(currSpeed);
                    console.log(this.placeholder);
                }
            },
            nextText: function () {//create next text
                this.$root.$store.dispatch('SAVE_SPEED', 0);//send command in component Speedometr for reset
                this.running = true;
                this.speed = 0;
                this.placeholder = 'input string above';
                this.inputedCharCount = 0;
                this.inputedString = '';
                this.errorCount = 0;
                this.nextSentationIndex = 0;
                this.AllExample = GetKvasiText(this.sentationCount, this.lang);

            },
            fixResult: function (result) {
                this.running = false;
                // const userAchivment= [{date:timeNow.getTime(),Errors:error,Speed:result}]
                var usAch = this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
                usAch = usAch.concat(result);

                this.$store.dispatch('SAVE_USER_ACHIEVEMENT_CHART', usAch);//Save result

                // bus.$emit('stop', result);
                // bus.$emit('storeResult', result);//create  event
                //   console.log('fixResult =>' + usAch+'  '+ result+'----'+this.$store.getters.GET_SPEED);
            }
        },
        computed: {
            Example: function () {
                if (!this.running) { return '' }
                return this.AllExample[this.nextSentationIndex];
            },
            //running: {
            //    get:
            //        function () {
            //            return this.$store.getters.GET_RUNNING;
            //        },

            //    set:
            //        function (newValue) {
            //            this.$store.dispatch('SAVE_RUNNING', newValue);
            //        }
            //}
        },
        beforeMount() {
            //инициализация первый раз
            this.AllExample = GetKvasiText(this.sentationCount, this.lang);
        }

    }

</script>
<style>


    .column {
        float: left;
        padding: 0px;
        /* width: 50%;  height: 300px; Should be removed. Only for demonstration */
    }

    /* Clear floats after the columns */
    .row:after {
        
        content: "";
        display: table;
        clear: both;
    }
</style>

