function showTime() {
	var date = new Date()
	var hour = date.getHours()
	var minute = date.getMinutes()
	var session = 'AM'

	if (hour == 0) {
		hour = 12
	}

	if (hour > 12) {
		hour = hour - 12
		session = 'PM'
	}

	hour = hour < 10 ? '0' + hour : hour
	minute = minute < 10 ? '0' + minute : minute

	var time = hour + ':' + minute + ' ' + session
	document.getElementById('clockid').innerText = time
	document.getElementById('clockid').textContent = time

	setTimeout(showTime, 1000)
}

showTime()
