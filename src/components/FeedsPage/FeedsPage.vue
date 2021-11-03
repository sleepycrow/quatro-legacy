<script setup>
import * as apiService from '../../services/ApiService.js'
import Activity from '../Activity/Activity.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<h1 v-if="!loaded">loanding...</h1>

			<div v-if="loaded" class="page-content page-content--feed">
				<Activity v-for="activity in activities"
					:key="activity.id"
					:activity="activity">
				</Activity>
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
	components: { Activity },

	data: () => ({
		loaded: false,
		activities: {}
	}),

	created(){
		apiService.fetchTimeline('public')
		.then(resp => {
			if(resp.error) throw resp.error;

			this.activities = resp
			this.loaded = true
		})
		.catch(err => {
			console.error(err)
			window.alert("an error okurded!!\n"+String(err))
		})
	}	
}
</script>

<style>

</style>