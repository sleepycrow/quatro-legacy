<script setup>
import StatusSetItem from '../StatusSetItem/StatusSetItem.vue'
</script>

<template>
	<article class="card status-set">
		<div v-if="isThreadPart" class="card__note">Part of a Thread</div>

		<StatusSetItem
			v-for="activity in activity.ancestors"
			:key="activity.id"
			:activity="activity"
		/>

		<StatusSetItem
			:key="activity.id"
			:activity="activity"
		/>

		<StatusSetItem
			v-for="activity in activity.children"
			:key="activity.id"
			:activity="activity"
		/>
	</article>
</template>

<script>
export default {
	components: { StatusSetItem },

	props: {
		activity: { type: Object, required: true }
	},

	computed: {
		isThreadPart(){
			let topStatus = this.activity.reblog !== null ? this.activity.reblog : this.activity
			topStatus = Array.isArray(topStatus.ancestors) ? topStatus.ancestors[0] : topStatus
			return typeof(topStatus.in_reply_to_id) === "string" && topStatus.in_reply_to_id !== ""
		}
	}
}
</script>

<style>
.status-set .status{
	border-bottom: 1px solid #777;
}

.status-set .status:last-child{
	border-bottom: none;
}
</style>