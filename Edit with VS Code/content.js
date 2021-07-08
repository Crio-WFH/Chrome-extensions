const calcDateString = () => {
    const date = new Date()
    
	// Date
	let d = date.toDateString().split(' ')
	d[0] += ','
    d = d.join(' ')
    
	// Time
	const currTimeString = date.toTimeString()
    let timeArray = currTimeString
        .split(' ')[0]
        .split(':')
        .splice(0, 2)
	if (timeArray[0] === '00') {
		timeArray[0] = '12'
	} else if (parseInt(timeArray[0]) > 12) {
		timeArray[0] = (parseInt(timeArray[0]) - 12).toString()
	} else {
		timeArray[0] = parseInt(timeArray[0])
	}
	const shortTime =
		timeArray.join(':') + (date.getHours() < 12 ? ' am' : ' pm')

	// Final
	return [d, shortTime]
}

const setStorage = (content) => {
	const [date, time] = calcDateString()
	let gridItem = `
        <div class="grid-item">
            <div class="date-time">
                <div>${date}</div>
                <div>${time}</div>
                <div class="button-container">
				    <div class="button">DELETE</div>
			    </div>
            </div>
            <textarea class="content">${content}</textarea>
        </div>
    `
	chrome.storage.sync.get(['data'], (resp) => {
		let prev = resp.data
		prev += gridItem
		chrome.storage.sync.set({
			data: prev,
		})
	})
}

chrome.runtime.onMessage.addListener((req, _, sendResp) => {
	if (req.q === 'getSelection') {
		const element = document.createElement('textarea')
		element.innerHTML = window.getSelection().toString()
		setStorage(element.innerHTML)
		element.setAttribute('readonly', '')
		element.style.position = 'absolute'
		element.style.left = '-9999px'
		document.body.appendChild(element)
		element.select()
		document.execCommand('copy')
		document.body.removeChild(element)
		sendResp({ q: 'success' })
		return true
	} else {
		sendResp({ q: 'failure' })
	}
})
