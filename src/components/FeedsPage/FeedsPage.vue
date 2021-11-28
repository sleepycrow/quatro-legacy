<script setup>
import FeedHeader from '../FeedHeader/FeedHeader.vue'
import Timeline from '../Timeline/Timeline.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<FeedHeader
				:timelines="timelines"
				@timeline-change="onTlChanged"
				@settings-change="onSettingsChanged"
			/>

			<Timeline
				storeId="public"
				:info="timeline"
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

	data: () => ({
		loaded: false,

		timelines: [
			{ id: 'home', name: 'Your Timeline' },
			{ id: 'local', name: 'Community Timeline' },
			{ id: 'public', name: 'Global Timeline' }
		],

		timeline: {
			type: 'public',
			params: {
				local: false
			}
		}
	}),

	methods: {
		onTlChanged(tlId){
			if(tlId == 'local') this.timeline.params.local = true
			else this.timeline.params.local = false
		}
	}
}
</script>

<style>

</style>