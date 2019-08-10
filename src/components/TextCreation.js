import { WordSet ,Dicti} from "@/components/dictionry.js";

/*  */
export function WordEx(dictName) {
    var counerNam = dictName + "_counter";
    var word = '';
    //  console.log('Dicti['+counerNam+']='+Dicti[counerNam]);
    if (!Dicti[counerNam]) { Dicti[counerNam] = 0 }//set counter=0 first time
    if (Dicti[counerNam] == 0) {
        shuffleArray(Dicti[dictName]);//
        // console.log('shuffled ' + dictName +'='+Dicti[counerNam]);
    }
    word = Dicti[dictName][Dicti[counerNam]];
    Dicti[counerNam]++;
    if (Dicti[counerNam] = Dicti[dictName].length) {//if and of array
        Dicti[counerNam] = 0;

    }
    return word;
}
//перемешивание массива
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];//store last elem array
        array[i] = array[j];//copy ramdom elem in last
        array[j] = temp;//set ramdom elem stored value
    }
}

export function TRANSLATE(txt, dir = "ru-en") {
    var request = new XMLHttpRequest();
    var text = encodeURIComponent(txt);
    var key = "trnsl.1.1.20190324T133417Z.c2eddb7568471f8d.219fc4005536b04ae17e029f51e3438ac66e5001";
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&text=" + text + "&lang=" + dir + "&format=plain&options=1"
    request.open('GET', url, false);
    request.send();
    if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        var res = data.text[0];
        return res;
    }
};


//предложение мужского рода
function GetSentationM() {

    var s =
        WordEx('Adjectives') + ' и ' +//прилагательное
        WordEx('Adjectives') + ' ' +
        WordEx('Nouns') + ' ' +//существительное
        WordEx('AddVerbs') + ' ' +//наречие
        WordEx('Verb');//глагол

    return s + AddPlace() + '.';
}
//предложение женского рода
function GetSentationW() {


    var s =
        WordEx('AdjectivesW') + ' и ' +
        WordEx('AdjectivesW') + ' ' +
        WordEx('NounsW') + ' ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('VerbsW');

    return s + AddPlace() + '.';
}

function GetSentation3() {

    var s =
        WordEx('AdjectivesW') + ', ' + WordEx('AdjectivesW') + ' и ' + WordEx('AdjectivesW') + ' ' +
        WordEx('NounsW') + ' ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('VerbsW');
    return s + AddPlace() + '.';
}

export function GetSentation4() {

    var s =
        WordEx('AdjectivesW') + ' и ' + WordEx('AdjectivesW') + ' ' +
        WordEx('NounsW') + ' ' +
        WordEx('AddVerbs') + ' и ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('VerbsW');
    return s + AddPlace() + '.';
}


export function GetSentation5() {


    var s =
        WordEx('AdjectivesW') + ' ' +
        WordEx('NounsW') + ' и ' + WordEx('Adjectives') + ' ' + WordEx('Nouns') + ' ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('Verbs');
    return s + AddPlace() + '.';
}

export function GetSentation6() {


    var s =
        WordEx('Adjectives') + ' ' + WordEx('Nouns') +
        ' и ' +
        WordEx('AdjectivesW') + ' ' + WordEx('NounsW') + ' ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('Verbs');
    return s + AddPlace() + '.';
}


export function GetSentation7() {

    var s = WordEx('Adjectives') + ' ' + WordEx('Nouns') + ' и ' + WordEx('Adjectives') + ' ' + WordEx('Nouns') + ' ' + WordEx('AddVerbs') + ' ' + WordEx('Verbs') + ' и ' + WordEx('AddVerbs') + ' ' + WordEx('Verbs') + ' ';
    return s + AddPlace() + '.';
}

//place and preposition (in or on)

export function AddPlace() {
    var ind = Math.floor(Math.random() * 3);
    if (ind == 0) { return ' на ' + WordEx('PlasesOn'); }
    if (ind == 1) { return ' в ' + WordEx('PlasesIn'); }
    if (ind == 2) { return ' под ' + WordEx('PlasesUnder'); }


}
//получение случайного предложения
function GetSentation(short = false) {

    if (short) return WordEx('Nouns');//режим для теста

    var sentence = '';//GetSentationW();
    var sentType = Math.floor(Math.random() * 7);//получаю случайное число от 0 до 3
    if (sentType === 0) { sentence = GetSentationM(); }
    if (sentType === 1) { sentence = GetSentationW(); }
    if (sentType === 2) { sentence = GetSentation3(); }
    if (sentType === 3) { sentence = GetSentation4(); }
    if (sentType === 4) { sentence = GetSentation5(); }
    if (sentType === 5) { sentence = GetSentation6(); }
    if (sentType === 6) { sentence = GetSentation7(); }
    if (sentType === 7) { sentence = GetSentationW(); }


    console.log("sentence =" + sentType);
    var sentence = sentence[0].toUpperCase() + sentence.substr(1, sentence.length);
    return sentence;
}

const LearnSet = {
    set0: ["а", 'о', 'п', 'р'],
    set1: ["ы", 'в', "а", 'п', "р", 'о', "о", 'л', "д"],
    set2: ["ы", 'в', "а", 'п', "р", 'о', "о", 'л', "д",
        "ц", 'у', "к", 'е', "н", 'г', "ш", 'щ', "з",]
}

//получение набора букв для обучения
export function GetLern(type, short = false) {
    let set = LearnSet.set0;
    console.log(type);
    if (type === "learn2") {
        set = LearnSet.set1;
    }
    if (type === "learn3") {
        set = LearnSet.set2;
    }
    var res = new Array();
    for (var i = 0; i < 32; i++) {
        var j = Math.floor(Math.random() * (set.length));
        if (i > 0 && !(res.length % 5)) {
            res.push(' ');//insert white space every 3 simvols
        }
        res.push(set[j]);
    }
    return res;
}

//получение набора букв для обучения
export function GetWord(type, short = false) {
    let set = WordSet.set0;
    console.log(type);
    if (type === "word2") {
        set = WordSet.set1;
    }
    if (type === "word3") {
        set = WordSet.set2;
    }
    if (type === "word4") {
        set = WordSet.set3;
    }    
    var res = '';
    for (var i = 0; i < 4; i++) {
        if (res.length > 0) { res += ' '; }
        var j = Math.floor(Math.random() * (set.length));
        res += set[j];
    }
    return res;
}


//получение текста из count предложений на lang языке
function KvasiText(count, lang, short) {
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

export function GetKvasiText(count, lang, short) {
    return KvasiText(count, lang, true);
}

export function GetKvasiTextS(set, short, isxArr = null) {
    var arr = new Array();
    for (var i = 0; i < set.SentationsCount; i++) {
        switch (set.Mode) {
            case "KvaziText": {
                arr[i] = GetSentation(short);
            } break;
            case "learn1":
            case "learn2":
            case "learn3":
                {
                    arr[i] = GetLern(set.Mode, short);
                } break;
            case "word0":
            case "word1":
            case "word2":
            case "word3":
                {
                    arr[i] = GetWord(set.Mode, short);
                } break;
        }
    }

    if (set.Lang === 'en') {
        if (isxArr != null) {
            for (var i = 0; i < set.SentationsCount; i++) {
                isxArr[i] = arr[i];
            }
        }
        for (var i = 0; i < set.SentationsCount; i++) {
            arr[i] = TRANSLATE(arr[i]);
        }
    }
    if (set.IgnoreCapital) {
        for (var i = 0; i < set.SentationsCount; i++) {
            arr[i] = arr[i].toLowerCase();
        }
    }

    return arr;
}

