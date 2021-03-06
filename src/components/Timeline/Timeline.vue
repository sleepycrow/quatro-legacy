<script setup>
import { PAGE_SIZE } from '../../lib/api'
import StatusSet from '../StatusSet/StatusSet.vue'
import TimelineFetcher from '../../lib/timeline_fetcher'
import { useTimelinesStore } from '../../stores/timelines'

const stores = {
	timelines: useTimelinesStore()
}
</script>

<template>
	<div class="timeline">
		<div class="page-content page-content--feed">
			<div v-if="isStale" class="load-new-container">
				<button class="btn" :disabled="isLoading" @click="fetchPrev()">
					{{ isLoading ? $t('loading') : $t('load_new_statuses') }}
				</button>
			</div>

			<StatusSet
				v-for="status in statuses"
				:key="getActivityKey(status)"
				:activity-ids="status"
			/>

			<div class="load-more-container">
				<button class="btn" :disabled="isLoading" @click="fetchNext()">
					{{ isLoading ? $t('loading') : $t('load_more') }}
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
			return this.fetcher.state.staleBy > 0
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
			return (Array.isArray(activity) ? activity[activity.length - 1] : activity)
		},

		fetchPrev(){
			var promise;

			if(this.fetcher.state.staleBy >= PAGE_SIZE){
				this.fetcher.clearTimeline()
				promise = this.fetcher.fetchStatuses({}, { setNext: true, setPrev: true })
			}else{
				promise = this.fetcher.fetchPrev()
			}
			
			promise
				.then(() => {
					window.scroll({ top: 0, behavior: 'smooth' })
					this.fetcher.checkForNewer()
				})
		},

		fetchNext(){
			this.fetcher.fetchNext()
		},

		resetFetcher(){
			this.fetcher = new TimelineFetcher(this.stores.timelines, this.$props.storeId, this.$props.info)

			// if the cached timeline is empty, fetch some posts to populate it.
			// if it's not, check if there are newer posts than what we have
			if(this.fetcher.statuses.length <= 0)
				this.fetcher.fetchStatuses({}, { setNext: true, setPrev: true })
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
	pointer-events: none;
}

.load-new-container button{
	pointer-events: auto;
}

.load-more-container{
	text-align: center;
}
</style>
