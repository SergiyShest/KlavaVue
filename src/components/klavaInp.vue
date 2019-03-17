<template>
  <div class="hello">
    <span class="gr">{{textOk}}</span>
    <span class="re">{{erText}}</span>
    <span>{{notInpText}}</span> 
  </div>
</template>

<script>
export default {
  name: "InputedString",
  props: {
    Inputed: String,
    Example: String
  },
  data:{textOk:'',erText:'',notInptText:''}

 ,
  methods:{
         compare(){
   textOk='';erText='';notInptText='';
  for(i=0;i<Example.length;i++)
    { 
      var inpChar='';
      if(Inputed.length<i){inpChar=Inputed[i];}
      
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
    }   
     
     }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.gr{
color: #42b983;
background-color: rgb(212, 212, 236);
}
.re{
color: #bb1212;
}
</style>
