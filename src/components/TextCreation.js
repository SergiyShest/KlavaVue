var Nouns = ["Ваня","Вей","Саша","Сережа","крокодил", "чувак", "чайник", "пирдедус", "задачонок", "разгильдяй", "петух", "пес"];
var Adjectives = ["пьяный","феерический","эпичный","бородатый","глупый","добрый","красный", "мокрый", "пластилиновый", "умный", "сумашедший"];
var AddVerbs = ["разнообразно","развратно","неумело","весело", "смешно", "красиво", "честно", "глупо", "криво", "пакостно", "злорадно", "подло"];
var Verbs = ["пищал", "подпрыгивал", "скакал", "лаял", "мылся", "прыгал", "пукал", "восхищался", "насмехался", "ругался", "бесился", "играл", "срал", "прыгал", "плясал", "лаял", "читал книгу", "пил водку", "играл в шахматы", "ловил рыбу", "катался на качелях", "курил", "лузгал семечки", "спал"]

var NounsW = ["милашка","Вероника","Наташа","Маша","Вика","Симка","Пандочка","Совунья","Нюша","девушка", "крыса", "коза", "лиса", "старуха", "фея", "лягушка", "ссука"];
var AdjectivesW = ["грязная","потная","хитрая","жадная","пухлая","писклявая","клевая","желтая", "мокрая", "злая", "уродливая", "глупая", "красивая","крохотная","блестящая","милая"];

var VerbsW = ["резвилась", "танцевала", "пускала пузыри", "плясала", "ныряла", "молилась", "мылась", "прыгала", "пукала", "восхищалась", "насмехалась", "ругалась", "бесилась", "играла", "лаяла", "целовалась", "мяукала", "хрюкала", "пила чай", "играла в слова","икала"]

var PlasesIn = ["помойке", "проруби", "шкафу","ведре", "кровати", "бане","нечистотах", "отходах", "луже", "яме", "доме", "машине", "самолете", "песочнице", "хлеву", "углу", "тубзике", "сортире"]

var PlasesOn = ["полу","травке","балконе", "крыше", "лужайке", "марсе", "луне", "земле", "жаре", "холоде", "столе", "скамейке", "посту", "шкафу"]

function Word(arr, exclude = null) {
    var ind = Math.floor(Math.random() * arr.length);//random digit in range 0-arr.length
    var word = arr[ind];

    if (exclude != null) {
        var num=exclude.indexOf(word);
    if (num >= 0) {
      word = Word(arr, exclude);
    }}
    return word;
}

function TRANSLATE(txt, dir = "ru-en") {
    var request = new XMLHttpRequest();
    var text = encodeURIComponent(txt);
    var key = "trnsl.1.1.20190324T133417Z.c2eddb7568471f8d.219fc4005536b04ae17e029f51e3438ac66e5001";
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&text=" + text + "&lang=" + dir + "&format=plain&options=1"
    request.open('GET', url, false);
    request.send();
    console.log(request.response);
    if (request.status >= 200 && request.status < 400) {
        console.log(request);
        var data = JSON.parse(request.responseText);
        return data.text;
    }
};


//предложение мужского рода
function GetSentationM() {

    var adjective1 = Word(Adjectives);
    var arr=  [ adjective1];

     
    var s =
        adjective1 + ' и ' +//прилагательное
        Word(Adjectives, arr) + ' ' +
        Word(Nouns) + ' ' +//существительное
        Word(AddVerbs) + ' ' +//наречие
        Word(Verbs);//глагол

    return s + AddPlace() + '.';
}
//предложение женского рода
function GetSentationW() {
    var adjective1 = Word(AdjectivesW);
    var arr=  [ adjective1];

    var s =
    adjective1 + ' и ' +
        Word(AdjectivesW,arr) + ' ' +
        Word(NounsW) + ' ' +
        Word(AddVerbs) + ' ' +
        Word(VerbsW);

    return s + AddPlace() + '.';
}

function GetSentation3() {

    var s =
        Word(Adjectives) + ', ' + Word(Adjectives) + ' и ' + Word(Adjectives) + ' ' +
        Word(Nouns) + ' ' +
        Word(AddVerbs) + ' ' +
        Word(Verbs);
    return s + AddPlace() + '.';
}
//place and preposition (in or on)

function AddPlace() {
    var ind = Math.floor(Math.random() * 2);
    if (ind == 0) { return ' на ' + Word(PlasesOn); }
    else { return ' в ' + Word(PlasesIn); }
}
//получение случайного предложения
function GetSentation(short = false) {
    if (short) return Word(Nouns);
    var sentence = GetSentationW();
    var sentType = Math.floor(Math.random() * 4);//
   if (sentType == 0) sentence = GetSentationM();
    if (sentType == 1) sentence = GetSentationW();
   if (sentType == 2) sentence = GetSentation3();
    var sentence = sentence[0].toUpperCase() + sentence.substr(1, sentence.length);
    return sentence;
}

//получение текста из count предложений на lang языке
function KvasiText(count, lang,short) {
    var arr = new Array();
    for (var i = 0; i < count; i++) {
        arr[i] = GetSentation(short);
    }
    if (lang == 'en') {
        for (var i = 0; i < count; i++) {
            arr[i] = TRANSLATE(arr[i]);
        }
    }
    return arr;
}

export function GetKvasiText(count, lang,short) {
    return KvasiText(count, lang,short=true);
}