var Nouns=["крокодил","чувак","чайник","пирдедус","задачонок","дибилыч","петух","пес"];
var Adjectives=["красный","мокрый","влюбленный","пластилиновый","умный","сумашедший"];
var AddVerbs=["весело","смешно","красиво","честно","глупо","криво","пакостно","злорадно","подло"];
var Verbs=["мылся","прыгал","пукал","восхищался","насмехался","ругался","бесился","играл","срал"]
var PlasesIn=["бане","оболочке","луже","яме","доме","машине","самолете","песочнице","хлеву","углу","тубзике","сортире"]
var PlasesOn=["балконе","крыше","лужайке","марсе","луне","земле","жаре","холоде","столе","скамейке","посту","шкафу"]
function Word(arr )
{
	var ind=	Math.floor( Math.random()*arr.length);
	return arr[ind];
}

function GetSentation1()
{

	var s= 
	Word(Adjectives)+' и '+
	Word(Adjectives)+' '+
	Word(Nouns) +' '+
	Word(AddVerbs) +' '+
	Word(Verbs)+' в '+
	Word(PlasesIn)+'.';

	return s;
}
function GetSentation2()
{

    var s= 
	Word(Adjectives)+' и '+
	Word(Adjectives)+' '+
	Word(Nouns) +' '+
	Word(AddVerbs) +' '+
	Word(Verbs)+' на '+
	Word(PlasesOn)+'.';

    return s;
}
function GetSentation3()
{

    var s= 
	Word(Adjectives)+ ', '+	Word(Adjectives)+' и '+	Word(Adjectives)+' '+
	Word(Nouns) +' '+
	Word(AddVerbs) +' '+
	Word(Verbs)+' на '+
	Word(PlasesOn)+'.';
    return s;
}

function GetSentation()
{  
    var sentence= GetSentation3();    
    var  sentType =  Math.floor( Math.random()*5);//
    if(sentType==0)sentence=GetSentation1();
    if(sentType==1)sentence=GetSentation2();     
    if(sentType==3)sentence=GetSentation3(); 
    var sentence=sentence[0].toUpperCase()+sentence.substr(1,sentence.length);
    return sentence;
}

function KvasiText ()
{
	var arr= new Array();
	for(var i=0;i<3;i++)
	{
		arr[i]=GetSentation();
	}
	return arr;
}

export function  GetKvasiText() {
	return  KvasiText() ;
}