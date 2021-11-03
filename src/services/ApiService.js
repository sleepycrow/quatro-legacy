const TIMELINE_ENDPOINT = timelineId => `/api/v1/timelines/${timelineId}`

// Helper function that injects various headers and automatically converts response to json
const fetchJson = (endpoint, params) => {
	var options = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		...params
	}
	var baseUrl = 'https://snaggletooth.life' //DEBUG: this can be an empty string in release

	return fetch(baseUrl+endpoint, options)
		.then((response) => response.json())
}

export function fetchTimeline(timelineId, params){
	var endpoint = TIMELINE_ENDPOINT(timelineId)+'?limit=150'
		
	if(typeof(params) == "object"){
		for(var key of params)
			endpoint += `&${key}=${params[key]}`
	}
		
	return fetchJson(endpoint)
}
