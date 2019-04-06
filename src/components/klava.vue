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
        <setting v-on:langChanged="changeLang($event)" />

    </div>
</template>
<script>

    import { GetKvasiText } from "./TextCreation.js";
    import speedometer from "./speedometer.vue";
    import klavaInp from "./klavaInp.vue";
    import setting from "./setting.vue";
    import { get } from "http";

    export default {
        name: "Klava",
        components: {
            klavaInp, speedometer, setting
        },
        props: {
        },

        data() {
            return {
                AllExample: [],
                placeholder: 'input string above',
                inputedCharCount: 0,
                inputedString: '',
                errorCount: 0,
                nextSentationIndex: 0,
                sentationCount: 2,
                lang: 'ru',
                avaiableLang: ['ru', 'en'],
                speed: 0
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
                }
            },
            nextText: function () {//
                this.running = true;
                this.nextSentationIndex = 0;
                this.AllExample = GetKvasiText(this.sentationCount, this.lang);
                console.log(this.Example);
            },
            // , fixSpeed: function () {
            //     return this.$store.getters.GET_SPEED;

            //     //return sessionStorage.getItem('speed');
            // },
            fixResult: function (result) {
                this.inputedCharCount = 0;
                this.running = false;
                return sessionStorage.setItem('result', result);

            }
        },
        computed: {
            Example: function () {
                if (!this.running) { return '' }
                return this.AllExample[this.nextSentationIndex];
            },
            running: {
                get:
                    function () {
                        return this.$store.getters.GET_RUNNING;
                    },

                set:
                    function (newValue) {
                        this.$store.dispatch('SAVE_RUNNING', newValue);
                    }
            }
        },
        beforeMount() {
            //инициализация первый раз
            this.AllExample = GetKvasiText(this.sentationCount, this.lang);
        }

    }

</script>

