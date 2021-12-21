<script setup>
import FeedHeader from '../FeedHeader/FeedHeader.vue'
import Timeline from '../Timeline/Timeline.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<FeedHeader
				:timelines="timelines"
				:selected="tlId"
			/>

			<Timeline
				:store-id="tlId"
				:info="tlInfo"
			/>
		</main>
	</div>
</template>

<script>
export default {
	components: { FeedHeader, Timeline },

	props: {
		timeline: { type: String, default: 'public' }
	},

	data: () => ({
		timelines: [
			{ id: 'home', target: '/timelines/home' },
			{ id: 'local', target: '/timelines/community' },
			{ id: 'public', target: '/timelines/global' }
		],

		tlId: 'public',

		tlInfo: {
			type: 'public',
			params: {
				local: false
			}
		}
	}),

	created(){
		switch(this.$props.timeline){
		case 'home':
			this.tlId = 'home'
			this.tlInfo.type = 'home'
			break
		
		case 'local':
			this.tlId = 'local'
			this.tlInfo.type = 'public'
			this.tlInfo.params.local = true
			break
		
		case 'public':
		default:
			this.tlId = 'public'
			this.tlInfo.type = 'public'
		}
	}
}
</script>

<style>

</style>