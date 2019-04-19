var Nouns = ["Ваня","Вей","Саша","Сережа","Юрий", "Артём", "Кирил", "Владимир", "Петя", "Петрович", "Варя", "Алиса", "Антон", "Михаил"];
// Профессии
var Proff=["маляр штукатур","архиепископ","водитель","инспектор","разнорабочий","министр","охранник","программист","президент","алкоголик","полицейский","пожарный","маньяк","пьяница","наркоман","стилист","парикмахер","могильщик","депутат",];
var Adjectives = ["пьяный","феерический","эпичный","бородатый","глупый","добрый","красный", "мокрый", "пластилиновый", "умный", "сумашедший"];
var AddVerbs = ["разнообразно","развратно","неумело","весело", "смешно", "красиво", "честно", "глупо", "криво", "пакостно", "злорадно", "подло","задумчиво","лихо","тихо"];
var Verbs = ["пищал","подпрыгивал","скакал","лаял","мылся", "прыгал", "пукал", "восхищался", "насмехался", "ругался", "бесился", "играл", "срал"]
var Verb = ["толкали","пищали","подпрыгивали","скакали","лаяли","мылись", "прыгали", "пукали", "восхищались", "насмехались", "ругались", "бесились", "игрались", "срали", "страхались", "волновались", "прятались"]

var NounsW = ["милашка","Вероника","Наташа","Маша","Вика","Симка","Пандочка","Совунья","Нюша","девушка", "крыса", "коза", "лиса", "старуха", "фея", "лягушка", "ссука"];
var AdjectivesW = ["грязная","потная","похотливая","жадная","пухлая","писклявая","клевая","желтая", "мокрая", "злая", "уродливая", "глупая", "красивая","крохотная","блестящая","милая","тухлая","вонючая"];

var VerbsW = ["резвилась","танцевала","пускала пузыри","плясала","ныряла","молилась","мылась", "прыгала", "пукала", "восхищалась", "насмехалась", "ругалась", "бесилась", "играла", "срала","целовалась"]

var PlasesIn = ["унитазе","помойке", "проруби", "шкафу","ведре", "кровати", "бане","нечистотах", "отходах", "луже", "яме", "доме", "машине", "самолете", "песочнице", "хлеву", "углу", "тубзике", "сортире"]

var PlasesOn = ["полу","травке","балконе", "крыше", "лужайке", "марсе", "луне", "земле", "жаре", "холоде", "столе", "скамейке", "посту", "шкафу"]

var PlasesUnder = ["одеялом","столом","окном", "крышей", "землей", "кроватью", "машиной", "присягой", "танком", "шафе", "градусом", "скамейкой", "подушкой", "деревом"]

// конструкция для персонажей, действия над объектом
var Аctions = ["разгонял" ,"заваривал" ,"варил" ,"обогащал" ,"заворачивал" ,"обходил" ,"выпиливал" ,"строил" ,"смешивал" ,"заливал" ,"выкарчёвывал" ,"истреблял" ,"сравнивал" ,"примерял" ,"разберал" ,"дефрагментировал" ,"архивировал" ,"удалял" ,"сохранял" ,"целовал" ,"лизал" , "мыл" ,"резал","красил","брил","солил", "обтачивал", "шлифовал", "патинировал", "обстругивал", "обстукивал", "пилил", "обмазывал", "жарил","взрывал" ,"фрезеровал" ,"полировал","смазывал","ел"]
// Цвет объектом
var Collor = ["коричневый","белый","малиновый","фиолетовый","мраморный","жёлтый","синий", "голубой", "серобурокозявчетый", "янтарный", "салатовый",  "бесцветный",  "кукурузный", "оранжевую", "чёрную", "разноцветную", "красную", "зелёную", "аквамариновую", "латунную", "бронзовую"]
// материял обьекта
var PlasesItems = ["каменный","железный","латунный","деревянный","оловянный","металлический", "кирпичный", "бронзовый", "кожанный", "дермонтиновый",  "мокрый",  "сухой", "варённый", "половинчатый", "старый", "новый", "дешёвый", "дорогой", "кривой", "прямой", "быстрый"]
// Объект
var PlasesItems = ["скафандр","дом","космодром","гирю","автомат","банку","скотч","стол","дым", "крышку", "землю", "кровать", "машину",  "танк",  "куклу", "скамейку", "подушку", "дерево", "гриб", "девку", "БТР", "РПГ", "вертушку", "ракету"]

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

export function TRANSLATE(txt, dir = "ru-en") {
    var request = new XMLHttpRequest();
    var text = encodeURIComponent(txt);
    var key = "trnsl.1.1.20190324T133417Z.c2eddb7568471f8d.219fc4005536b04ae17e029f51e3438ac66e5001";
    var url = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" + key + "&text=" + text + "&lang=" + dir + "&format=plain&options=1"
    request.open('GET', url, false);
    request.send();
   // console.log(request.response);
    if (request.status >= 200 && request.status < 400) {
       // console.log(request);
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







 export function GetSentation4() {
    var adjective1 = Word(Adjectives);
    var arr=  [ adjective1];
    var adjective2= Word(Adjectives,arr);
    arr=  [ adjective1,adjective2];
    var s =
        adjective1 + ', ' + adjective2 + ' и ' + Word(Adjectives,arr) + ' ' +
        Word(Nouns) + ' ' +
        Word(AddVerbs) + ' ' +
        Word(Verbs);
    return s + AddPlace() + '.';
}


export function GetSentation5() {
  var adjective1 = Word(AdjectivesW);
    var arr=  [ adjective1];
    var adjective2= Word(Adjectives,arr);
    arr=  [ adjective1,adjective2];

    var Noun1 = Word(NounsW);
    var arr=  [ Noun1];
    var Noun2= Word(Nouns,arr);
  
    var s =
        adjective1 + ' '+
        Noun1 + ' и '   + Word(Adjectives,arr) + ' ' + Noun2 + ' '+
        Word(AddVerbs) + ' ' +
        Word(Verb);
    return s + AddPlace() + '.';
}


export function GetSentation6() {
    var adjective1 = Word(Adjectives);
      var arr=  [ adjective1];
      var adjective2= Word(Adjectives,arr);
      arr=  [ adjective1,adjective2];
  
      var Noun1 = Word(Nouns);
      var arr=  [ Noun1];
      var Noun2= Word(Nouns,arr);
    
      var s =
          adjective1 +   ' ' +Noun1+ 
           ' и ' + 
           adjective2 + ' '  + Noun2 + ' '+
          Word(AddVerbs) + ' ' +
          Word(Verb);
      return s + AddPlace() + '.';
  }
  



  
export function GetSentation7() {
    var adjective1 = Word(Adjectives);
      var arr=  [ adjective1];
      var adjective2= Word(Adjectives,arr);
      arr=  [ adjective1,adjective2];
      var Proff1 = Word(Proff);
      var arr =  [Proff1];
      var Noun1 = Word(Nouns);
      var arr=  [ Noun1];
      var Noun2= Word(Nouns,arr);
    
      var s =
          adjective1 + ' ' +Word(Proff) + ' '+Noun1+ ' и ' +Proff1+ ' ' + Noun2 +'  '+Word(Аctions) +' '+ Word(PlasesItems)+' и '+Word(AddVerbs)+ ' ' + Word(Verb)+ ' ';
      return s + AddPlace() + '.';
  }
  
  


//place and preposition (in or on)

 export function AddPlace() {
    var ind = Math.floor(Math.random() * 3);
    if (ind == 0) { return ' на ' + Word(PlasesOn); }
    if (ind == 1)  {  return ' в ' + Word(PlasesIn); } 
    if (ind == 2)  {  return ' под ' + Word(PlasesUnder); }


}
//получение случайного предложения
function GetSentation(short = false) {
   
    if (short) return Word(Nouns);//режим для теста

    var sentence = GetSentationW();
    var sentType = Math.floor(Math.random() * 4);//получаю случайное число от 0 до 3
   if (sentType == 0) sentence = GetSentationM();
   if (sentType == 1) sentence = GetSentationW();
   if (sentType == 2) sentence = GetSentationW();
   if (sentType == 3) sentence = GetSentation3();
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
    return KvasiText(count, lang,short);
}





// -----------------------------------------------------------------------------------------------------------------------//



var kinput = document.getElementById('kinput');
var area = document.getElementById('area');
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

var lastTime = Date.now();

function handle(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;

  var text = e.type +
    ' keyCode=' + e.keyCode +
    ' which=' + e.which +
    ' charCode=' + e.charCode +
    ' char=' + String.fromCharCode(e.keyCode || e.charCode) +
    (e.shiftKey ? ' +shift' : '') +
    (e.ctrlKey ? ' +ctrl' : '') +
    (e.altKey ? ' +alt' : '') +
    (e.metaKey ? ' +meta' : '') + "\n";

  if (area.value && Date.now() - lastTime > 250) {
    area.value += new Array(81).join('-') + '\n';
  }
  lastTime = Date.now();

  area.value += text;

  area.scrollTop = area.scrollHeight;

  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}