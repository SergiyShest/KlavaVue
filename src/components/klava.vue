<template>
    <div class="info">
        <watcher :inputedCharCount="inputedCharCount" :errorCount="errorCount" />
        <klava-inp :Example="Example" :Inputed="inputedString"  align="left" 
                   v-on:error="errorCounter()"
                   v-on:next="nextStr()" />
        <input class="inputStr" type="text" v-model="inputedString" placeholder="input text above" 
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
                    "Проба пера проба пера проба пера",
                    '++Как ныне сбирается Вещий Олег отмстить неразумным хазарам.',
                    'Раз два три четыре пять вышел зайчик погулять'
                ],
                //        Example: 'String',
                inputedCharCount: 0,
                inputedString: '',
                errorCount: 0,
                currStrIndex: 0
            };
        },
        methods: {
            errorCounter: function () {
                this.errorCount++;
            },
            nextStr: function () {
                this.inputedString = '';

                if (this.currStrIndex < this.AllExample.length) {
                    this.currStrIndex++;
                }
            }
        },
        watch: {
            //
            inputedString: function () {
                this.inputedCharCount++;

            }
        },
        computed: {
            Example: function () { return this.AllExample[this.currStrIndex]; }

        }

    }

</script>

