<script setup>
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.vue"
import BlankLayout from "./layouts/BlankLayout/BlankLayout.vue"
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
		'$store.state.auth.loggedIn': function(isLoggedIn){
			return this.onLoginStateChange(isLoggedIn)
		}
	},

	created(){
		this.onLoginStateChange(this.$store.state.auth.loggedIn)
	},

	methods: {
		onLoginStateChange: async function(isLoggedIn){
			// Clear everything that could possibly be exclusive to any one user whenever switching users
			this.$store.commit('clearNotifs')
			this.$store.commit('clearAllTimelines')

			if(isLoggedIn){
				// do not play the "new notifications" sound when fetching notifications for the first time lol
				this.$store.commit('setNotifsValues', { muted: true })
				await this.$store.dispatch('fetchNotifs')
				await new Promise((resolve) => { window.setTimeout(resolve, 3000) }) // wait 3 secs, just for safety's sake
				this.$store.commit('setNotifsValues', { muted: false })

				this.notifInterval = window.setInterval(this.attemptFetchNewNotifs.bind(this), 10000)
			}else{
				window.clearInterval(this.notifInterval)
				this.notifInterval = null
			}
		},

		attemptFetchNewNotifs(){
			this.$store.dispatch('fetchPrevNotifs')
				.catch((e) => {
					if(e.response.status === 403){
						console.error('The user token seems to be invalid. Cancelling notification polling to save on bandwidth.')

						window.clearInterval(this.notifInterval)
						this.notifInterval = null
					}
				})
		}
	}
}
</script>

<style src="./assets/style.css"></style>
