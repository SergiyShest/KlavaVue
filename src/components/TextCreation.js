﻿
const Dicti={

    Nouns: ["Змей Горыныч", "принц", "Иван дурак", "Крокодил Гена", "Колобок", "Губка Боб квадратные штаны", "чудик", "Владимир", "чувак", "Петрович", "черт", "кот", "кащей", "Серый волк",
        'пират', "маляр штукатур", "архиепископ", "водитель", "инспектор", "разнорабочий", "министр", "охранник", "программист", "президент", "алкоголик", "полицейский", "пожарный", "маньяк", "пьяница", "наркоман", "стилист", "парикмахер", "могильщик", "депутат"],
// Профессии
    Proff: ['пират', "маляр штукатур", "архиепископ", "водитель", "инспектор", "разнорабочий", "министр", "охранник", "программист", "президент", "алкоголик", "полицейский", "пожарный", "маньяк", "пьяница", "наркоман", "стилист", "парикмахер", "могильщик", "депутат"],
    Adjectives: ["пьяный", "феерический", "эпичный", "бородатый", "глупый", "добрый", "красный", "мокрый", "пластилиновый", "умный", "сумашедший", "ленивый", 'лукавый', 'грязный', 'одноногий', 'кривой', 'косой', 'прыщавый', 'смелый', 'лысый', 'тупой', 'накачанный'],
 AddVerbs : ["зло","развратно","неумело","весело", "смешно", "красиво", "честно", "глупо", "криво", "пакостно", "злорадно", "подло","задумчиво","лихо","тихо","зловеще",'лукаво'],
 Verb : ["пищал","подпрыгивал","скакал","лаял","мылся", "прыгал", "пукал", "восхищался", "раздевался", "читал", "икал", "спал", "чесался", "ругался", "бесился", "играл", "срал"],
 Verbs : ["толкали","пищали","подпрыгивали","скакали","лаяли","мылись", "прыгали", "пукали", "восхищались", "насмехались", "ругались", "бесились", "игрались", "срали", "страхались", "волновались", "прятались"],

 NounsW : ["милашка","Вероника","Наташа","Маша","Вика","Симка","Пандочка","Совунья","Нюша","девушка", "крыса", "коза", "лиса", "старуха", "фея", "лягушка", "ссука","свинья","ворона"],
AdjectivesW : ["грязная","потная","хитрая","жадная","пухлая","писклявая","клевая","желтая", "мокрая", "злая", "уродливая", "глупая", "красивая","крохотная","блестящая","милая","тухлая","вонючая","голая"],

 VerbsW : ["резвилась", "танцевала", "пускала пузыри", "плясала", "ныряла", "молилась", "мылась", "прыгала", "пукала", "восхищалась", "насмехалась", "ругалась", "бесилась", "играла", "лаяла", "целовалась", "мяукала", "хрюкала", "пила чай", "играла в слова","икала"],

 PlasesIn : ["унитазе","помойке", "проруби", "шкафу","ведре", "кровати", "бане","нечистотах", "отходах", "луже", "яме", "доме", "машине", "самолете", "песочнице", "хлеву", "углу", "тубзике", "сортире"],

 PlasesOn : ["полу","травке","балконе", "крыше", "лужайке", "марсе", "луне", "земле", "жаре", "холоде", "столе", "скамейке", "посту", "шкафу","поле"],

 PlasesUnder : ["одеялом","столом","окном", "крышей", "землей", "кроватью", "машиной", "кустом", "танком", "шафе", "сосной", "скамейкой", "подушкой", "деревом","кактусом"],
// конструкция для персонажей, действия над объектом
 Аctions : ["разгонял" ,"заваривал" ,"варил" ,"обогащал" ,"заворачивал" ,"обходил" ,"выпиливал" ,"строил" ,"смешивал" ,"заливал" ,"выкарчёвывал" ,"истреблял" ,"сравнивал" ,"примерял" ,"разберал" ,"дефрагментировал" ,"архивировал" ,"удалял" ,"сохранял" ,"целовал" ,"лизал" , "мыл" ,"резал","красил","брил","солил", "обтачивал", "шлифовал", "патинировал", "обстругивал", "обстукивал", "пилил", "обмазывал", "жарил","взрывал" ,"фрезеровал" ,"полировал","смазывал","ел"],
// Цвет объектом
 Collor : ["коричневый","белый","малиновый","фиолетовый","мраморный","жёлтый","синий", "голубой", "серобурокозявчетый", "янтарный", "салатовый",  "бесцветный",  "кукурузный", "оранжевую", "чёрную", "разноцветную", "красную", "зелёную", "аквамариновую", "латунную", "бронзовую"],
// материял обьекта
 PlasesItems : ["каменный","железный","латунный","деревянный","оловянный","металлический", "кирпичный", "бронзовый", "кожанный", "дермонтиновый",  "мокрый",  "сухой", "варённый", "половинчатый", "старый", "новый", "дешёвый", "дорогой", "кривой", "прямой", "быстрый"],
// Объект
 //PlasesItems : ["скафандр","дом","космодром","гирю","автомат","банку","скотч","стол","дым", "крышку", "землю", "кровать", "машину",  "танк",  "куклу", "скамейку", "подушку", "дерево", "гриб", "девку", "БТР", "РПГ", "вертушку", "ракету"],

}




    
export  function WordEx(dictName) {
    var counerNam = dictName + "_counter";
    var word = '';
//  console.log('Dicti['+counerNam+']='+Dicti[counerNam]);
   if(!Dicti[counerNam]){Dicti[counerNam]=0}//set counter=0 first time
    if(Dicti[counerNam]==0){
        shuffleArray(Dicti[dictName]);//
         console.log('shuffled Array='+Dicti[counerNam]);
    }
    word= Dicti[dictName][Dicti[counerNam]];
    Dicti[counerNam]++;
    if(Dicti[counerNam]==Dicti[dictName].length){//if and of array
     Dicti[counerNam]=0;
    // return WordEx(dictName);  
    }
    return word;
}

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
        var  res= data.text[0];
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
        WordEx('Nouns') + ' ' +


        WordEx('AddVerbs') + ' ' +
        WordEx('VerbsW');
    return s + AddPlace() + '.';
}







 export function GetSentation4() {

    var s =
        WordEx('AdjectivesW') + ' и ' + WordEx('AdjectivesW' ) + ' ' +
        WordEx('NounsW') + ' ' +
        WordEx('AddVerbs') + ' и ' +
        WordEx('AddVerbs') + ' ' +
        WordEx('VerbsW');
    return s + AddPlace() + '.';
}


export function GetSentation5() {

  
    var s =
        WordEx('AdjectivesW')  + ' '+
        WordEx('NounsW') + ' и '   + WordEx('Adjectives') + ' ' + WordEx('Nouns') + ' '+
        WordEx('AddVerbs') + ' ' +
        WordEx('Verbs');
    return s + AddPlace() + '.';
}


export function GetSentation6() {

    
      var s =
          WordEx('Adjectives') +   ' ' +WordEx('Nouns')+ 
           ' и ' + 
          WordEx('AdjectivesW') + ' '  + WordEx('NounsW') + ' '+
          WordEx('AddVerbs') + ' ' +
          WordEx('Verbs');
      return s + AddPlace() + '.';
  }
  



  
export function GetSentation7() {

    var s = WordEx('Adjectives') + ' ' + WordEx('Proff') + ' и ' + WordEx('Adjectives')+ ' ' + WordEx('Nouns') +'  '+WordEx('AddVerbs') +' '+ WordEx('Verbs')+' и '+WordEx('AddVerbs')+ ' ' + WordEx('Verbs')+ ' ';
      return s + AddPlace() + '.';
  }
  
  


//place and preposition (in or on)

 export function AddPlace() {
    var ind = Math.floor(Math.random() * 3);
    if (ind == 0) { return ' на ' + WordEx('PlasesOn'); }
    if (ind == 1)  {  return ' в ' + WordEx('PlasesIn'); } 
    if (ind == 2)  {  return ' под ' + WordEx('PlasesUnder'); }


}
//получение случайного предложения
function GetSentation(short = false) {
   
    if (short) return WordEx('Nouns');//режим для теста

    var sentence = '';//GetSentationW();
    var sentType =6// Math.floor(Math.random() * 7);//получаю случайное число от 0 до 3
    if (sentType === 0) { sentence = GetSentationM(); }
    if (sentType === 1) {sentence = GetSentationW();}
    if (sentType === 2) {sentence = GetSentation3();}
    if (sentType === 3) {sentence = GetSentation4();}
    if (sentType === 4) {sentence = GetSentation5();}
    if (sentType === 5) {sentence = GetSentation6();}
    if (sentType === 6) {sentence = GetSentation7();}
    if (sentType === 7) {sentence = GetSentationW();}


   console.log("sentence =" + sentType);
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
    return KvasiText(count, lang,true);
}

export function GetKvasiTextS(set,short) {

    var arr = new Array();
    for (var i = 0; i < set.SentationsCount; i++) {
        arr[i] = GetSentation(short);
    }
    if (set.Lang === 'en') {
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

