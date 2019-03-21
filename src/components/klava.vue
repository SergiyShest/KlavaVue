<template>
  <div class="about">{{counter}}
   <klava-inp :Example="Example" :Inputed="inputedString" v-on:error="errorCounter()" /> 
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
    Example: String,
    ErrorCount:Number
    
  },

 data(){return {
   inputedString:'',counter:0 
 };
 },
 methods:{
   errorCounter:function() 
   {
     this.counter++;
   } 
 },
 watch:{
  inputedString:function(newV, oldV)
  {
   
  } 
 }


}
</script>

