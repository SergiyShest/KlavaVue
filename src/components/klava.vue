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
    </div>
</template>
<script>
    import watcher from "./watcher.vue";
    import klavaInp from "./klavaInp.vue";

    export default {
        name: "Klava",
        components: {
            klavaInp, watcher
        },
        props: {


        },

        data() {
            return {
                AllExample: [
                    "Проба",
                    '++Как',
                    'Раз два'
                ],
                placeholder: 'input string above',
                inputedCharCount: 0,
                inputedString: '',
                errorCount: 0,
                currStrIndex: 0
            };
        },
        methods: {
           
            nextStr: function () {//
                this.inputedString = '';
                if (this.currStrIndex < this.AllExample.length+1) {
                    this.currStrIndex++;
                }
                else
                {
                  this.placeholder = 'press enter for continue';
                }
            }
        },
        computed: {
            Example: function () { return this.AllExample[this.currStrIndex]; }

        }

    }

</script>

