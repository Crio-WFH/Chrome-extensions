


console.log("it is background.....")

window.word=''; //global var

chrome.runtime.onMessage.addListener(receiver);

function receiver(msg,sender,response)
{

   console.log(msg);
   word=msg.text;
   console.log(word);
}