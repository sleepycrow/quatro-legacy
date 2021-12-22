import * as axios from 'axios'

const TIMELINE_ENDPOINT = timelineId => `/api/v1/timelines/${timelineId}`
const TAG_TIMELINE_ENDPOINT = tag => `/api/v1/timelines/tag/${tag}`
const INSTANCE_ENDPOINT = '/api/v1/instance'
const NODEINFO_ENDPOINT = '/nodeinfo/2.0.json'

// Set up axios defaults
axios.defaults.baseURL = 'https://critters.us.to' // Should be blank in release.
axios.defaults.responseType = 'json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use((resp) => {
	if(resp.headers.link)
		resp.links = parseLinkHeader(resp.headers.link)
	
	return resp
})


/**
 * A "good enough" link header parser. Beware, ignores all properties except
 * rel!!
 * @param {String} header - the HTTP Link header
 * @returns {Object} figure it out lol
 */
function parseLinkHeader(header){
	var input_links = header.split(', ')
	var output = {}

	/* eslint-disable  no-useless-escape */
	for(let linkStr of input_links){
		let linkData = linkStr.match(/<([^>]+)>; ?rel="([^"]+)"/i)
		if(linkData.length < 3) continue

		var link = {}

		let queryParams = linkData[1].match(/(?:\?|\&)([^\?\&]+)/gi)
		for(let paramStr of queryParams){
			let param = paramStr.slice(1).split('=')
			if(param.length < 2) continue

			link[param[0]] = param[1]
		}

		link.href = linkData[1]
		output[linkData[2]] = link
	}
	/* eslint-enable  no-useless-escape */

	return output
}


// Helper function that injects various headers and automatically converts response to json
// TODO: either use it when we start working on auth, or remove it
function fetchJson(endpoint, params){
	return axios.get(endpoint, { params })
}


// TODO: Document this function when we figure out how to fetch different types of timelines
export function fetchTimeline({
	type,
	userId = null,
	tag = null,
	listId = null,
}, params = {}){
	var endpoint = null

	// Set the correct endpoint
	if(type === 'tag' && typeof(tag) === 'string')
		endpoint = TAG_TIMELINE_ENDPOINT(tag)
	else
		endpoint = TIMELINE_ENDPOINT(type)
	
	// Add the params
	endpoint += '?'
	if(typeof(params) == "object"){
		for(var key in params)
			endpoint += `&${key}=${params[key]}`
	}
	
	// Fetch!
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