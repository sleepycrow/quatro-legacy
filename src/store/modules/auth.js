import { oauthObtainToken, oauthRevokeToken, verifyCredentials } from "../../lib/api"

// Initial state
const state = () => ({
	loggedIn: false,
	token: '',
	userInfo: {}
})

const mutations = {
	setAuthToken(state, token){
		state.token = token
	},

	setLoggedIn(state, loggedIn = true){
		state.loggedIn = loggedIn
	},

	unsetAuthToken(state){
		state.token = null
		state.authenticated = false
	},

	setUserInfo(state, info){
		state.userInfo = info
	}
}

const actions = {
	attemptTokenRecovery({ dispatch }){
		var token = window.localStorage.getItem('authToken')
		if(token !== null && token.length > 0) 
			return dispatch('verifyCredentials', token)
	},

	async loginUser({ dispatch }, { username, password }){
		try{
			var resp = await oauthObtainToken(username, password)
			dispatch('verifyCredentials', resp.data.access_token)
		}catch(e){
			//FIXME: ADD A PROPER ERROR MESSAGE HERE
			window.alert('eror eror o cholercia')
			console.error(e.response.data)
		}
	},

	async logoutUser({ state, commit }){
		oauthRevokeToken(state.token) // we don't care too much if it succeeds or not
		commit('setLoggedIn', false)
		commit('unsetAuthToken')
	},

	async verifyCredentials({ commit }, token){
		try{
			var userInfo = await verifyCredentials(token)

			// If the token is valid, save it for later, then save everything into vuex and mark as logged in
			window.localStorage.setItem('authToken', token)
			commit('setAuthToken', token)
			commit('setUserInfo', userInfo.data)
			commit('setLoggedIn', true)
		}catch(e){
			//FIXME: ADD A PROPER ERROR MESSAGE HERE
			window.alert('eror eror o cholercia')
			console.error(e.response.data)
		}
	}
}

export default {
	state,
	mutations,
	actions
}