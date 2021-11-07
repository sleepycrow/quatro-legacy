<script setup>
import * as apiService from '../../services/ApiService.js'
import { reorderTimeline } from '../../lib/timeline_utils'
import StatusSet from '../StatusSet/StatusSet.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<h1 v-if="!loaded">
				loanding...
			</h1>

			<div v-if="loaded" class="page-content page-content--feed">
				<StatusSet
					v-for="activity in activities"
					:key="getActivityKey(activity)"
					:activities="activity"
				/>
			</div>
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
	components: { StatusSet },

	data: () => ({
		loaded: false,
		activities: {}
	}),

	created(){
		apiService.fetchTimeline('public')
			.then(resp => {
				if(resp.error) throw resp.error;

				this.activities = reorderTimeline(resp)
				this.loaded = true
			})
			.catch(err => {
				console.error(err)
				window.alert("an error okurded!!\n"+String(err))
			})
	},

	methods: {
		getActivityKey(activity){
			return (Array.isArray(activity) ? activity[activity.length - 1].id : activity.id)
		}
	}
}
</script>

<style>

</style>