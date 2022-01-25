<script setup>
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout.vue"
import BlankLayout from "./layouts/BlankLayout/BlankLayout.vue"
import LoadingScreen from './components/LoadingScreen/LoadingScreen.vue'
</script>

<template>
	<LoadingScreen v-if="!appLoaded" />

	<component v-if="appLoaded" :is="layout">
		<router-view :key="$route.fullPath" />
	</component>
</template>

<script>
export default {
	components: { LoadingScreen, DefaultLayout, BlankLayout },

	data: () => ({
		appLoaded: false
	}),

	computed: {
		layout(){
			return (this.$route.meta.layout || 'DefaultLayout')
		}
	},

	created(){
		Promise.all([
			this.$store.dispatch('fetchInstanceInfo'),
			this.$store.dispatch('attemptTokenRecovery')
		])
			.then(() => {
				this.appLoaded = true
			})
	}
}
</script>

<style src="./assets/style.css"></style>
