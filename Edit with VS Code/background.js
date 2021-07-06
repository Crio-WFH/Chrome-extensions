chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({
		editor: "'Code'",
	})

	let contextProperties = {
		contexts: ['selection'],
		title: 'Open with Editor',
		visible: true,
		id: 'main',
	}

	chrome.contextMenus.create(contextProperties)
})

function doThis(_, tab) {
	chrome.tabs.sendMessage(tab.id, { q: 'getSelection' }, (resp) => {
        if (resp?.q === 'success') {
            chrome.storage.sync.get(['editor'], (res) => {
                switch (res.editor) {
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
            })
        } else {
            console.error('can\'t connect!')
        }
	})
}

chrome.contextMenus.onClicked.addListener(doThis)
