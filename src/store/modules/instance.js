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

const actions = {}

export default {
	state,
	mutations,
	actions
}