



console.log("running for content script");



window.addEventListener('mouseup',onSelection);

function onSelection()
{
    let selected=window.getSelection().toString();
    console.log("selected words");
    console.log(selected);

    if(selected.length>0)
    {
        let message={
            text:selected
        };
        chrome.runtime.sendMessage(message);
    }
}
