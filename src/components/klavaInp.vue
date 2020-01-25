<template>
  <div class="inputStr">
    <span class="gr">{{ okText }}</span>
    <span class="re">{{ erText }}</span>
    <span>{{ notInptText }}</span>
  </div>
</template>

<script>
export default {
  name: "klvaInp",
  props: {
    Inputed: String,
    Example: String
  },
  data: function() {
    return {
      okText: "",
      erText: "",
      notInptText: "",
      oldErr: ""
    };
  },
  methods: {
    compare() {
      // console.log(this.Inputed);
      this.okText = "";
      this.erText = "";
      this.notInptText = "";
      if (this.Example == null) return;
      for (var i = 0; i < this.Example.length; i++) {
        var inpChar = "";
        if (i < this.Inputed.length) {
          inpChar = this.Inputed[i];
        }

        var exChar = this.Example[i];
        if (inpChar == exChar && this.erText.length == 0) {
          this.okText += inpChar;
          continue;
        }
        if (inpChar == "") {
          this.notInptText += exChar;
          continue;
        }
        if (inpChar != exChar || this.erText.length > 0) {
          this.erText += exChar;
        }
      }
    }
  },
  watch: {
    Example: function() {
      this.compare();
    },
    Inputed: function() {
      this.compare();
    },
    erText: function(newV, oldV) {
      if (oldV.length == 0 && newV.length > 0) {
        this.$emit("error"); //create Error event
      }
    },
    okText: function(newV, oldV) {
      if (this.Example == null || this.Example == "") return;
      if (this.Example.length <= this.okText.length) {
        this.$emit("next"); //create next event when Example is over
      } else {
        this.$emit("ok", this.Example[this.okText.length]);
      }
    }
  },
  beforeMount() {
    this.compare();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.gr {
  color: #42b983;
  background-color: rgb(212, 212, 236);
}

.re {
  color: #fff;

  background-color: rgb(243, 18, 2);
}
.inputStr {
  width: 100%;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 42px;
  text-align: left;
  background-color: rgb(212, 212, 236);
}
</style>
