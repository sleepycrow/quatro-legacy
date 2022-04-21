<script setup>
import TheSidebar from "../../components/TheSidebar/TheSidebar.vue";
import TheGuestSidebar from "../../components/TheGuestSidebar/TheGuestSidebar.vue";
import { useAuthStore } from "../../stores/auth";

const stores = {
	auth: useAuthStore()
}
</script>

<template>
	<TheSidebar v-if="stores.auth.loggedIn" />
	<TheGuestSidebar v-else />

	<div class="page">
		<slot />
	</div>
</template>