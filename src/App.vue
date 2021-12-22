<script setup>
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
	components: { TheSidebar }
}
</script>

<style src="./assets/style.css"></style>
