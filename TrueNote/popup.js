console.log("From popup");

let activeTab;

let options = {};

chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
    activeTab = tabs[0];
    console.log(activeTab);
    chrome.storage.sync.get(activeTab.id.toString(), (data) => {
        console.log(data[activeTab.id].isEnabled);
        document.getElementById("checkbox").checked = data[activeTab.id].isEnabled;
    });
});

document.getElementById("checkbox").addEventListener('change', (event) =>{
    const isEnabled = event.target.checked;
    console.log(isEnabled);
    chrome.storage.sync.set({[activeTab.id]:{isEnabled:isEnabled}});
    chrome.runtime.sendMessage({
        message:"change_options",
        payload:{
            activeTab:activeTab,
            isEnabled: isEnabled
        }
    }, response => {
        console.log(response);
    });
});
