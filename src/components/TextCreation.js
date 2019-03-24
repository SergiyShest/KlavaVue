var Nouns=["Крокодил","Чувак","Чайник"];
var Adjectives=["красный","мокрый","влюбленный"];
var AddVerbs=["весело","смешно","красиво","честно","глупо","криво"];
var Verbs=["мылся","прыгал","пукал","восхищался","насмехался","ругался"];

function Word(arr )
{
	var ind=	Math.floor( Math.random()*arr.length);
	return arr[ind];
}
function GetSentation()
{
	var s= 
	Word(Adjectives)+' и '+
	Word(Adjectives)+' '+
	Word(Nouns) +' '+
	Word(AddVerbs) +' '+
	Word(Verbs)+'.'
	;
	s=s[0].toUpperCase()+s.substr(1,s.length);
	return s;
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