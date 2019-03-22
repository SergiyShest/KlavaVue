<template>
  <div class="about">{{errorCount}}
   <klava-inp :Example="Example" :Inputed="inputedString" 
              v-on:error="errorCounter()"
              v-on:next="nextStr()"/> 
   <input type="text"  v-model="inputedString" placeholder="input text above"/>
  </div>
</template>
<script >
import Vue from "vue";
import klavaInp from "./klavaInp.vue";
    export default {
        name: "Klava",
        components: {
            klavaInp
        },
        props: {


        },

        data() {
            return {
                Example: 'String',
                ErrorCount: 0,
                inputedString: '', errorCount: 0
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
            inputedString: function (newV, oldV) {

            }
        }
    }

</script>

