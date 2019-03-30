<template>
    <div class="info">
        <watcher :inputedCharCount="inputedCharCount" :errorCount="errorCount" />
        <klava-inp :Example="Example" :Inputed="inputedString"  align="left" 
                   v-on:error="errorCount++"
                   v-on:next="nextStr()" 
                   v-on:ok="inputedCharCount++" 
                   />
        <input class="inputStr" type="text" v-model="inputedString" autofocus  
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
                currStrIndex: 0,
                sentationCount: 3,
                lang:'ru',
                avaiableLang:['ru','en']
            };
        },
        methods: {
            changeLang: function (e) {
                this.lang = e;
                this.AllExample = GetKvasiText(this.sentationCount, this.lang);
            },
            nextStr: function () {//
                this.inputedString = '';
                if (this.currStrIndex < this.AllExample.length-1) {
                    this.currStrIndex++;
                }
                else
                {
                    this.placeholder = 'press enter for continue';

                    this.AllExample = GetKvasiText(this.sentationCount, this.lang);
                }
            }
        },
        computed: {
            Example: function () { return this.AllExample[this.currStrIndex]; }

        },
        beforeMount() {
            this.AllExample = GetKvasiText(this.sentationCount, this.lang);
        }

    }

</script>

