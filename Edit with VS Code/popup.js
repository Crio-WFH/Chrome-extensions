const span = document.querySelector('span')
const editor = document.querySelectorAll('.editor')
const editors = document.querySelector('.editor-container')
const spans = ["'Code'", "'Atom'", "'Sublime'", "'Np++'", "'Np'"]
const editorOpen = document.querySelector('.switch > input')
const slider = document.querySelector('.slider')

chrome.storage.sync.get(['open'], (resp) => {
    editorOpen.checked = resp.open
    console.log(resp.open)
})

slider.addEventListener('click', () => {
    chrome.storage.sync.get(['open'], (resp) => {
        chrome.storage.sync.set({
            open: !resp.open
        })
        editorOpen.checked = !resp.open
        console.log(!resp.open)
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

chrome.storage.sync.get(['editor'], (resp) => {
    span.innerHTML = resp.editor
    for (let i = 0; i < editor.length; i++) {
        if (resp.editor === spans[i]) {
            editor[i].style.background = '#efefef'
            break;
        }
    }
})

const button = document.querySelector('.button')

button.addEventListener('click', () => {
	chrome.runtime.openOptionsPage()
})