<script setup>
import TheSidebar from "../../components/TheSidebar/TheSidebar.vue";
import TheGuestSidebar from "../../components/TheGuestSidebar/TheGuestSidebar.vue";
</script>

<template>
	<TheSidebar v-if="$store.state.auth.loggedIn" />
	<TheGuestSidebar v-else />

	<div class="page">
		<slot />
	</div>
</template>

<script>
export default {
	components: { TheSidebar, TheGuestSidebar }
}
</script>