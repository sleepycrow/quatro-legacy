<script setup>
import StatusSetItem from '../StatusSetItem/StatusSetItem.vue'
</script>

<template>
	<article class="card status-set">
		<div v-if="isThreadPart" class="card__note">
			<span class="material-icons-outlined md-18">library_books</span>
			{{ $t('statuses.part_of_a_thread') }}
		</div>

		<StatusSetItem
			v-for="ancestor in activity.ancestors"
			:key="ancestor.id"
			:activity="ancestor"
		/>

		<StatusSetItem
			:key="activity.id"
			:activity="activity"
			:highlighted="highlightFocus"
		/>

		<StatusSetItem
			v-for="descendant in activity.descendants"
			:key="descendant.id"
			:activity="descendant"
		/>
	</article>
</template>

<script>
export default {
	components: { StatusSetItem },

	props: {
		activity: { type: Object, required: true },
		highlightFocus: { type: Boolean, default: false }
	},

	computed: {
		isThreadPart(){
			let topStatus = this.activity.reblog !== null ? this.activity.reblog : this.activity
			topStatus = (Array.isArray(topStatus.ancestors) && topStatus.ancestors.length > 0) ? topStatus.ancestors[0] : topStatus
			return typeof(topStatus.in_reply_to_id) === "string" && topStatus.in_reply_to_id !== ""
		}
	}
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