chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.sync.set({
		editor: "'Code'",
		data: '',
		open: true,
	})

	let contextProperties = {
		contexts: ['selection'],
		title: 'Open with Editor',
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

chrome.contextMenus.onClicked.addListener(doThis)
