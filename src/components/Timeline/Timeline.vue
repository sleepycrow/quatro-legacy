<script setup>
import StatusSet from '../StatusSet/StatusSet.vue'
import TimelineFetcher from '../../lib/timeline_fetcher'
</script>

<template>
	<div class="timeline">
		<div class="page-content page-content--feed">
			<h1 v-if="fetcher.cache.state.stale" align="center">
				NEW STATUSESEE SAE NEW NEW
			</h1>

			<StatusSet
				v-for="status in statuses"
				:key="getActivityKey(status)"
				:activity="status"
			/>

			<div style="text-align: center;">
				<button class="btn" @click="fetchMore()">
					More...
				</button>
			</div>
		</div>

		<h1 v-if="isLoading" align="center">
			loanding...
		</h1>
	</div>
</template>

<script>
export default {
	//TODO: implement error handling
	//TODO: implement infinite scroll
	components: { StatusSet },

	props: {
		timeline: { type: String, required: true },
		userId: { type: String, default: null }
	},

	data: () => ({
		loaded: false,
		activities: {},
		interval: null
	}),

	computed: {
		isLoading(){
			return this.fetcher.state.loading
		},

		statuses(){
			return this.fetcher.grouped
		}
	},

	created(){
		let timelineInfo = {
			type: 'public'
		}
		if(window.tlInfo) timelineInfo = window.tlInfo
		this.fetcher = new TimelineFetcher(this.$store, 'public', timelineInfo)

		this.fetcher.startListening(console.log)

		// if the cached timeline is empty, fetch some posts to populate it
		if(this.fetcher.statuses.length <= 0)
			this.fetcher.fetchStatuses()
		
		// Check for newer posts, and set up an interval to do so periodically, as well
		this.fetcher.checkForNewer()
		this.interval = window.setInterval(() => {
			this.fetcher.checkForNewer()
				.then(console.log)
		}, 60 * 1000)
	},

	unmounted(){
		window.clearInterval(this.interval)
	},

	methods: {
		getActivityKey(activity){
			return (Array.isArray(activity) ? activity[activity.length - 1].id : activity.id)
		},

		fetchMore(){
			this.fetcher.fetchOlderStatuses()
		}
	}
}
</script>

<style>

</style>