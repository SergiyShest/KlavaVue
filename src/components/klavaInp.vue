<template>
    <div class="hello">
        <span class="gr">{{okText}}</span>
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
        data: function () {
            return {
                okText: '',
                erText: '',
                notInptText: '',
                oldErr: ''
            }
        }
        ,
        methods: {
            compare() {
                this.okText = ''; this.erText = ''; this.notInptText = '';
                for (var i = 0; i < this.Example.length; i++) {
                    var inpChar = '';
                    if (i < this.Inputed.length) { inpChar = this.Inputed[i]; }

                    var exChar = this.Example[i];
                    if (inpChar == exChar && this.erText.length == 0) {
                        this.okText += inpChar; continue;
                    }
                    if (inpChar == '') {
                        this.notInptText += exChar; continue;
                    }
                    if (inpChar != exChar || this.erText.length > 0) {
                        this.erText += exChar;
                    }
                }

            }
        }
        ,
        watch: {

            Inputed: function () {
                this.compare();
            },
            erText: function (newV, oldV) {
                if (oldV.length == 0 && newV.length > 0) {
                    this.$emit('error');//create Error event
                }
            },
            okText: function (newV, oldV) {

                if (this.Example.length <= this.okText.length) {
                    console.log(this.Example + '<=' + newV.length)
                    this.$emit('next');//create next event
                }

            }
        },
        beforeMount() {
            this.compare();

        }
    }
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
</style>
