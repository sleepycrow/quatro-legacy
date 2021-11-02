<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import NavSidebar from './components/NavSidebar/NavSidebar.vue'
</script>

<template>
	<NavSidebar></NavSidebar>

	<div class="page">
		<router-view></router-view>
	</div>
</template>

<style src="./assets/style.css"></style>
