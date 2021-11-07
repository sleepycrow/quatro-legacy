<script setup>
import StatusSetItem from '../StatusSetItem/StatusSetItem.vue'
</script>

<template>
	<article class="card status-set">
		<div class="card__note" v-if="threadElement">Part of a Thread</div>

		<template v-if="multipleActivities">
			<StatusSetItem
				v-for="activity in activities"
				:key="activity.id"
				:activity="activity"
			/>
		</template>

		<template v-else>
			<StatusSetItem
				:key="activities.id"
				:activity="activities"
			/>
		</template>
	</article>
</template>

<script>
export default {
	components: { StatusSetItem },

	props: {
		activities: { type: [Array, Object], required: true }
	},

	computed: {
		multipleActivities(){
			return Array.isArray(this.activities)
		},

		threadElement(){
			let status = Array.isArray(this.activities) ? this.activities[this.activities.length - 1] : this.activities
			return typeof(status.in_reply_to_id) === "string" && status.in_reply_to_id !== ""
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