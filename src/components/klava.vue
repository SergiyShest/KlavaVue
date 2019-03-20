<template>
  <div class="about">
   <klava-inp :Example="Example" :Inputed="inputedString" /> 
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
   inputedString:''  
 };
 },
 methods:{
     
 },
 watch:{
  inputedString:function(newV, oldV)
  {
   
  } 
 }


}
</script>

