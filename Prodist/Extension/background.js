
const start = prompt("Enter the starting time : ");
const end = prompt("Enter the ending time : ");


const current= new Date(Date.now()).getHours();

function display(myText) {
    alert (myText);
  }

if(current >= start && current <= end){
    display("Its the productive hour! The access to selected sites is now blocked");

    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            return {cancel: true}
        },
        {urls: ["*://*.quora.com/*","*://*.facebook.com/*","*://*.instagram.com/*","*://*.twitter.com/*"]},
        ["blocking"]
    )
}
else{
    display("The sites can be accessed now!");
}
