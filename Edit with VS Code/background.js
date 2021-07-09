chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({
		editor: "'Code'",
		data: '',
        open: true,
        override: false,
        path: '',
        oneFile: true,
        raw: ''
	})

	let contextProperties = {
		contexts: ['selection'],
		title: 'Quick Edit',
		visible: true,
		id: 'main',
	}

	chrome.contextMenus.create(contextProperties)
})

const doThis = (_, tab) => {
	chrome.tabs.sendMessage(tab.id, { q: 'getSelection' }, (resp) => {
		chrome.storage.sync.get(['open', 'editor'], (check) => {
			if (resp?.q === 'success' && check.open) {
				switch (check.editor) {
					case "'Atom'":
						chrome.runtime.sendNativeMessage(
							'com.hksm.atom.native',
							{}
						)
						break
					case "'Sublime'":
						chrome.runtime.sendNativeMessage(
							'com.hksm.sublime.native',
							{}
						)
						break
					case "'Np'":
						chrome.runtime.sendNativeMessage(
							'com.hksm.notepad.native',
							{}
						)
						break
					case "'Np++'":
						chrome.runtime.sendNativeMessage(
							'com.hksm.npp.native',
							{}
						)
						break
					default:
						chrome.runtime.sendNativeMessage(
							'com.hksm.vscode.native',
							{}
						)
						break
				}
			} else if (check.open) {
				console.error("can't connect!")
			}
		})
	})
}
let port
chrome.runtime.onMessage.addListener((msg, _, sendResp) => {
    port = chrome.runtime.connectNative('com.hksm.cloner.native')
    port.postMessage(msg)
    port.onDisconnect.addListener(() => {
        console.log('Disconnected')
    })
    port.onMessage.addListener((m) => {
        console.log('host:', m)
        return true
    })
    sendResp('clone command sent...')
    return true
})

chrome.contextMenus.onClicked.addListener(doThis)
