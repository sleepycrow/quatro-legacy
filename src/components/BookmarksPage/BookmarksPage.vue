<script setup>
import FeedHeader from '../FeedHeader/FeedHeader.vue'
import Timeline from '../Timeline/Timeline.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<FeedHeader>{{ $t('menu.bookmarks') }}</FeedHeader>

		<Timeline
			store-id="bookmarks"
			:info="tlInfo"
		/>
	</div>
</template>

<script>
export default {
	components: { FeedHeader, Timeline },

	data: () => ({
		tlInfo: { type: 'bookmarks' }
	}),

	mounted(){
		this.$store.dispatch('setPageTitle', this.$t('menu.bookmarks'))
	}
}
</script>

<style>

</style>