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
	setInstanceValue(state, { key, value }){
		/* eslint-disable  no-prototype-builtins */
		if(state.hasOwnProperty(key) && typeof value !== 'undefined')
			state[key] = value
		/* eslint-enable  no-prototype-builtins */
	}
}

const actions = {
	async fetchInstanceInfo({ commit }){
		var info = await Promise.all([ fetchInstanceInfo(), fetchNodeInfo() ])
		var instanceInfo = info[0].data 
		var nodeInfo = info[1].data

		commit('setInstanceValue', { key: 'nodeName', value: nodeInfo.metadata.nodeName })
		commit('setInstanceValue', { key: 'nodeDescription', value: nodeInfo.metadata.nodeDescription })
		commit('setInstanceValue', { key: 'openRegistrations', value: nodeInfo.metadata.openRegistrations })
		commit('setInstanceValue', { key: 'maxStatusLength', value: instanceInfo.max_toot_chars })

		return
	}
}

export default {
	state,
	mutations,
	actions
}