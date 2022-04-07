<script setup>
import StatusSetItem from '../StatusSetItem/StatusSetItem.vue'
</script>

<template>
	<article v-if="theActivities.length > 0" class="card status-set">
		<div v-if="isThreadPart" class="card__note">
			<span class="material-icons-outlined md-18">library_books</span>
			{{ $t('statuses.part_of_a_thread') }}
		</div>

		<StatusSetItem
			v-for="activity in theActivities"
			:key="activity.id"
			:activity="activity"
			:highlighted="activity.id == highlightId"
		/>
	</article>
</template>

<script>
export default {
	components: { StatusSetItem },

	props: {
		activityIds: { default: null },
		activities: { default: null },
		highlightId: { type: String, default: '' }
	},
	
	data: () => ({
		theActivities: []
	}),

	computed: {
		isThreadPart(){
			if(!Array.isArray(this.theActivities) && this.theActivities.length > 0) // sanity check
				return false
			
			let topStatus = this.theActivities[0]
			topStatus = topStatus.reblog !== null ? topStatus.reblog : topStatus
			return typeof(topStatus.in_reply_to_id) === "string" && topStatus.in_reply_to_id !== ""
		}
	},
	
	created(){
		if(this.$props.activities === null && Array.isArray(this.$props.activityIds))
			this.theActivities = this.$props.activityIds.map(id => this.$store.state.timelines.allStatuses[id])
		else if(Array.isArray(this.$props.activities))
			this.theActivities = this.$props.activities
	},
}
</script>

<style>
.status-set{
	overflow: visible; /* So that the context menus work */
}

.status-set .status{
	border-bottom: 1px solid #999;
}

.status-set .status:last-child{
	border-bottom: none;
}
</style>
