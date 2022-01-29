import { fetchInstanceInfo, fetchNodeInfo } from '../../lib/api'

// Initial state
const state = () => ({
	// NodeInfo/Instance
	nodeName: 'Quatro-FE',
	nodeDescription: 'Just another federated community.',

	openRegistrations: true,

	maxStatusLength: 5000
})

const mutations = {
	setInstanceValues(state, values){
		/* eslint-disable  no-prototype-builtins */
		for(var key in values){
			let val = values[key]

			if(state.hasOwnProperty(key) && typeof val !== 'undefined')
				state[key] = val
		}
		/* eslint-enable  no-prototype-builtins */
	}
}

const actions = {
	async fetchInstanceInfo({ commit }){
		var info = await Promise.all([ fetchInstanceInfo(), fetchNodeInfo() ])
		var instanceInfo = info[0].data 
		var nodeInfo = info[1].data

		commit('setInstanceValues', {
			'nodeName': nodeInfo.metadata.nodeName,
			'nodeDescription': nodeInfo.metadata.nodeDescription,

			'openRegistrations': nodeInfo.metadata.openRegistrations,

			'maxStatusLength': instanceInfo.max_toot_chars,
		})

		return
	}
}

export default {
	state,
	mutations,
	actions
}