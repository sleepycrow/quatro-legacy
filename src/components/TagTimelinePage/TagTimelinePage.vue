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
		<FeedHeader>#{{ tag }}</FeedHeader>

		<Timeline
			store-id="tag"
			:info="tlInfo"
		/>
	</div>
</template>

<script>
export default {
	components: { FeedHeader, Timeline },

	props: {
		tag: { type: String, default: '' }
	},

	data: () => ({
		tlInfo: {
			type: 'tag',
			tag: ''
		}
	}),

	created(){
		this.tlInfo.tag = this.$props.tag
	},

	mounted(){
		this.stores.interface.setPageTitle('#'+this.$props.tag)
	}
}
</script>

<style>

</style>