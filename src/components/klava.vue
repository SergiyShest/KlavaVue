<template>
    <div class="info">
        <watcher :inputedCharCount="inputedCharCount" :errorCount="errorCount" v-on:speed="fixSpeed($event)" />
        <klava-inp :Example="Example" :Inputed="inputedString"  align="left" 
                   v-on:error="errorCount++"
                   v-on:next="nextSentation()" 
                   v-on:ok="inputedCharCount++" 
                   />
        <input class="inputStr" type="text" v-model="inputedString" v-on:keyup.enter="nextText()"  autofocus  
       v-bind:placeholder="placeholder"
        align="left" />
        <br/>
        <setting v-on:langChanged="changeLang($event)" />
      
    </div>
</template>
<script>

    import { GetKvasiText } from "./TextCreation.js";
    import watcher from "./watcher.vue";
    import klavaInp from "./klavaInp.vue";
    import setting from "./setting.vue";

    export default {
        name: "Klava",
        components: {
            klavaInp, watcher,setting
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
                lang:'ru',
                avaiableLang: ['ru', 'en'],
                speed:0

            };
        },
        methods: {
            changeLang: function (e) {
                this.lang = e;
                this.AllExample = GetKvasiText(this.sentationCount, this.lang);
            },
            nextSentation: function () {//
                this.inputedString = '';
                this.placeholder = 'nextSentationIndex='+this.SnextSentationIndex +' '+ this.AllExample.length +' press enter for continue';
                if (this.nextSentationIndex < this.AllExample.length-1) {
                    this.nextSentationIndex++;
                }
                else
                {
                    this.nextSentationIndex=0
                    this.placeholder = 'Your speed is '+this.speed+' press enter for continue';
                }
            },
            nextText: function () {//
                  alert('ssss');
                  if (this.inputedString = '') {
                    this.AllExample = GetKvasiText(this.sentationCount, this.lang);
                }
            }
            , fixSpeed: function (speed) {
                this.speed = speed;
            }
        },
        computed: {
            Example: function () { return this.AllExample[this.nextSentationIndex]; }

        },
        beforeMount() {
            //инициализация первый раз
            this.AllExample = GetKvasiText(this.sentationCount, this.lang);
        }

    }

</script>

