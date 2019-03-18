<template>
  <div class="about">
    <div >{{Example}}</div>
   <div  >
   </div>
   <input    v: v-model="input"/>
  </div>
</template>
<script >
import Vue from "vue";
export default {
  name: "Klava",
  props: {
    Example: String
  },

 data(){return {
   res:[{text:'',ok:true},{text:'',ok:false},{text:'',ok:null}],
   input:'tast'  
 };
 },
 methods:{
       compare(){
     var textOk='';
     var erText='';
     var textAfteEr='';
     var notInptText='';    
  for(i=0;i<Example.length;i++)
    { 
      var inpChar='';
      if(input.length<i){inpChar=input[i];}
      
      exChar=Example[i];
      if(inpChar==exChar && erText.length==0)
      {
        textOk+=inpChar;continue;
      }
       if(inpChar=='')
      {
        notInptText+=inpChar;continue;
      } 
      if(inpChar!=exChar||erText.length>0)
      {
        erText+=inpChar;
      } 
      if(inpChar!=exChar||erText.length==0)
      {
        textOk+=inpChar;
      }      
    }   
     
     }
 },
 watch:{
input:function(newV, oldV ){
 
}
}
}
</script>

