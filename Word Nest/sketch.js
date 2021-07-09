

function setup(){
  noCanvas();
  
  let bgpage=chrome.extension.getBackgroundPage();

  let word=bgpage.word;
  createP(word).style('font-size','20px');
  

  let url=`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;

  loadJSON(url,getMeaning);

  function getMeaning(data)
  {
     createP(' (meaning) => '+ data[0].meanings[0].definitions[0].definition).style('font-size','20px');

     createP(' (type) => '+ data[0].meanings[0].partOfSpeech).style('font-size','20px');

  }

}







