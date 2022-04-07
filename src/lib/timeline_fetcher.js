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

	async fetchStatuses(params = {}, config = {}){
		if(this.cache.state.loading) console.error("no don't do that") //TODO: DO SOMETHING!!!

		this.store.commit('markTimelineAsLoading', this.tlId)

		// Populate the config with default values
		config = Object.assign({
			mutation: 'appendStatuses',
			setPrev: false,
			setNext: false
		}, config)

		var requestParams = Object.assign({}, this.tlInfo.params, params)
		var resp = await api.fetchTimeline(this.tlInfo, requestParams)
		if(resp.data.error) throw resp.data.error //TODO: Consider making a custom class for these kinds of errors???
		
		// add the posts to the store
		this.store.dispatch({
			type: config.mutation,
			tlId: this.tlId,
			statuses: resp.data
		})

		// if wanted, set the params for next and prev
		if((config.setNext || config.setPrev) && resp.links){
			var values = { tlId: this.tlId }

			if(config.setNext && resp.links.next){
				delete resp.links.next.href
				values.next = resp.links.next
			}
			if(config.setPrev && resp.links.prev){
				delete resp.links.prev.href
				values.prev = resp.links.prev
			}

			this.store.commit('setTimelineStateValues', values)
		}

		this.store.commit('unmarkTimelineAsLoading', this.tlId)
	}

	async fetchPrev(){
		return this.fetchStatuses(this.cache.state.prev, { mutation: 'prependStatuses', setPrev: true })
			.then(() => {
				this.store.commit('unmarkTimelineAsStale', this.tlId)
			})
	}

	async fetchNext(){
		return this.fetchStatuses(this.cache.state.next, { setNext: true })
	}

	async checkForNewer(){
		var requestParams = Object.assign({}, this.cache.state.prev)
		var resp = await api.fetchTimeline(this.tlInfo, requestParams)
		if(resp.data.error || !Array.isArray(resp.data)) throw resp.data.error //TODO: Consider making a custom class for these kinds of errors???

		if(resp.data.length > 0) this.store.commit('markTimelineAsStale', { tlId: this.tlId, amount: resp.data.length })
		
		return resp.data.length
	}

	clearTimeline(){
		this.store.commit('clearTimeline', this.tlId)
	}

}
