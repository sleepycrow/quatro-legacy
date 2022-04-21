<script setup>
import { useInterfaceStore } from '../../stores/interface'
import { useNotifsStore } from '../../stores/notifs'
import NotificationCard from '../NotificationCard/NotificationCard.vue'

const stores = {
	notifs: useNotifsStore(),
	interface: useInterfaceStore()
}
</script>

<template>
	<div class="page-content page-content--notifications">
		<header class="flex-header">
			<div class="flex-header__title">
				<h1>{{ $t('menu.notifications') }}</h1>
			</div>

			<div class="flex-header__buttons">
				<button
					class="btn icon-btn"
					:title="$t('notifs.mark_all_as_read')"
					@click="markAllAsRead"
				>
					<span class="material-icons">done_all</span>
				</button>
			</div>
		</header>

		<NotificationCard
			v-for="notif in notifs"
			:key="notif.id"
			:notif="notif"
		/>

		<div v-if="notifs.length > 0" class="load-more-container">
			<button class="btn" :disabled="isLoading" @click="fetchNext()">
				{{ isLoading ? $t('loading') : $t('load_more') }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	components: { NotificationCard },

	computed: {
		isLoading(){
			return this.stores.notifs.loading
		},

		notifs(){
			return this.stores.notifs.notifs
		}
	},

	created(){
	},

	mounted(){
		this.stores.interface.setPageTitle(this.$t('menu.notifications'))
	},

	methods: {
		fetchNext(){
			this.stores.notifs.fetchNextNotifs()
		},

		markAllAsRead(){
			this.stores.notifs.markNotifsAsRead({ all: true })
		}
	}
}
</script>

<style>

</style>