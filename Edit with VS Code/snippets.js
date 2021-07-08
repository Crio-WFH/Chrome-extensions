const root = document.querySelector('.grid-container')

chrome.storage.sync.get(['data'], (resp) => {
	root.innerHTML = resp.data
	let items = document.querySelectorAll('.button')

    // Updating data
	for (let i = 0; i < items.length; i++) {
		items[i].addEventListener('click', (event) => {
            console.log(event.target)
            let child = event.target
            while (child.parentNode !== root) {
                child = child.parentNode
            }
			root.removeChild(child)
		})
    }
    
    // Setting updated data
    chrome.storage.sync.set({
        data: root.innerHTML
    })
})
