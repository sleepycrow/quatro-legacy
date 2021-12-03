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
				@timeline-change="onTlChanged"
			/>

			<Timeline
				:store-id="tlId"
				:info="tlInfo"
			/>
		</main>
		<aside>
			<div class="card">
				<div class="card__content">
					<p>test</p>
				</div>
			</div>
		</aside>
	</div>
</template>

<script>
export default {
	components: { FeedHeader, Timeline },

	props: {
		timeline: { type: String, default: 'public' }
	},

	data: () => ({
		loaded: false,

		timelines: [
			{ id: 'home', name: 'Your Timeline', target: '/timelines/home' },
			{ id: 'local', name: 'Community Timeline', target: '/timelines/community' },
			{ id: 'public', name: 'Global Timeline', target: '/timelines/global' }
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
	},

	methods: {
		onTlChanged(tlId){
			if(tlId == 'local') this.tlInfo.params.local = true
			else this.tlInfo.params.local = false

			if(tlId == 'local') this.tlId = 'local'
			else this.tlId = 'public'
		}
	}
}
</script>

<style>

</style>