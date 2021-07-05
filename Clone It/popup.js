const onchange = (event) => {
	chrome.storage.sync.set({ loc: event.target.value }, () => {
        chrome.storage.sync.get(['loc'], (resp) => {
            console.log(resp.loc);
        })
	})
}
