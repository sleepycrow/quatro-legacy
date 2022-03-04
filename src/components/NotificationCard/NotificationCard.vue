<script setup>
import { htmlizeCustomEmoji, htmlSpecialChars, getProfileUrl } from '../../lib/utils'
import FuzzyDate from '../FuzzyDate/FuzzyDate.vue'
import StatusSetItem from '../StatusSetItem/StatusSetItem.vue'
</script>

<template>
	<div class="card notif">
		<section class="card__content notif__info" :class="(!notif.pleroma.is_seen ? 'notif__info--unseen' : '')">
			<p>
				<router-link
					v-if="notif.type !== 'poll'"
					:to="getProfileUrl(notif.account)"
				>
					<bdi v-html="notifAcctDisplayName" />
				</router-link>

				{{ $t(`notifs.${notif.type}`, { emoji: notif.emoji }) }}

				<span class="notif__info__time">
					(<FuzzyDate :datetime="notif.created_at" :autoupdate="60" />)
				</span>
			</p>

			<div class="card__menu">
				<button
					v-if="!notif.pleroma.is_seen"
					class="btn icon-btn"
					:title="$t('notifs.mark_as_read')"
					@click="markAsRead"
				>
					<span class="material-icons">done</span>
				</button>
			</div>
		</section>

		<StatusSetItem
			v-if="notif.status"
			:key="notif.status.id"
			:activity="notif.status"
		/>
	</div>
</template>

<script>
export default {
	components: { FuzzyDate, StatusSetItem },

	props: {
		notif: { type: Object, required: true }
	},

	computed: {
		notifAcctDisplayName(){
			var display_name = this.notif.account.display_name
			
			// If no display name is set, use the reblogger's @ as their display name
			if(this.notif.account.display_name === '' || this.notif.account.display_name === this.notif.account.acct)
				display_name = `@${this.notif.account.acct}`

			return htmlizeCustomEmoji(htmlSpecialChars(display_name), this.notif.account.emojis)
		}
	},

	methods: {
		markAsRead(){
			this.$store.dispatch('markNotifsAsRead', { id: this.notif.id })
		}
	}
}
</script>

<style>
.notif{
	overflow: visible;
	padding: 0.1px 0 0.1px 0;
}

.notif__info p{
	width: calc(100% - var(--icon-button-size));
	line-height: var(--icon-button-size);
	vertical-align: middle;
}

.notif__info--unseen p{
	font-weight: bold;
}

.notif__info__time{
	color: #333;
	font-weight: normal !important;
}

.notif .status{
	border-top: 1px solid #999;
}
</style>