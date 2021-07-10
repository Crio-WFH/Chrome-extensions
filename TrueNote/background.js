/**
 * Listens for tab lifecycle change
 * If page load is complete then injecs the frontend script and frontend css into it
 * Also stores the default state of isEnabled as false against the active tabId  
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo);
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting.insertCSS({
      target: {
        tabId: tabId
      },
      files: ["./foreground.css"]
    })
    chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      files: ["./foreground.js"]
    })
      .then(() => {
        console.log("Injected foreground script " + tabId);

        chrome.storage.sync.set({ [tabId]: { isEnabled: false } });
      })
      .catch(err => {
        console.log(err);
      });
  }
});


/** 
 * Listens for closing tab event and removes the options data for that tab from storage
*/
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(`closing tab ${tabId}`);
  chrome.storage.sync.remove(tabId.toString());
});

/* 
    Listens for message from popup script regarding change of user option regarding enabling user to take notes on the webpage
    The popup script sends a message to background script and then background script sends a message to the frontend script.
    popup -> background -> frontend (As there cannot be direct communication between pop -> frontend)
*/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "change_options") {
    chrome.tabs.sendMessage(request.payload.activeTab.id, {
      message: "change_options",
      isEnabled: request.payload.isEnabled
    });
    sendResponse("success");
    return true;
  } else if (request.message === "save_notes_cache") {
      chrome.tabs.sendMessage(request.payload.activeTab.id, {
        message: "save_notes_cache"
      }, response =>{
        console.log("Frontend saved notes");
      });
      sendResponse("success");
      return true;
    } else if (request.message === "reset_notes") {
        chrome.tabs.sendMessage(request.payload.activeTab.id, {
          message: "reset_notes"
        }, response =>{
          console.log("Frontend reset notes");
        });
        sendResponse("success");
        return true;
      }
});