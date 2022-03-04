import { fetchNotifications, markNotificationsAsRead } from '../../lib/api'

const state = () => ({
	muted: false,
	loading: false,
	next: {},
	prev: {},
	notifs: [],
	unread: 0
})

function countUnreadNotifs(notifs){
	return notifs.reduce((acc, notif) => (notif.pleroma.is_seen ? acc : ++acc), 0)
}

const mutations = {
	setNotifsValues(state, values){
		/* eslint-disable  no-prototype-builtins */
		for(var key in values){
			let val = values[key]

			if(state.hasOwnProperty(key) && typeof val !== 'undefined')
				state[key] = val
		}
		/* eslint-enable  no-prototype-builtins */
	},

	clearNotifs(state){
		state.muted = false
		state.loading = false
		state.next = {}
		state.prev = {}
		state.notifs = []
		state.unread = 0
	},

	appendNotifs(state, notifs){
		if(!Array.isArray(notifs)) return false;

		state.notifs = state.notifs.concat(notifs)
		state.unread = countUnreadNotifs(state.notifs)
	},

	prependNotifs(state, notifs){
		if(!Array.isArray(notifs)) return false;

		state.notifs = notifs.concat(state.notifs)
		state.unread = countUnreadNotifs(state.notifs)
	},

	markNotifsAsRead(state, args){
		for(var notif of state.notifs){
			if(args.all || (args.id && args.id === notif.id))
				notif.pleroma.is_seen = true
		}

		state.unread = countUnreadNotifs(state.notifs)
	}
}

const actions = {
	async fetchNotifs(ctx, args = {}){
		if(ctx.rootState.auth && !ctx.rootState.auth.loggedIn) return //,lmao don't work if we aren't logged in lol
		if(ctx.state.loading){
			console.error('A notification fetch was requested while one was already in progress! Ignoring.')
			return
		}

		ctx.commit('setNotifsValues', { loading: true })

		var params = (typeof(args.params) === 'object' ? args.params : {})
		var config = (typeof(args.config) === 'object' ? args.config : {})

		config = Object.assign({
			mutation: 'prependNotifs',
			setPrev: true,
			setNext: true
		}, config)

		var resp = await fetchNotifications(params)
		if(resp.data.error) throw resp.data.error //TODO: Consider making a custom class for these kinds of errors???

		if(resp.data.length > 0){
			// add the posts to the store
			ctx.commit(config.mutation, resp.data)

			// if wanted, set the params for next and prev
			if((config.setNext || config.setPrev) && resp.links){
				var values = {}

				if(config.setNext && resp.links.next){
					delete resp.links.next.href
					values.next = resp.links.next
				}
				if(config.setPrev && resp.links.prev){
					delete resp.links.prev.href
					values.prev = resp.links.prev
				}

				ctx.commit('setNotifsValues', values)
			}
		}

		ctx.commit('setNotifsValues', { loading: false })
	},

	async fetchNextNotifs(ctx){
		return ctx.dispatch('fetchNotifs', {
			params: ctx.state.next,
			config: { mutation: 'appendNotifs', setNext: true, setPrev: false }
		})
	},

	async fetchPrevNotifs(ctx){
		return ctx.dispatch('fetchNotifs', {
			params: ctx.state.prev,
			config: { mutation: 'prependNotifs', setNext: false, setPrev: true }
		})
	},

	async markNotifsAsRead(ctx, args){
		if(ctx.state.notifs.length <= 0)
			return true

		var reqParams = {}
		
		if(args.all)
			reqParams.max_id = ctx.state.notifs[0].id
		else if(args.id)
			reqParams.id = args.id
		else
			return true
		
		try{
			ctx.commit('markNotifsAsRead', args)
			await markNotificationsAsRead(reqParams)
		}catch(e){
			console.error(e)
			window.alert('an eror okurded while dismising notificejszym') // TODO: replace me with something else when toasts are implemented
		}
	}
}

export default {
	state,
	mutations,
	actions
}