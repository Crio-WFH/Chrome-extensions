let loc = "D:\\Git-Repos\\"

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ loc: loc }, () => console.log(loc))
})