<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TheSidebar from './components/TheSidebar/TheSidebar.vue'
</script>

<template>
	<TheSidebar />

	<div class="page">
		<router-view :key="$route.fullPath" />
	</div>
</template>

<script>
export default {
	components: { TheSidebar },

	created(){
		this.$router.afterEach(this.updateTitle)
	},

	mounted(){
		this.updateTitle()
	},

	methods: {
		updateTitle(){
			var title = this.$route.fullPath

			if(typeof(this.$route.meta.title) === 'string')
				title = this.$route.meta.title
			if(typeof(this.$route.meta.i18nTitle) === 'string')
				title = this.$t(this.$route.meta.i18nTitle)
			if(typeof(this.$route.meta.i18nTitle) === 'object' && Array.isArray(this.$route.meta.i18nTitle))
				title = this.$t(...this.$route.meta.i18nTitle)

			document.title = title + ' • ' + this.$store.state.instance.nodeName
		}
	}
}
</script>

<style src="./assets/style.css"></style>
