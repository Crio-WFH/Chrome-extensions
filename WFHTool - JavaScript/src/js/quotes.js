$(document).ready(function () {
	var quotes = []
	var counter = 0

	var interval = setInterval(increment, 1200000)

	quoteofday()
	fe()
	$(document).on('click', '.quotetext', function () {
		counter += 1
		counter %= 100
		fe()
	})
	function increment() {
		counter += 1
		counter %= 100
		fe()
	}

	function quoteofday() {
		const date1 = new Date('7/4/2021')
		const date2 = new Date()
		const diffTime = Math.abs(date2 - date1)
		counter = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1
		counter %= 100
	}

	function fe() {
		fetch('https://type.fit/api/quotes')
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				quotes = data
				$('.ptext').text(quotes[counter].text)
			})
	}
})
