<script setup>
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.vue"
import BlankLayout from "./layouts/BlankLayout/BlankLayout.vue"
import { useAuthStore } from "./stores/auth"
import { useNotifsStore } from "./stores/notifs"
import { usePostsStore } from "./stores/posts"
import { useInterfaceStore } from "./stores/interface"
import { useInstanceStore } from "./stores/instance"
import { useTimelinesStore } from "./stores/timelines"

const stores = {
	auth: useAuthStore(),
	posts: usePostsStore(),
	notifs: useNotifsStore(),
	interface: useInterfaceStore(),
	instance: useInstanceStore(),
	timelines: useTimelinesStore()
}
</script>

<template>
	<component :is="layout">
		<router-view :key="$route.fullPath" />
	</component>
</template>

<script>
export default {
	components: { DefaultLayout, BlankLayout },

	data: () => ({
		appLoaded: false,
		notifInterval: null
	}),

	computed: {
		layout(){
			return (this.$route.meta.layout || 'DefaultLayout')
		}
	},

	watch: {
		'stores.auth.loggedIn': function(isLoggedIn){
			return this.onLoginStateChange(isLoggedIn)
		},

		'stores.interface.pageTitle': function(){
			return this.updateTitle()
		},

		'stores.instance.nodeName': function(){
			return this.updateTitle()
		}
	},

	created(){
		this.onLoginStateChange(this.stores.auth.loggedIn)
		this.updateTitle()
	},

	methods: {
		onLoginStateChange: async function(isLoggedIn){
			// Clear everything that could possibly be exclusive to any one user whenever switching users
			this.stores.notifs.$reset()
			this.stores.posts.$reset()
			this.stores.timelines.$reset()

			if(isLoggedIn){
				// do not play the "new notifications" sound when fetching notifications for the first time lol
				this.stores.notifs.muted = true
				await this.stores.notifs.fetchNotifs()
				await new Promise((resolve) => { window.setTimeout(resolve, 3000) }) // wait 3 secs, just for safety's sake
				this.stores.notifs.muted = false

				this.notifInterval = window.setInterval(this.attemptFetchNewNotifs.bind(this), 10000)
			}else{
				window.clearInterval(this.notifInterval)
				this.notifInterval = null
			}
		},

		attemptFetchNewNotifs(){
			this.stores.notifs.fetchPrevNotifs()
				.catch((e) => {
					if(e.response.status === 403){
						console.error('The user token seems to be invalid. Cancelling notification polling to save on bandwidth.')

						window.clearInterval(this.notifInterval)
						this.notifInterval = null
					}
				})
		},

		updateTitle(){
			let pageTitle = this.stores.interface.pageTitle
			let instanceName = this.stores.instance.nodeName
			document.title = pageTitle + (pageTitle.length > 0 ? ' • ' : '') + instanceName
		}
	}
}
</script>

<style src="./assets/style.css"></style>
