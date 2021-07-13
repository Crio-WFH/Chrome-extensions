console.log("From popup");

let activeTab;

let options = {};

chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
    activeTab = tabs[0];
    console.log(activeTab);
    chrome.storage.sync.get(activeTab.id.toString(), (data) => {
        console.log(data[activeTab.id].options);
        options.takeNotes = data[activeTab.id].options.takeNotes;
        options.displayNotes = data[activeTab.id].options.displayNotes;
        document.getElementById("take-note-checkbox").checked = data[activeTab.id].options.takeNotes;
        document.getElementById("display-note-checkbox").checked = data[activeTab.id].options.displayNotes;
    });
});

function changeUserOption(event){
    console.log(event);
    const id = event.target.id;
    let message;
    if (id === "take-note-checkbox") {
        message = "change_takeNotes_option";
        options.takeNotes = event.target.checked;
    } else if (id === "display-note-checkbox") { 
        message = "change_displayNotes_option";
        options.displayNotes = event.target.checked;
    } 

    chrome.storage.sync.set({[activeTab.id]:{options}});

    chrome.runtime.sendMessage({
        message:message,
        payload:{
            activeTab:activeTab,
            value: event.target.checked
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
