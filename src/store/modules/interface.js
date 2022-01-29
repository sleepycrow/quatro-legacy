// Initial state
const state = () => ({
	pageTitle: ''
})

const mutations = {
	setInterfaceValues(state, values){
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
	setPageTitle(ctx, title){
		if(typeof(title) !== 'string') title = ''

		ctx.commit('setInterfaceValues', { 'pageTitle': title })

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