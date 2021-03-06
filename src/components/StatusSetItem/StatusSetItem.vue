<script setup>
import { htmlizeCustomEmoji, htmlSpecialChars, getProfileUrl } from '../../lib/utils'
import PreviewCard from '../PreviewCard/PreviewCard.vue'
import FuzzyDate from '../FuzzyDate/FuzzyDate.vue'
import MediaAttachmentGrid from '../MediaAttachmentGrid/MediaAttachmentGrid.vue'
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue'
import { usePostsStore } from '../../stores/posts'

const stores = {
	posts: usePostsStore()
}
</script>

<template>
	<section
		v-if="status"
		class="status"
		:class="(highlighted ? 'status--highlighted' : '')"
	>
		<!-------------- Repost Info -------------->
		<div v-if="theActivity.reblog !== null" class="card__note">
			<span class="material-icons md-18">repeat</span>
			{{ $t('statuses.reposted_by') }}
			<router-link
				class="card-note__username"
				:to="rebloggerProfileUrl"
			>
				<bdi v-html="rebloggerDisplayName" />
			</router-link>
		</div>

		<!-------------- The Actual Status -------------->
		<div class="card__content">
			<!-- Author Info -->
			<div class="status-meta">
				<router-link class="status-meta__avatar" :to="authorProfileUrl">
					<img :src="status.account.avatar" :alt="status.account.acct">
				</router-link>
			
				<div class="status-meta__info">
					<div class="status-meta__author">
						<router-link :to="authorProfileUrl">
							<span v-if="authorDisplayName !== null" class="author__name">
								<bdi v-html="authorDisplayName" />
							</span>

							<span v-if="authorDisplayName !== null" class="author__username">
								(@{{ status.account.acct }})
							</span>

							<span v-if="authorDisplayName === null" class="author__username author__username--only">
								@{{ status.account.acct }}
							</span>
						</router-link>
					</div>

					<div class="status-meta__date">
						<FuzzyDate :datetime="status.created_at" :autoupdate="60" />
						•
						<i
							class="material-icons md-18 status__visibility-icon"
							:title="$t('statuses.visibility_'+status.visibility)"
							v-html="statusVisibilityIcon"
						/>
					</div>
				</div>
			</div>

			<!-------------- Spoiler / Content Warning ---------------->
			<div v-if="hasSpoiler" class="card__spoiler">
				<div class="card__spoiler__text">
					<span class="card__spoiler__icon material-icons">warning</span>
					<span v-if="hasMediaAttachments" class="card__spoiler__icon material-icons">image</span>
					<span class="card__spoiler__text" v-html="spoilerText" />
				</div>
				<button class="btn btn--mini" @click="toggleContentVisibility">{{ contentHidden ? $t('show') : $t('hide') }}</button>
			</div>
			
			<!-- Status Content -->
			<div class="status-content" :class="(contentHidden ? 'status-content--hidden' : '')">
				<div ref="textContent" class="status-text" v-html="statusContent" />

				<MediaAttachmentGrid
					v-if="hasMediaAttachments"
					:attachments="status.media_attachments"
					:sensitive="status.sensitive"
				/>

				<!-- Preview Cards -->
				<PreviewCard v-if="status.card && !hasMediaAttachments" :card="status.card" />
			</div>
				
			<!-- Status Menu -->
			<DropdownMenu
				horiz-align="right"
				btn-icon="more_horiz"
				container-class="dropdown dropdown--right card__menu"
				btn-class="btn icon-btn"
			>
				<li>
					<a :href="status.url" target="_blank">External source</a>
				</li>

				<li>
					<a @click="copyLinkToStatus">Copy link to status</a>
				</li>

				<li>
					<a :href="status.url" target="_blank">Report</a>
				</li>

				<li>
					<a @click="logActivityData">Log activity data</a>
				</li>
			</DropdownMenu>
		</div>
		
		<!-------------- Actions -------------->
		<div class="card__actions">
			<button class="card__action">
				<span class="material-icons">chat_bubble_outline</span>
				{{ status.replies_count }}
			</button>
			
			<button
				class="card__action"
				:class="( status.reblogged ? 'card__action--done' : '' )"
			>
				<span class="material-icons">{{ status.reblogged ? 'repeat_on' : 'repeat' }}</span>
				{{ status.reblogs_count }}
			</button>
			
			<button
				class="card__action"
				:class="( status.favourited ? 'card__action--done' : '' )"
			>
				<span class="material-icons">{{ status.favourited ? 'favorite' : 'favorite_border' }}</span>
				{{ status.favourites_count }}
			</button>
			
			<button
				class="card__action"
				:class="( status.bookmarked ? 'card__action--done' : '' )"
			>
				<span class="material-icons">{{ status.bookmarked ? 'bookmark' : 'bookmark_border' }}</span>
			</button>

			<router-link class="card__action" :to="'/statuses/'+status.id">
				<span class="material-icons">arrow_forward</span>
			</router-link>
		</div>
	</section>
</template>

<script>
export default {
	// TODO: make long statuses half-hidden (wrapped) by default (so they say, like, "read more" or something)
	components: { PreviewCard, MediaAttachmentGrid, FuzzyDate, DropdownMenu },

	props: {
		activity: { default: null },
		activityId: { default: null },
		highlighted: { type: Boolean, default: false }
	},

	data: () => ({
		contentHidden: false
	}),

	computed: {
		rebloggerDisplayName(){
			var display_name = this.theActivity.account.display_name
			
			// If no display name is set, use the reblogger's @ as their display name
			if(this.theActivity.account.display_name === '' || this.theActivity.account.display_name === this.theActivity.account.acct)
				display_name = `@${this.theActivity.account.acct}`

			return htmlizeCustomEmoji(htmlSpecialChars(display_name), this.theActivity.account.emojis)
		},

		authorDisplayName(){
			// When no display name is set, mastodon sets display_name to '', while Pleroma sets it to acct. why????
			if(this.status.account.display_name === '' || this.status.account.display_name === this.status.account.acct)
				return null
			
			return htmlizeCustomEmoji(htmlSpecialChars(this.status.account.display_name), this.status.account.emojis)
		},

		rebloggerProfileUrl(){
			return getProfileUrl(this.theActivity.account)
		},

		authorProfileUrl(){
			return getProfileUrl(this.status.account)
		},

		statusContent(){
			return htmlizeCustomEmoji(this.status.content, this.status.emojis)
		},

		spoilerText(){
			return htmlizeCustomEmoji(htmlSpecialChars(this.status.spoiler_text), this.status.emojis)
		},

		statusVisibilityIcon(){
			switch(this.status.visibility){
			case 'unlisted':
				return 'lock_open'
				
			case 'private':
				return 'lock'
				
			case 'direct':
				return 'mail'
			}

			return 'public'
		}
	},

	created(){
		if(this.$props.activity === null && typeof this.$props.activityId === 'string')
			this.theActivity = this.stores.posts.getPost(this.$props.activityId)
		else
			this.theActivity = this.$props.activity
		
		this.status = this.theActivity.reblog !== null ? this.theActivity.reblog : this.theActivity
		this.hasSpoiler = typeof(this.status.spoiler_text) == "string" && this.status.spoiler_text.length > 0
		this.hasMediaAttachments = this.status.media_attachments && this.status.media_attachments.length > 0
		this.contentHidden = this.hasSpoiler
	},

	mounted(){
		this.processLinks()
	},

	methods: {
		toggleContentVisibility(){
			this.contentHidden = !this.contentHidden
		},

		// DEBUG: remove before release
		logActivityData(){
			console.log(Object.assign({}, this.theActivity)) // copy the activity into a new object to avoid logging a Proxy object
			window.alert("hey debugger, we heard you liek status data so we logged the status data in your console.\nno problem :>")
		},

		copyLinkToStatus(){
			navigator.clipboard.writeText(this.status.uri)
			window.alert('done. now replace me with a toast notification or something')
			// TODO: Add a toast notification here, so the user sees something happened
		},

		onLocalizedLinkClick(targetUrl, e){
			if (e.button !== 0 || e.ctrlKey || e.metaKey) return

			e.preventDefault()
			this.$router.push(targetUrl)
		},

		_localizeMention(link){
			var subject = link.innerText
			subject = (subject.substr(0, 1) === '@' ? subject.slice(1) : subject)

			for(var mention of this.status.mentions){
				if(mention.acct === subject || mention.username === subject){
					var targetUrl = getProfileUrl(mention)

					link.innerHTML = `@${mention.acct}`
					link.title = mention.acct
					link.href = targetUrl

					link.addEventListener('click', this.onLocalizedLinkClick.bind(this, targetUrl), false)
				}
			}
		},

		_localizeHashtag(link){
			var tag = link.textContent.slice(1)
			var targetUrl = `/tags/${tag}`

			link.href = targetUrl
			
			link.addEventListener('click', this.onLocalizedLinkClick.bind(this, targetUrl), false)
		},

		processLinks(){
			var links = this.$refs.textContent.querySelectorAll('a')
			
			for(var link of links){
				if(link.classList.contains('mention'))
					this._localizeMention(link)
				else if(link.textContent[0] === '#')
					this._localizeHashtag(link)
				else
					link.target = '_blank'
			}
		}
	}
}
</script>

<style>
.status{
	padding: 0.1px 0 0.1px 0; /* holy fuck I hate css. this is here to stop collapsing margins within this element */
}

.status--highlighted{
	background-color: #EEE;
}

/* Post card elements */
.status-title{
	font-size: 1.5rem;
	font-weight: bold;
	margin: 16px 0;
}

.status-meta{
	width: calc(100% - var(--icon-button-size));
	max-width: calc(100% - var(--icon-button-size));
	display: flex;
	text-align: left;
	align-items: center;
	overflow: hidden;
}

.status-meta__avatar img{
	display: block;
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

.status-meta a{
	color: inherit;
	text-decoration: none;
}

.status-meta a:hover{
	text-decoration: none;
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

.status__visibility-icon{
	cursor: default;
}

.status-content--hidden{
	display: none;
}

.status--highlighted .status-text{
	font-size: 1.33rem;
}

.status-text{
	margin: 1rem 0 0 0;
	white-space: pre-wrap;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
}

.status-text .emoji{
	width: 32px;
	height: 32px;
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
	margin: 6px;
}

.card-note__username{
	font-weight: bold;
	color: inherit;
}
</style>
