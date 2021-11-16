<template>
	<header class="flex-header">
		<div class="flex-header__title">
			<div class="flex-header__dropdown">
				<!-- TODO: convert the dropdown title into a button and content into links for accessibility reasons -->
				<button class="flex-header__dropdown__title" @click="toggleFeedDropdown">
					Your Feed
					<span class="material-icons">arrow_drop_down</span>
				</button>

				<ul ref="selectorDropdown" class="flex-header__dropdown__content">
					<li>Your Feed</li>
					<li>Community Feed</li>
					<li>Global Feed</li>
				</ul>
			</div>
		</div>

		<div class="flex-header__buttons">
			<button class="btn icon-btn">
				<span class="material-icons">tune</span>
			</button>
		</div>
	</header>
</template>

<script>
export default {

	methods: {
		toggleFeedDropdown(){
			this.$refs.selectorDropdown.classList.toggle("flex-header__dropdown__content--visible")
		}
	}

}
</script>