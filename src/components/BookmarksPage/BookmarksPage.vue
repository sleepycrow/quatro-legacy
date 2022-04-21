<script setup>
import { useInterfaceStore } from '../../stores/interface'
import FeedHeader from '../FeedHeader/FeedHeader.vue'
import Timeline from '../Timeline/Timeline.vue'

const stores = {
	interface: useInterfaceStore()
}
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
		this.stores.interface.setPageTitle(this.$t('menu.bookmarks'))
	}
}
</script>

<style>

</style>