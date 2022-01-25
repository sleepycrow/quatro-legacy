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
	computed: {
		layout(){
			return (this.$route.meta.layout || 'DefaultLayout')
		}
	}
}
</script>

<style src="./assets/style.css"></style>
