<template>
  <div class="about">{{errorCount}}
    <watcher :inputedCharCount="inputedCharCount"  />
    <klava-inp :Example="Example" :Inputed="inputedString" 
              v-on:error="errorCounter()"
              v-on:next="nextStr()"/> 
   <input type="text"  v-model="inputedString" placeholder="input text above"/>
  </div>
</template>
<script >
    import watcher from "./watcher.vue";
    import klavaInp from "./klavaInp.vue";

    export default {
        name: "Klava",
        components: {
            klavaInp,watcher
        },
        props: {


        },

        data() {
            return {
                Example: 'String',
                inputedCharCount:0,
                inputedString: '',
                errorCount: 0
            };
        },
        methods: {
            errorCounter: function () {
                this.errorCount++;
            },
            nextStr: function () {
                this.inputedString = '';
                this.Example = '++Как ныне сбирается Вещий Олег отмстить неразумным хазарам.';
            }
        },
        watch: {
            //
            inputedString: function () {
                this.inputedCharCount++;

            }
        }
    }

</script>

