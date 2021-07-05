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
        
        chrome.storage.sync.set({[tabId]:{isEnabled:false}});
      })
      .catch(err => {
        console.log(err);
      });
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  console.log(`closing tab ${tabId}`);
  chrome.storage.sync.remove(tabId.toString());
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "change_options") {
      chrome.tabs.sendMessage(request.payload.activeTab.id, {
        message:"change_options",
        isEnabled: request.payload.isEnabled
      });
      sendResponse("success");
      return true;
  }
});