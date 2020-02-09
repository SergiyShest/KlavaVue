<template>
    <div>
        <Button v-for="b in row1" :key="b.code" v-bind:class="{  highlight:b.highlight }">{{b.sh}}</Button><br />
        <button style="width:9%">TAB</button>
        <Button v-for="b in row2" :key="b.code" v-bind:class="{ highlight:b.highlight}">{{b.sh}}</Button><br />
        <button style="width:12%">Caps Lock</button>
        <Button v-for="b in row3" :key="b.code" v-bind:class="{highlight:b.highlight}">{{b.sh}}</Button><br />
        <!--<button style="width:16%"   >Shift</button>-->
        <Button v-for="b in row4" :key="b.code" v-bind:class="{highlight:b.highlight}">{{b.sh}}</Button><br />
        <Button v-for="b in row5" :key="b.code" v-bind:class="{highlight:b.highlight}" v-bind:style="{ width: b.Width+'%' }">{{b.sh}}</Button><br />

    </div>
</template>
<script>
    import { mapActions, mapState, mapSetters, mapGetters } from 'vuex'
    export default {
        name: "buttons",
        data() {
            return {
                row1: [
                { code: "Backquote", sh: 'ё', isPressed: false, highlight: false },
                { code: "Digit1", sh: '1', isPressed: false, highlight: false }, { code: "Digit2", sh: '2', isPressed: false, highlight: false }, { code: "Digit3", sh: '3', isPressed: false, highlight: false },
                { code: "Digit4", sh: '4', isPressed: false, highlight: false }, { code: "Digit5", sh: '5', isPressed: false, highlight: false }, { code: "Digit6", sh: '6', isPressed: false, highlight: false },
                { code: "Digit7", sh: '7', isPressed: false, highlight: false }, { code: "Digit8", sh: '8', isPressed: false, highlight: false }, { code: "Digit9", sh: '9', isPressed: false, highlight: false },
                { code: "Digit0", sh: '0', isPressed: false, highlight: false }, { code: "Minus", sh: '-', isPressed: false, highlight: false }, { code: "Equal", sh: '=', isPressed: false, highlight: false },
                { code: "Backspace", sh: '<==', isPressed: false, highlight: false }
                ],

                row2: [
                { code: "KeyQ", sh: "й", isPressed: false, highlight: false }, { code: "KeyW", sh: 'ц', isPressed: false, highlight: false }, { code: "KeyE", sh: 'у', isPressed: false, highlight: false },
                { code: "KeyR", sh: 'к', isPressed: false, highlight: false }, { code: "KeyT", sh: 'е', isPressed: false, highlight: false }, { code: "KeyY", sh: 'н', isPressed: false, highlight: false },
                { code: "KeyU", sh: 'г', isPressed: false, highlight: false }, { code: "KeyI", sh: 'ш', isPressed: false, highlight: false }, { code: "KeyO", sh: 'щ', isPressed: false, highlight: false },
                { code: "KeyP", sh: 'з', isPressed: false, highlight: false }, { code: "BracketLeft", sh: 'х', isPressed: false, highlight: false }, { code: "BracketRight", sh: 'ъ', isPressed: false, highlight: false }],

                row3: [
                { code: "KeyA", sh: 'ф', isPressed: false, highlight: false }, { code: "KeyS", sh: 'ы', isPressed: false, highlight: false }, { code: "KeyD", sh: 'в', isPressed: false, highlight: false },
                { code: "KeyF", sh: 'а', isPressed: false, highlight: false }, { code: "KeyG", sh: 'п', isPressed: false, highlight: false }, { code: "KeyH", sh: 'р', isPressed: false, highlight: false },
                { code: "KeyJ", sh: 'о', isPressed: false, highlight: false }, { code: "KeyK", sh: 'л', isPressed: false, highlight: false }, { code: "KeyL", sh: 'д', isPressed: false, highlight: false },
                { code: "Semicolon;", sh: 'ж', isPressed: false, highlight: false }, { code: "Quote;", sh: 'э', isPressed: false, highlight: false }, { code: "enter", sh: 'Enter' }],

                row4: [
                { code: "Shift", sh: 'Shift', isPressed: false, highlight: false  },
                { code: "KeyZ", sh: 'я', isPressed: false, highlight: false }, { code: "KeyX", sh: 'ч', isPressed: false, highlight: false }, { code: "KeyC", sh: 'с', isPressed: false, highlight: false },
                { code: "KeyV", sh: 'м', isPressed: false, highlight: false }, { code: "KeyB", sh: 'и', isPressed: false, highlight: false }, { code: "KeyN", sh: 'т', isPressed: false, highlight: false },
                { code: "KeyM", sh: 'ь', isPressed: false, highlight: false }, { code: "Comma", sh: 'б', isPressed: false, highlight: false }, { code: "Period", sh: 'ю', isPressed: false, highlight: false },
                { code: "Slash", sh: '.', isPressed: false, highlight: false }
                ],

                row5: [
                { code: "Ctrl", sh: 'Ctrl', isPressed: false, highlight: false }, { code: "fn", sh: 'fn', isPressed: false, highlight: false }, { code: "Win", sh: 'Win', isPressed: false, highlight: false },
                { code: "AltL", sh: 'Alt', isPressed: false, highlight: false }, { code: "Space", sh: 'Пробел', isPressed: false, highlight: false },
                { code: "AltR", sh: 'Alt', isPressed: false, highlight: false }
                ]
            }
        }
        , methods: {
            setButtonPressed: function (code, pressed) {
                var item = this.row1.find(function (v) { return v.code == code; });
                if (item != undefined) {
                    item.isPressed = pressed;
                }
                else {
                    item = this.row2.find(function (v) { return v.code == code; });
                    if (item != undefined) {
                        item.isPressed = pressed;
                    }
                    else {
                        item = this.row3.find(function (v) { return v.code == code; });
                        if (item != undefined) {
                            item.isPressed = pressed;
                        }
                        else {
                            item = this.row4.find(function (v) { return v.code == code; });
                            if (item != undefined) {
                                item.isPressed = pressed;
                            }
                            else {
                                console.log(code);
                                item = this.row5.find(function (v) { return v.code == code; });
                                if (item != undefined) {
                                    item.isPressed = pressed;
                                }

                            }

                        }
                    }
                }
            },
            highlightButton: function (code, highligh) {

                var item = this.row1.find(function (v) { return v.sh.toLowerCase() == code.toLowerCase(); });
                if (item != undefined) {
                    item.highlight = highligh;
                    item.sh= code;
                }
                else {
                    item = this.row2.find(function (v) { return v.sh.toLowerCase() == code.toLowerCase(); });
                    if (item != undefined) {
                        item.highlight = highligh;
                        item.sh = code;
                    }
                    else {
                        item = this.row3.find(function (v) { return v.sh.toLowerCase() == code.toLowerCase(); });
                        if (item != undefined) {
                            item.highlight = highligh;
                            item.sh = code;
                        }
                        else {
                            item = this.row4.find(function (v) { return v.sh.toLowerCase() == code.toLowerCase();});
                            if (item != undefined) {
                                item.highlight = highligh;
                                item.sh = code;
                            }
                            else {
                                if (code == ' ')
                                {
                                    code = 'Пробел';
                                }
                                item = this.row5.find(function (v) { return v.sh.toLowerCase() == code.toLowerCase(); });
                                if (item != undefined) {
                                    item.highlight = highligh;
                                   // item.sh = code;
                                }
                            }

                        }
                    }
                }
            }
        }


        ,
        watch: {

            //HighLigth char thet user need press
            nextChar: function (nextChar, oldChar) {

                this.highlightButton('Shift', false);
                if (oldChar != null) { this.highlightButton(oldChar, false); }

                if (nextChar != nextChar.toLowerCase()) {
                    this.highlightButton('Shift', true);
                }
             //   if (nextChar != null)
             //       nextChar = nextChar.toLowerCase(); 

                this.highlightButton(nextChar, true);
            }
        },
        beforeMount() {
            if (this.nextChar != null) { this.highlightButton(this.nextChar , true); }
          
        },
        computed: {
            ...mapGetters(['nextChar'])
        },
    }
</script>
<style>
    button {
        min-width: 6%;
        font-size: large;
        margin: 3px;
        border: 2px;
        border-style: outset;
        border-radius: 2px;
        border-width: 2px;
        color: darkblue;
        background-color: lightgray;
    }

    .pressed {
        background-color: aqua;
    }
    .highlight {
        color: white;
        background-color: green;
    }
</style>
