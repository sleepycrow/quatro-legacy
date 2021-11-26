const TIMELINE_ENDPOINT = timelineId => `/api/v1/timelines/${timelineId}`

// Helper function that injects various headers and automatically converts response to json
function fetchJson(endpoint, params){
	var options = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
		...params
	}
	var baseUrl = 'https://critters.us.to' //DEBUG: this can be an empty string in release
	// https://tailswish.industries   |   https://snaggletooth.life

	return fetch(baseUrl+endpoint, options)
		.then((response) => response.json())
}


export function fetchTimeline(timelineId, params = {}){
	var endpoint = TIMELINE_ENDPOINT(timelineId)+'?limit=20'
		
	if(typeof(params) == "object"){
		for(var key in params)
			endpoint += `&${key}=${params[key]}`
	}
		
	return fetchJson(endpoint)
}
