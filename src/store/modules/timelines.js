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
import { isEqual } from 'lodash'

// tlInfo describes a timeline, for fetching
function generateTlInfo(params = {}){
	return Object.assign({
		type: 'public',
		userId: null,
		hashtag: null,
		listId: null,
		params: {}
	}, params)
}

// tlState describes a timeline's state -- the statuses we'd fetched, whether
// or not it's loading, etc...
function generateTlState(){
	return {
		loading: false,
		stale: false,
		statuses: [],
		grouped: [],
		newestId: null,
		oldestId: null
	}
}

const state = () => ({
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

	markTimelineAsLoading(state, tlId){
		state.state[tlId].loading = true
	},

	unmarkTimelineAsLoading(state, tlId){
		state.state[tlId].loading = false
	},

	markTimelineAsStale(state, tlId){
		state.state[tlId].stale = true
	},

	unmarkTimelineAsStale(state, tlId){
		state.state[tlId].stale = false
	},

	clearTimeline(state, tlId){
		state.state[tlId] = generateTlState()
	},

	appendStatuses(state, { tlId, statuses }){
		if(!Array.isArray(statuses)) return false;
		var timeline = state.state[tlId]

		timeline.statuses = timeline.statuses.concat(statuses)

		// Reorder timeline
		statuses = groupThreads(statuses)
		timeline.grouped = timeline.grouped.concat(statuses)
		
		if(timeline.statuses.length > 0){
			timeline.newestId = timeline.statuses[0].id
			timeline.oldestId = timeline.statuses[timeline.statuses.length - 1].id
		}
	},

	prependStatuses(state, { tlId, statuses }){
		if(!Array.isArray(statuses)) return false;
		var timeline = state.state[tlId]

		timeline.statuses = statuses.concat(timeline.statuses)

		// Reorder timeline
		statuses = groupThreads(statuses)
		timeline.grouped = statuses.concat(timeline.grouped)
		
		if(timeline.statuses.length > 0){
			timeline.newestId = timeline.statuses[0].id
			timeline.oldestId = timeline.statuses[timeline.statuses.length - 1].id
		}
	}
}

const actions = {}

export default {
	state,
	mutations,
	actions
}