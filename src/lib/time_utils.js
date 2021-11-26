const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const WEEK = 7 * DAY
const MONTH = 30 * DAY
const YEAR = 365 * DAY



export function getDateText(date){
	date = (typeof(date) === 'string') ? new Date(date) : date

	var fmt = (elem) => elem.toString().padStart(2, '0')

	var day = fmt(date.getDate())
	var month = fmt(date.getMonth() + 1)
	var hours = fmt(date.getHours())
	var minutes = fmt(date.getMinutes())

	return `${date.getFullYear()}.${month}.${day} ${hours}:${minutes}`
}


export function getFuzzyDate(date){
	date = (typeof(date) === 'string') ? new Date(date) : date
	let diff = Math.abs( Date.now() - date )

	if(diff < MINUTE)
		return 'Just now'
	else if(diff < HOUR)
		return Math.floor(diff / MINUTE) + ' minutes ago'
	else if(diff < DAY)
		return Math.floor(diff / HOUR) + ' hours ago'
	else if(diff < WEEK)
		return Math.floor(diff / DAY) + ' days ago'
	else if(diff < MONTH)
		return Math.floor(diff / WEEK) + ' weeks ago'
	else if(diff < YEAR)
		return Math.floor(diff / MONTH) + ' months ago'
	else
		return getDateText(date)
}