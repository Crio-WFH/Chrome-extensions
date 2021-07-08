const span = document.querySelector('span')
const editor = document.querySelectorAll('.editor')
const editors = document.querySelector('.editor-container')
const spans = ["'Code'", "'Atom'", "'Sublime'", "'Np++'", "'Np'"]
const editorOpen = document.querySelector('input.e')
const slider = document.querySelector('.slider.e')
const cloneSlider = document.querySelector('.slider.c')
const localPath = document.querySelector('input.location')
const cloneToggle = document.querySelector('input.c')

chrome.storage.sync.get(['open', 'editor', 'path', 'override'], (resp) => {
    // open
    editorOpen.checked = resp.open

    // editor
    span.innerHTML = resp.editor
	for (let i = 0; i < editor.length; i++) {
		if (resp.editor === spans[i]) {
			editor[i].style.background = '#efefef'
			break
		}
    }
    
    // path
    localPath.value = resp.path

    // override
    cloneToggle.checked = resp.override
    if (!resp.override) {
        localPath.disabled = true
    } else {
        localPath.disabled = false
    }
})

slider.addEventListener('click', () => {
    chrome.storage.sync.get(['open'], (resp) => {
        chrome.storage.sync.set({
            open: !resp.open
        })
        editorOpen.checked = !resp.open
        // console.log(!resp.open)
	})
})

cloneSlider.addEventListener('click', () => {
    chrome.storage.sync.get(['override'], (resp) => {
        chrome.storage.sync.set({
            override: !resp.override
        })
        cloneToggle.checked = !resp.override
        localPath.disabled = resp.override
    })
})

const trim = (str) => {
    let trimmed = str
    trimmed = trimmed.replaceAll('\\', '/')
    trimmed = trimmed.replaceAll('"', '')
    trimmed = trimmed.replaceAll("'", '')
    return trimmed
}

localPath.addEventListener('input', (event) => {
    localPath.value = trim(event.target.value)
    chrome.storage.sync.set({
        path: localPath.value
    })
})

localPath.addEventListener('click', (event) => {
    localPath.value = trim(event.target.value)
    chrome.storage.sync.set({
        path: localPath.value
    })
})

for (let i = 0; i < editor.length; i++) {
	editor[i].addEventListener('click', (event) => {
		let elm = event.target
		while (elm.parentNode !== editors) {
			elm = elm.parentNode
		}
		for (let i = 0; i < editor.length; i++) {
			editor[i].style.background = '#fefefe'
		}
		elm.style.background = '#efefef'
		chrome.storage.sync.set(
			{
				editor: spans[i],
			},
			() => {
				span.innerText = spans[i]
			}
		)
	})
}

const button = document.querySelector('.button')

button.addEventListener('click', () => {
	chrome.runtime.openOptionsPage()
})