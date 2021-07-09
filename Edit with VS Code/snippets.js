const root = document.querySelector('.grid-container')

const rawTemplate = (content) => {
	const html = `
        <div class="grid-item">
            <div class="date-time">
                <div class="button-container edit">
				    <div class="button edit">🖋</div>
			    </div>
                <div class="button-container copy">
				    <div class="button copy">📋</div>
			    </div>
                <div class="button-container delete">
				    <div class="button delete">❌</div>
			    </div>
            </div>
            <textarea class="content one-file" disabled="true">${content}</textarea>
        </div>
    `
	return html
}

chrome.storage.sync.get(['data', 'raw', 'oneFile'], (resp) => {
	root.innerHTML = resp.data
	if (resp.oneFile) {
		root.innerHTML = rawTemplate(resp.raw)
		root.style['grid-template-columns'] = '1fr'
		const one = document.querySelector('.content.one-file')
        one ? one.style.height = '80vh' : true
	}
	let deleteItem = document.querySelectorAll('.button.delete')
	let editItem = document.querySelectorAll('.button.edit')
	let textarea = document.querySelectorAll('textarea')
	let copyItem = document.querySelectorAll('.button.copy')

	// Updating data
	for (let i = 0; i < deleteItem.length; i++) {
		deleteItem[i].addEventListener('click', (event) => {
			let child = event.target
			while (child.parentNode !== root) {
				child = child.parentNode
			}
			root.removeChild(child)

			// Setting updated data
			if (resp.oneFile) {
				chrome.storage.sync.set({
					raw: "",
				})
			} else {
				chrome.storage.sync.set({
					data: root.innerHTML,
				})
			}
		})
		editItem[i].addEventListener('click', (event) => {
			let edit = event.target
			let gridItem = edit.parentNode.parentNode.parentNode
			let text = gridItem.querySelector('textarea')
			text.disabled = !text.disabled
			if (text.disabled === false) {
				edit.innerHTML = '✔'
			} else {
				edit.innerHTML = '🖋'
				// Setting updated data
				if (resp.oneFile) {
					chrome.storage.sync.set({
						raw: document.querySelector('textarea').innerHTML,
					})
				} else {
					chrome.storage.sync.set({
						data: root.innerHTML,
					})
				}
			}
		})
		copyItem[i].addEventListener('click', (event) => {
			let copyChild = event.target
			let gridItem = copyChild.parentNode.parentNode.parentNode
			let text = gridItem.querySelector('textarea')
			text.disabled = false
			text.select()
			document.execCommand('copy')
			console.log('copy')
			text.disabled = true
		})
		textarea[i].addEventListener('input', (event) => {
			let area = event.target
			area.innerHTML = event.target.value
		})
	}
})
