<script setup>
import { htmlizeCustomEmoji, htmlSpecialChars } from '../../lib/utils'
import PreviewCard from '../PreviewCard/PreviewCard.vue'
import FuzzyDate from '../FuzzyDate/FuzzyDate.vue'
import MediaAttachmentGrid from '../MediaAttachmentGrid/MediaAttachmentGrid.vue'
</script>

<template>
	<section v-if="status" class="status">
		<!-------------- Repost Info -------------->
		<div v-if="activity.reblog !== null" class="card__note">
			<span class="material-icons md-18">repeat</span>
			Reposted by <strong v-html="rebloggerDisplayName" />
		</div>

		<!-------------- The Actual Status -------------->
		<div class="card__content">
			<!-- Author Info -->
			<div class="status-meta">
				<img class="status-meta__avatar" :src="status.account.avatar" :alt="status.account.acct">
			
				<div class="status-meta__info">
					<!-- When no display name is set, mastodon makes `display_name` an empty string, while pleroma makes it equal to the username,
						so we have to check both cases. Fair enough. -->
					<template v-if="status.account.display_name !== '' && status.account.display_name !== status.account.acct">
						<div class="status-meta__author">
							<span class="author__name"><bdi v-html="authorDisplayName" /></span>
							<span class="author__username">&nbsp;(@{{ status.account.acct }})</span>
						</div>
					</template>

					<template v-if="status.account.display_name === '' || status.account.display_name === status.account.acct">
						<div class="status-meta__author">
							<span class="author__username author__username--only">@{{ status.account.acct }}</span>
						</div>
					</template>

					<div class="status-meta__date">
						<FuzzyDate :datetime="this.status.created_at" :autoupdate="60" />
					</div>
				</div>
			</div>

			<!-------------- Spoiler / Content Warning ---------------->
			<div v-if="hasSpoiler" class="card__spoiler">
				<div class="card__spoiler__text">
					<span class="card__spoiler__icon material-icons">warning</span>
					<span class="card__spoiler__text" v-html="spoilerText" />
				</div>
				<button class="btn btn--mini" @click="toggleContentVisibility">{{ contentHidden ? "Show" : "Hide" }}</button>
			</div>
			
			<!-- Status Content -->
			<div v-if="!contentHidden" class="status-content" v-html="statusContent" />

			<MediaAttachmentGrid
				v-if="!contentHidden && hasMediaAttachments"
				:attachments="status.media_attachments"
				:sensitive="status.sensitive"
			/>

			<!-- Preview Cards -->
			<PreviewCard v-if="!contentHidden && (status.card && !hasMediaAttachments)" :card="status.card" />
			
			<!-- Status Menu -->
			<div class="card__menu">
				<!-- DEBUG: currently used for debugging, make it a dropdown -->
				<button class="btn icon-btn" @click="logActivityData">
					<span class="material-icons">more_horiz</span>
				</button>
			</div>
		</div>
		
		<!-------------- Actions -------------->
		<div class="card__actions">
			<div class="card__action">
				<span class="material-icons">chat_bubble_outline</span>
				{{ status.replies_count }}
			</div>
			
			<div class="card__action" :class="( status.reblogged ? 'card__action--done' : '' )">
				<span class="material-icons">{{ status.reblogged ? 'repeat_on' : 'repeat' }}</span>
				{{ status.reblogs_count }}
			</div>
			
			<div class="card__action" :class="( status.favourited ? 'card__action--done' : '' )">
				<span class="material-icons">{{ status.favourited ? 'favorite' : 'favorite_border' }}</span>
				{{ status.favourites_count }}
			</div>
			
			<div class="card__action">
				<span class="material-icons">collections_bookmark</span>
			</div>

			<!-- DEBUG: just here for debugging -->
			<a class="card__action" :href="status.url">
				<span class="material-icons">arrow_forward</span>
			</a>
		</div>
	</section>
</template>

<script>
export default {
	// TODO: make long statuses half-hidden (wrapped) by default (so they say, like, "read more" or something)
	components: { PreviewCard, MediaAttachmentGrid, FuzzyDate },

	props: {
		activity: { type: Object, required: true }
	},

	data: () => ({
		contentHidden: false
	}),

	computed: {
		rebloggerDisplayName(){
			return htmlizeCustomEmoji(htmlSpecialChars(this.activity.account.display_name), this.activity.account.emojis)
		},

		authorDisplayName(){
			return htmlizeCustomEmoji(htmlSpecialChars(this.status.account.display_name), this.status.account.emojis)
		},

		statusContent(){
			return htmlizeCustomEmoji(this.status.content, this.status.emojis)
		},

		spoilerText(){
			return htmlizeCustomEmoji(htmlSpecialChars(this.status.spoiler_text), this.status.emojis)
		}
	},

	created(){
		this.status = this.activity.reblog !== null ? this.activity.reblog : this.activity
		this.hasSpoiler = typeof(this.status.spoiler_text) == "string" && this.status.spoiler_text.length > 0
		this.hasMediaAttachments = this.status.media_attachments && this.status.media_attachments.length > 0
		this.contentHidden = this.hasSpoiler
	},

	methods: {
		toggleContentVisibility(){
			this.contentHidden = !this.contentHidden
		},

		// DEBUG: remove before release
		logActivityData(){
			console.log(Object.assign({}, this.activity)) // copy the activity into a new object to avoid logging a Proxy object
			window.alert("hey debugger, we heard you liek status data so we logged the status data in your console.\nno problem :>")
		}
	}
}
</script>

<style>
/* Post card elements */
.status-title{
	font-size: 1.5rem;
	font-weight: bold;
	margin: 16px 0;
}

.status-meta{
	width: 100%;
	max-width: 100%;
	display: flex;
	text-align: left;
	align-items: center;
	overflow: hidden;
	margin: 16px 0;
}

.status-meta__avatar{
	width: 48px;
	height: 48px;
	max-width: 48px;
	max-height: 48px;
	border-radius: 50%;
	flex-grow: 0;
	flex-shrink: 0;
	background-color: #CCC;
	overflow: hidden;
}

.status-meta__info{
	margin: 0 0 0 10px;
	flex-grow: 1;
	flex-shrink: 0;
	overflow: hidden;
}

.status-meta__info div{
	margin: 4px 0;
}

.status-meta .author__name{
	font-weight: bold;
}

.status-meta .author__username{
	font-weight: normal;
}

.status-meta .author__username--only{
	font-weight: bold;
}

.status-meta__date{
	font-weight: normal;
	color: #333;
}

.status-content{
	margin: 1rem 0 0 0;
}

.status-image{
	text-align: center;
	margin: 1rem 0 0 0;
}

.card__spoiler{
	text-align: center;
	margin: 8px 0;
}

.card__spoiler .card__spoiler__text{
	font-weight: bold;
	margin: 6px;
}

.card__spoiler .card__spoiler__icon{
	font-size: 1.5rem;
}
</style>