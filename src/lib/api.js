const TIMELINE_ENDPOINT = timelineId => `/api/v1/timelines/${timelineId}`
const INSTANCE_ENDPOINT = '/api/v1/instance'
const NODEINFO_ENDPOINT = '/nodeinfo/2.0.json'

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


// TODO: Document this function when we figure out how to fetch different types of timelines
export function fetchTimeline(timelineId, params = {}){
	var endpoint = TIMELINE_ENDPOINT(timelineId)+'?'
		
	if(typeof(params) == "object"){
		for(var key in params)
			endpoint += `&${key}=${params[key]}`
	}
		
	return fetchJson(endpoint)
}


/**
 * Fetches mastodon-style instance info (/api/v1/instance)
 * @returns {Promise} Promise that resolves with an Object
 */
export function fetchInstanceInfo(){
	return fetchJson(INSTANCE_ENDPOINT)
}


/**
 * Fetches diaspora-style NodeInfo (/nodeinfo/2.0.json)
 * @returns {Promise} Promise that resolves with an Object
 */
export function fetchNodeInfo(){
	return fetchJson(NODEINFO_ENDPOINT)
}