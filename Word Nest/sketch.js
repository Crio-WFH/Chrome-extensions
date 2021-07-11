

function setup(){
  noCanvas();
  
  let bgpage=chrome.extension.getBackgroundPage();

  let word=bgpage.word;
  createP(word).style('font-size','20px');
  

  let url=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;

  loadJSON(url,getMeaning,errorOccur);

   
  function errorOccur()
  {
    speech = new p5.Speech();
    speech.speak("selected phrase is "+ word );
    speech.speak('Sorry dear ! you have not selected a single word , you have to select a single word to know its meaning');
  }




  function getMeaning(data)
  {
    console.log(data);
    speech = new p5.Speech();

     createP(' (meaning) => '+ data[0].meanings[0].definitions[0].definition).style('font-size','20px');

     createP(' (type) => '+ data[0].meanings[0].partOfSpeech).style('font-size','20px');

     

     speech.speak("selected word is "+ word );

     speech.speak('meaning is ' + data[0].meanings[0].definitions[0].definition + ". moreover selected word is one type  of "+ data[0].meanings[0].partOfSpeech);

     

  }

}







