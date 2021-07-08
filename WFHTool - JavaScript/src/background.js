chrome.runtime.onInstalled.addListener(function () {
	var blockedsites = []

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		const url = tab.url

		if (!url || !url.startsWith('http')) {
			return
		}

		const hostname = new URL(url).hostname

		getFromStorage(function (blockedsites) {
			blockedsites.forEach(function (blockedsite) {
				if (
					hostname.indexOf(blockedsite.sitename) > -1 &&
					blockedsite.enabled
				) {
					console.log('Blocking activated')
					chrome.tabs.remove(tabId)
				}
			})
		})
	})

	function getFromStorage(callback) {
		chrome.storage.sync.get(['blockedsites'], function (result) {
			if (result && result.blockedsites) {
				callback(result.blockedsites)
			} else {
				callback([])
			}
		})
	}
})
