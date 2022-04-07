/**
 * okay, so, say that we click a status on the timeline, read through it's thread and
 * then decide to go back to the timeline. unless we back up the timeline somehow,
 * we'll have to load it again, and it's possible that by the time we're done the
 * status we just clicked will have been drowned in new statuses by then and we'll
 * have just lost our place.
 * 
 * holy fuck that's shit ux
 * 
 * to prevent this kinda stuff we need to back up our timelines somewhere. this is the
 * place. we'll keep the last known states for most recently accessed timelines by type.
 * 
 * if this is nonsense garbage blah blah just read source and it should make some sense!!
 */
import { groupThreads } from '../../lib/timeline_utils'
import { isEqual, cloneDeep, assignIn } from 'lodash'

// tlInfo describes a timeline, for fetching
function generateTlInfo(params = {}){
	return Object.assign({
		type: 'public',
		userId: null,
		hashtag: null,
		listId: null,
		params: {}
	}, cloneDeep(params))
}

// tlState describes a timeline's state -- the statuses we'd fetched, whether
// or not it's loading, etc...
function generateTlState(){
	return Object.assign({
		loading: false,
		staleBy: 0,
		statuses: [],
		grouped: [],
		next: {}, // The query params for the next page. These are obtained automatically from the HTTP "Link" header in API responses, not written by hand!
		prev: {} // As above.
	}, {})
}

const state = () => ({
	allStatuses: {},
	
	// Store the last known states for the timelines, for future reference
	info: {},
	state: {}
})

const mutations = {
	/**
	 * Ensure that tlInfo and tlState objects exist in the store under some
	 * arbitrary timeline ID (`tlId`), and makes sure they are appropriate for the
	 * given timeline info (`info`).
	 */
	prepareTimeline(state, { tlId, info = null, forceReinit = false }){
		var reinitNeeded = forceReinit

		// If a timeline by the given ID already exists, compare the params for
		// the two to see if we even need to (re)initialize anything.
		/* eslint-disable  no-prototype-builtins */
		if(state.info.hasOwnProperty(tlId) && info !== null){
			var template = generateTlInfo(info)
			reinitNeeded = !isEqual(state.info[tlId], template)
		}else{
			reinitNeeded = true
		}
		/* eslint-enable  no-prototype-builtins */

		// If the requested timeline isn't the same as the timeline that has been
		// saved, reinit.
		if(reinitNeeded){
			state.info[tlId] = generateTlInfo(info)
			state.state[tlId] = generateTlState()
		}
	},

	setTimelineStateValues(state, values){
		if(!state.state[values.tlId]) return

		var tlId = values.tlId
		delete values.tlId

		state.state[tlId] = Object.assign(state.state[tlId], values)
	},

	markTimelineAsLoading(state, tlId){
		state.state[tlId].loading = true
	},

	unmarkTimelineAsLoading(state, tlId){
		state.state[tlId].loading = false
	},

	markTimelineAsStale(state, { tlId, amount }){
		state.state[tlId].staleBy = amount
	},

	unmarkTimelineAsStale(state, tlId){
		state.state[tlId].staleBy = 0
	},

	clearTimeline(state, tlId){
		assignIn(state.state[tlId], generateTlState()) // Just overwriting the object breaks reactivity, hence this.
	},

	clearAllTimelines(state){
		state.info = {}
		state.state = {}
		state.allStatuses = {}
	},
	
	importStatuses(state, statuses){
		for(let status of statuses){
			if(typeof status !== 'object')
				continue
			
			status.deleted = false // TODO: m,ake this do a th ing pls pls plsd pls pls pls pls
			
			if(state.allStatuses[status.id])
				assignIn(state.allStatuses[status.id], status)
			else
				state.allStatuses[status.id] = status
		}
	},

	appendStatuses(state, { tlId, statuses }){
		if(!Array.isArray(statuses)) return false;
		var timeline = state.state[tlId]
		
		var statusIds = statuses.map(status => status.id)
		var groupedStatusIds = groupThreads(statuses)

		timeline.statuses = timeline.statuses.concat(statusIds)
		timeline.grouped = timeline.grouped.concat(groupedStatusIds)
	},

	prependStatuses(state, { tlId, statuses }){
		if(!Array.isArray(statuses)) return false;
		var timeline = state.state[tlId]
		
		var statusIds = statuses.map(status => status.id)
		var groupedStatusIds = groupThreads(statuses)

		timeline.statuses = statusIds.concat(timeline.statuses)
		timeline.grouped = groupedStatusIds.concat(timeline.grouped)
	}
}

const actions = {
	appendStatuses({ commit }, { tlId, statuses }){
		commit('importStatuses', statuses)
		commit('appendStatuses', { tlId, statuses })
	},
	
	prependStatuses({ commit }, { tlId, statuses }){
		commit('importStatuses', statuses)
		commit('prependStatuses', { tlId, statuses })
	}
}

export default {
	state,
	mutations,
	actions
}
