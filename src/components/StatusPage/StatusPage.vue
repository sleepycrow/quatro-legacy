<script setup>
import StatusSet from '../StatusSet/StatusSet.vue'
import { fetchStatus } from '../../lib/api';
import { nextTick } from '@vue/runtime-core'
</script>

<template>
	<div class="page-content page-content--feed">
		<main>
			<!-- FIXME: add in an actual throbber -->
			<h1 v-if="!loaded" align="center">
				Loading...
			</h1>

			<StatusSet
				v-if="loaded && status !== null"
				:highlight-id="statusId"
				:activities="activities"
			/>
		</main>
	</div>
</template>

<script>
export default {
	components: { StatusSet },

	props: {
		statusId: { type: String, default: '' }
	},

	data: () => ({
		loaded: false,
		activities: null
	}),

	mounted(){
		fetchStatus(this.$props.statusId, true)
			.then(({ status, ancestors, descendants }) => {
				this.activities = ancestors.concat([status]).concat(descendants)
				this.status = status
				this.loaded = true

				var author_name = (this.status.account.display_name !== null ? this.status.account.display_name : this.status.account.acct)
				this.$store.dispatch('setPageTitle', this.$t('statuses.status_page_title', [author_name]))

				return nextTick()
			})
			.then(() => {
				if(document.getElementsByClassName('status--highlighted').length > 0)
					document.getElementsByClassName('status--highlighted')[0].scrollIntoView({ behavior: 'smooth' })
			})
			.catch((e) => {
				// FIXME: add in like,, actual, good-looking, meant-for-end-users errors
				this.loaded = true
				this.status = null

				console.error(e)
				window.alert(e)
			})
	}
}
</script>

<style>

</style>
