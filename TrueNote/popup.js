console.log("From popup");

let activeTab;

let options = {};

chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
    activeTab = tabs[0];
    console.log(activeTab);
    chrome.storage.sync.get(activeTab.id.toString(), (data) => {
        console.log(data[activeTab.id].isEnabled);
        document.getElementById("take-note-checkbox").checked = data[activeTab.id].isEnabled;
    });
});

function changeUserOption(){
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
}

document.getElementById("take-note-checkbox").addEventListener('change', changeUserOption);

document.getElementById("display-note-checkbox").addEventListener('change', changeUserOption);

document.getElementById("save-btn").addEventListener('click', () =>{
    chrome.runtime.sendMessage({
        message:"save_notes_cache",
        payload:{
            activeTab:activeTab
        }
    });
});

document.getElementById("reset-btn").addEventListener('click', () =>{
    chrome.runtime.sendMessage({
        message:"reset_notes",
        payload:{
            activeTab:activeTab
        }
    });
});
