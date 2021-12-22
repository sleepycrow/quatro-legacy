// Initial state
const state = () => ({
	pageTitle: ''
})

const mutations = {
	setInterfaceValue(state, { key, value }){
		/* eslint-disable  no-prototype-builtins */
		if(state.hasOwnProperty(key) && typeof value !== 'undefined')
			state[key] = value
		/* eslint-enable  no-prototype-builtins */
	}
}

const actions = {
	setPageTitle(ctx, title){
		if(typeof(title) !== 'string') title = ''

		ctx.commit('setInterfaceValue', { key: 'pageTitle', value: title })

		if(ctx.rootState.instance){
			if(title.length > 0) title += ' • '
			title += ctx.rootState.instance.nodeName
		}
		
		document.title = title
	}
}

export default {
	state,
	mutations,
	actions
}