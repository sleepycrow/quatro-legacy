import * as api from './api'
import { toRaw } from 'vue'


export default class TimelineFetcher {

	constructor(store, tlId, tlInfo){
		tlId = toRaw(tlId)
		tlInfo = toRaw(tlInfo)
		
		this.store = store
		
		this.store.commit({
			type: 'prepareTimeline',
			tlId: tlId,
			info: tlInfo
		})

		// set up some shorthands, for ease of reading/writing
		this.tlId = tlId
		this.cache = {
			info: this.store.state.timelines.info[this.tlId],
			state: this.store.state.timelines.state[this.tlId]
		}
		this.tlInfo = this.cache.info
	}

	get statuses(){
		return this.cache.state.statuses
	}

	get grouped(){
		return this.cache.state.grouped
	}

	get state(){
		return this.cache.state
	}

	async fetchStatuses(params = {}, mutation = 'appendStatuses'){
		if(this.cache.state.loading) console.error("no don't do that") //TODO: DO SOMETHING!!!

		this.store.commit('markTimelineAsLoading', this.tlId)

		var requestParams = Object.assign({}, this.tlInfo.params, params)
		var resp = await api.fetchTimeline(this.tlInfo.type, requestParams)
		if(resp.error) throw resp.error //TODO: Consider making a custom class for these kinds of errors???
		
		// update store
		this.store.commit({
			type: mutation,
			tlId: this.tlId,
			statuses: resp
		})

		this.store.commit('unmarkTimelineAsLoading', this.tlId)
	}

	async fetchOlderStatuses(){
		return this.fetchStatuses({
			'max_id': this.cache.state.oldestId
		})
	}

	async fetchNewerStatuses(){
		return this.fetchStatuses({
			'min_id': this.cache.state.newestId
		}, 'prependStatuses')
			.then(() => {
				this.store.commit('unmarkTimelineAsStale', this.tlId)
			})
	}

	async checkForNewer(){
		var requestParams = Object.assign({}, this.tlInfo.params, { since_id: this.cache.state.newestId, limit: 1 })
		var resp = await api.fetchTimeline(this.tlInfo.type, requestParams)
		if(resp.error || !Array.isArray(resp)) throw resp.error //TODO: Consider making a custom class for these kinds of errors???

		if(resp.length > 0) this.store.commit('markTimelineAsStale', this.tlId)
		
		return this.cache.state.stale
	}

}