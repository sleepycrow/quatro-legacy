import axios from 'axios'
import store from '../store/'

export const PAGE_SIZE = 20
const CLIENT_ID = 'ojYoRJrwuugaiy3u0YM0uCAvrh52qlFA4L6-4Dg3_ZA'
const CLIENT_SECRET = 'FIjPF110BNPOBTXbLei5v2tpIAo_PR3UwsnSFQJ4hgk'

const TIMELINE_ENDPOINT = timelineId => `/api/v1/timelines/${timelineId}`
const TAG_TIMELINE_ENDPOINT = tag => `/api/v1/timelines/tag/${tag}`
const STATUS_ENDPOINT = statusId => `/api/v1/statuses/${statusId}`
const STATUS_CONTEXT_ENDPOINT = statusId => `/api/v1/statuses/${statusId}/context`
const OAUTH_TOKEN_ENDPOINT = '/oauth/token'
const OAUTH_REVOKE_ENDPOINT = '/oauth/revoke'
const VERIFY_CREDENTIALS_ENDPOINT = '/api/v1/accounts/verify_credentials'
const INSTANCE_ENDPOINT = '/api/v1/instance'
const NODEINFO_ENDPOINT = '/nodeinfo/2.0.json'

// Set up axios defaults
axios.defaults.baseURL = 'https://critters.us.to' // Should be blank in release.
axios.defaults.responseType = 'json'
axios.defaults.method = 'get'
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.get['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Parse the link header from the response
axios.interceptors.response.use((resp) => {
	if(resp.headers.link)
		resp.links = parseLinkHeader(resp.headers.link)
	
	return resp
})

// Inject authorization header if logged in
axios.interceptors.request.use((config) => {
	if(store.state.auth.loggedIn && typeof(config.headers['Authorization']) === 'undefined')
		config.headers['Authorization'] = 'Bearer '+store.state.auth.token

	return config
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
function fetchJson(endpoint, opts){
	return axios(endpoint, opts)
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
	else if(type === 'user' && typeof(userId) === 'string')
		endpoint = `/api/v1/accounts/${userId}/statuses`
	else
		endpoint = TIMELINE_ENDPOINT(type)
	
	// Add the params
	endpoint += '?'
	if(typeof(params) == "object"){
		for(var key in params)
			endpoint += `&${key}=${params[key]}`
	}
	
	// Go fetch!
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


/**
 * Fetches a status and (optionally) it's context
 * @param {String} statusId
 * @param {Boolean} includeContext 
 * @returns {Object}
 */
export async function fetchStatus(statusId, includeContext = false){
	var promises = [ fetchJson(STATUS_ENDPOINT(statusId)) ]
	if(includeContext) promises.push(fetchJson(STATUS_CONTEXT_ENDPOINT(statusId)))
	var results = await Promise.all(promises)
	
	var status = results[0].data

	if(includeContext){
		var context = results[1].data
		
		status.ancestors = context.ancestors
		status.descendants = context.descendants
	}

	return status
}


/**
 * Given a valid token, returns the active user's profile. Otherwise, errors.
 * @param {String} token - OAuth token (hopefully) 
 * @returns {Object} - The active user's data
 */
export async function verifyCredentials(token){
	return fetchJson(VERIFY_CREDENTIALS_ENDPOINT, {
		headers: { 'Authorization': 'Bearer '+token }
	})
}


/**
 * Requests an OAuth token from the server
 * @param {String} username 
 * @param {String} password 
 * @returns {Object}
 */
export async function oauthObtainToken(username, password){
	var data = new FormData()
	data.append('grant_type', 'password')
	data.append('client_id', CLIENT_ID)
	data.append('client_secret', CLIENT_SECRET)
	data.append('username', username)
	data.append('password', password)

	return fetchJson(OAUTH_TOKEN_ENDPOINT, {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: data
	})
}


/**
 * Ask the server to revoke an OAuth token
 * @param {String} token 
 * @returns {Object}
 */
export async function oauthRevokeToken(token){
	var data = new FormData()
	data.append('client_id', CLIENT_ID)
	data.append('client_secret', CLIENT_SECRET)
	data.append('token', token)

	return fetchJson(OAUTH_REVOKE_ENDPOINT, {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: data
	})
}