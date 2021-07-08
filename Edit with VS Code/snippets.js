const root = document.querySelector('.grid-container')

chrome.storage.sync.get(['data'], (resp) => {
	root.innerHTML = resp.data
	let deleteItem = document.querySelectorAll('.button.delete')
	let editItem = document.querySelectorAll('.button.edit')
	let textarea = document.querySelectorAll('textarea')

    // Updating data
	for (let i = 0; i < deleteItem.length; i++) {
		deleteItem[i].addEventListener('click', (event) => {
			let child = event.target
			while (child.parentNode !== root) {
				child = child.parentNode
			}
            root.removeChild(child)
            
			// Setting updated data
			chrome.storage.sync.set({
				data: root.innerHTML,
			})
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
				chrome.storage.sync.set({
					data: root.innerHTML,
                })
                // console.log('sync')
			}
        })
        textarea[i].addEventListener('input', (event) => {
			let area = event.target
			area.innerHTML = event.target.value
		})
    }
})
