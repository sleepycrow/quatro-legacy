<script setup>
import NotificationCard from '../NotificationCard/NotificationCard.vue'
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

	data: () => ({
	}),

	computed: {
		isLoading(){
			return this.$store.state.notifs.loading
		},

		notifs(){
			return this.$store.state.notifs.notifs
		}
	},

	created(){
	},

	mounted(){
		this.$store.dispatch('setPageTitle', this.$t('menu.notifications'))
	},

	methods: {
		fetchNext(){
			this.$store.dispatch('fetchNextNotifs')
		},

		markAllAsRead(){
			this.$store.dispatch('markNotifsAsRead', { all: true })
		}
	}
}
</script>

<style>

</style>