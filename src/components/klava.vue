<template>
    <div class="main">
        <div>Количество ошибок {{errorCount }}</div>
        <counter :inputedCharCount="inputedCharCount" v-on:result="fixResult($event)" />
        <!--<speedometer :inputedC

        harCount="inputedCharCount" :errorCount="errorCount" :runningp="running" />
        <div>{{InitExample[nextSentationIndex]}}</div>-->

        <klava-inp :Example="Example" :Inputed="inputedString" align="left"
                   v-on:error="errorCount++"
                   v-on:next="nextSentation()"
                   v-on:ok="setNextChar($event)"
                    />
        <input class="inputStr" type="text"
               v-model="inputedString"
               v-on:keyup.enter="nextText()"
               v-on:keydown="charDown=$event"
               v-on:keyup="charUp=$event"
               autofocus
               v-bind:placeholder="placeholder"
               align="left" />
        <br />
        <buttons :charDown="charDown" :charUp="charUp" :nextChar="nextChar" />
        <div class="row">
            <setting class="column" v-on:settingsChanged="settingsChanged($event)"
                     style="width:auto" />
            <chart class="column" style="min-width:80%" />
        </div>
    </div>
</template>
<script>

    import { GetKvasiTextS } from "./TextCreation.js";
    import speedometer from "./speedometer.vue";
    import counter from "./counter.vue";
    import klavaInp from "./klavaInp.vue";
    import setting from "./setting.vue";
    import chart from "./klavaChart.vue";
    import buttons from "./buttons.vue";


    export default {
        name: "Klava",
        components: {
          counter,  klavaInp, speedometer, setting, chart, buttons
        },
        props: {
        },
        data() {
            return {
                 speed: 0,
                placeholder: 'input string above',
                inputedCharCount: 0,
                inputedString: '',
                errorCount: 0,
                nextSentationIndex: 0,
                running: true,
                charDown: null,
                charUp: null,
                nextChar: null,
                setting:null,
                avaiableLang: ['ru', 'en'],
                InitExample: [],//для английского языка первоначальный русский вариант
                AllExample: [],
            };
        },
        methods: {
           
            settingsChanged: function (e) {
                this.setting = e;
                this.InitExample = new Array();
                this.AllExample = GetKvasiTextS(this.setting,false,this.InitExample);
            }           ,
            nextSentation: function () {//
                this.inputedString = '';

                if (this.nextSentationIndex < this.AllExample.length - 1) {
                    this.nextSentationIndex++;
                 
                }
                else { // педложение кочилось
                    this.inputedCharCount = 0;
                 //  var currSpeed = this.$store.getters.GET_SPEED;
                //    this.placeholder = 'Your speed is ' + currSpeed + ' press enter for continue';
                //    this.fixResult(currSpeed);
                   // console.log(this.placeholder);
                }
            }

            ,
            nextText: function () {//create next text
               this.running = false;
                this.$root.$store.dispatch('SAVE_SPEED', 0);//send command in component Speedometr for reset
               
                this.speed = 0;
                this.placeholder = 'input string above';
                
                this.inputedString = '';
                this.errorCount = 0;
                this.nextSentationIndex = 0;
                this.InitExample = new Array();
                this.AllExample = GetKvasiTextS(this.setting,false,this.InitExample);
                this.nextChar = this.AllExample[0][0].toLowerCase(); 
                this.running = true;
            }
            ,
                fixResult: function (result) {
                this.inputedCharCount = 0;
                this.running = false;
                this.nextChar='=-=';//this reset highLight button
                    var usAch = this.$store.getters.GET_USER_ACHIEVEMENT_CHART;
               this.placeholder = 'Your speed is ' + result + ' press enter for continue';

                usAch = usAch.concat(result+'/'+this.errorCount);
                this.$store.dispatch('SAVE_USER_ACHIEVEMENT_CHART', usAch);//Save result
            }
            ,
            setNextChar: function (param) {
                this.inputedCharCount= this.inputedString.Length;
                this.nextChar = param.toLowerCase();
            }
        }
        ,
        computed: {
            Example: function () {
                if (!this.running) { return '' }
                var s=this.AllExample[this.nextSentationIndex];
                console.log(s);
                return this.AllExample[this.nextSentationIndex];
            }
        },
        beforeMount() {
           
            //инициализация первый раз
            //this.AllExample = GetKvasiTextS(setting);
            //highLight first char in
           //  this.nextChar = this.AllExample[0][0].toLowerCase();
           // this.setNextChar(firstChar);
        },
        afterMount() {
            //highLight first char in
          //  var firstChar = this.AllExample[0][0];
          //  this.setNextChar(firstChar);
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

