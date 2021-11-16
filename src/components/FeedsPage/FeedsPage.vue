<script setup>
import FeedHeader from '../FeedHeader/FeedHeader.vue'
import Timeline from '../Timeline/Timeline.vue'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<FeedHeader />

			<Timeline
				timeline="public"
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
		activities: {}
	}),

	created(){
		// nothing
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