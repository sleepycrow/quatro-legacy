<script setup>
import StatusSet from '../StatusSet/StatusSet.vue'
import TimelineFetcher from '../../lib/timeline_fetcher'
</script>

<template>
	<div class="timeline">
		<div class="page-content page-content--feed">
			<div v-if="isStale" class="load-new-container">
				<button class="btn" @click="fetchNewer()" :disabled="isLoading">
					{{ this.isLoading ? "Loading..." : "Load new statuses" }}
				</button>
			</div>

			<StatusSet
				v-for="status in statuses"
				:key="getActivityKey(status)"
				:activity="status"
			/>

			<div class="load-more-container">
				<button class="btn" @click="fetchOlder()" :disabled="isLoading">
					{{ this.isLoading ? "Loading..." : "Load more" }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	//TODO: implement error handling
	components: { StatusSet },

	props: {
		storeId: { type: String, required: true },
		info: { type: Object, required: true }
	},

	data: () => ({
		loaded: false,
		activities: {},
		interval: null,
		fetcher: null
	}),

	computed: {
		isLoading(){
			return this.fetcher.state.loading
		},

		isStale(){
			return this.fetcher.state.stale
		},

		statuses(){
			return this.fetcher.grouped
		}
	},

	created(){
		this.$watch('info', this.resetFetcher, { deep: true })
		this.resetFetcher()
		
		// Set up an interval to periodically check for newer posts
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

		fetchOlder(){
			this.fetcher.fetchOlderStatuses()
		},

		fetchNewer(){
			this.fetcher.fetchNewerStatuses()
				.then(() => {
					window.scroll({ top: 0, behavior: 'smooth' })
					this.fetcher.checkForNewer()
				})
		},

		resetFetcher(){
			this.fetcher = new TimelineFetcher(this.$store, this.$props.storeId, this.$props.info)

			// if the cached timeline is empty, fetch some posts to populate it.
			// if it's not, check if there are newer posts than what we have
			if(this.fetcher.statuses.length <= 0)
				this.fetcher.fetchStatuses()
			else
				this.fetcher.checkForNewer()
		}
	}
}
</script>

<style>
.load-new-container{
	position: sticky;
	top: 8px;
	z-index: 10;
	text-align: center;
}

.load-more-container{
	text-align: center;
}
</style>