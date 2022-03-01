<!-- TODO: hey fuckface rewrite all of this. idk make it not trash lmaoo -->

<script setup>
import { htmlizeCustomEmoji, htmlSpecialChars, getProfileUrl } from '../../lib/utils'
</script>

<template>
	<div class="page-content page-content--feed">
		<header class="flex-header">
			<div class="flex-header__title">
				<h1>{{ $t('menu.notifications') }}</h1>
			</div>

			<div class="flex-header__buttons">
				<button class="btn icon-btn">
					<span class="material-icons">done_all</span>
				</button>
			</div>
		</header>

		<div v-for="notif in $store.state.notifs.notifs" :key="notif.id" class="card">
			<p class="card__content" :style="(!notif.pleroma.is_seen ? 'font-weight: bold' : '')">
				<router-link :to="getProfileUrl(notif.account)">
					<bdi v-html="htmlizeCustomEmoji(htmlSpecialChars(notif.account.display_name), notif.account.emojis)" />
				</router-link>
				{{ notif.type }}
			</p>
		</div>

		<div class="load-more-container">
			<button class="btn" :disabled="isLoading" @click="fetchNext()">
				{{ isLoading ? $t('loading') : $t('load_more') }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
	components: {},

	data: () => ({
	}),

	computed: {
		isLoading(){
			return this.$store.state.notifs.loading
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
		}
	}
}
</script>

<style>

</style>