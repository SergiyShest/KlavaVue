<template>
  <div class="hello">
    <span class="gr">{{textOk}}</span>
    <span class="re">{{erText}}</span>
    <span>{{notInptText}}</span> 
  </div>
</template>

<script>
export default {
  name: "klvaInp",

  props: {
    Inputed: String,
    Example: String
  },
  data:function () {
    return {
      textOk:'',
    erText:'',
    notInptText:'',
    oldErr:''
    }
  }
 ,
  methods:{
         compare(){
   this.textOk='';this.erText='';this.notInptText='';
  for(var i=0;i<this.Example.length;i++)
    { 
      var inpChar='';
      if(i<this.Inputed.length){inpChar=this.Inputed[i];}

    var exChar=this.Example[i];
      if(inpChar==exChar && this.erText.length==0)
      {
        this.textOk+=inpChar;continue;
      }
       if(inpChar=='')
      {
        this.notInptText+=exChar;continue;
      } 
      if(inpChar!=exChar||this.erText.length>0)
      {
        this.erText+=exChar;
      } 
    }   
     //if(this.erText.length>0)
     //{
     //  this.$emit('error', this.erText);
     //}
     }
},computed: {
    // геттер вычисляемого значения
    reversedMessage: function () {
      this.compare();
      return this.Inputed.split('').reverse().join('')
    }},

watch:{
reversedMessage:function(newV, oldV ){
//this.compare();
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
color: #fff;
background-color: rgb(243, 18, 2);
}
</style>
