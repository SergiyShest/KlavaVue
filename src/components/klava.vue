<template>
  <div class="about">
   <input  v-on:onkeypress="inputNextChar"  v: v-model="input"/>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


export default {
  //@Prop() private msg!: string;

 data(){return {
   input:'tast'  
 };
 },
 methods:{
     inputNextChar( ev: any){
    alert(ev);
     }
 }
}
</script>