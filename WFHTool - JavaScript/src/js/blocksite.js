const sitename = document.getElementById('sitename')
var block = document.getElementById('block')
var blockedtable = document.getElementById('tablebody')

var blockedsites = []
var counter = 1

renderBlockedSites()

$('#sitename').keypress(function (event) {
	if (event.which === 13) {
		//get the text
		var siteText = $(this).val()

		addSite(siteText)
	}
})

function addSite(item) {
	//if item is not empty
	if (item !== '') {
		//make a  object with sitename and enabled
		getFromStorage(function (blockedsites) {
			const blockedsite = {
				sitename: sitename.value,
				enabled: false,
			}
			blockedsites.push(blockedsite)

			saveToStorage(blockedsites)
			//clear the content of input box
			sitename.value = ''
		})
	}
}

function saveToStorage(blockedsites) {
	chrome.storage.sync.set({ blockedsites }, function () {
		renderBlockedSites()
	})
}

function renderBlockedSites() {
	getFromStorage(function (blockedsites) {
		$('#tablebody tr').remove()

		blockedsites.forEach((site) => {
			const checked = site.enabled ? 'checked' : ''
			var tr = document.createElement('tr')
			var td1 = document.createElement('td')
			td1.setAttribute('class', 'tdsite')
			var td2 = document.createElement('td')
			var td3 = document.createElement('td')

			td1.innerHTML = site.sitename
			td2.innerHTML = `<input id="block" type="checkbox" ${checked}/>`
			td3.innerHTML = `<button class="deletesite"><i class="fa fa-trash"></i></button>`

			tr.appendChild(td1)
			tr.appendChild(td2)
			tr.appendChild(td3)

			blockedtable.appendChild(tr)
		})
	})
}

$(document).on('click', '.deletesite', function () {
	//get the object
	const that = this
	//get the index

	//populate todos from storage
	getFromStorage(function (blockedsites) {
		//get element using index
		var sitename = $(that).closest('td').prev('td').prev('td').text()

		blockedsites.forEach(function (blockedsite, i) {
			if (sitename === blockedsite.sitename) {
				//delete the item
				blockedsites.splice(i, 1)
				//save back to storage
				counter = 1
				saveToStorage(blockedsites)
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
$(document).on('click', '#block', function () {
	//get the object
	const that = this
	//get the index

	//populate blockedsites from storage
	getFromStorage(function (blockedsites) {
		var sitename = $(that).closest('td').prev('td').text()

		blockedsites.forEach(function (site, i) {
			if (sitename === site.sitename) {
				console.log('type of time id before clicking' + typeof timerId)
				//update the checkbox
				site.enabled = !site.enabled
				//save back to storage
				counter = 1
				saveToStorage(blockedsites)
			}
		})
	})
})
