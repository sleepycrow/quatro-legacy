<template>
	<!-- Link/Photo/Video Preview -->
	<!-- We'll use the same card for all types for now, it works well enough and saves us some headache. -->
	<template v-if="card.type === 'link' || card.type === 'photo' || card.type === 'video'">
		<div class="preview-card preview-card--link">
			<a
				class="preview-card__link"
				:class="(card.image ? 'preview-card__link--has-preview' : '')"
				:href="card.url"
				:title="card.title"
				target="_blank"
			>
				<div v-if="card.image" class="preview-card__preview">
					<img :src="card.image" :alt="card.title">
				</div>

				<div class="preview-card__info">
					<strong class="preview-card__title">{{ card.title }}</strong>
					<div class="preview-card__description">{{ card.description }}</div>
					<div class="preview-card__host"><i class="material-icons md-18">link</i> {{ previewCardHost }}</div>
				</div>
			</a>
		</div>
	</template>
</template>


<script>
export default {
	props: {
		card: { type: Object, required: true }
	},

	computed: {
		previewCardHost(){
			if(typeof(this.card) !== "object") return '';
			
			var matches = this.card.url.match(new RegExp('^https?://(?:www.)?([^/:]+)', 'i'))
			if(matches !== null && typeof(matches) === 'object' && typeof(matches[1]) === 'string')
				return matches[1]
			
			return ''
		}
	}
}
</script>

<style>
/* Preview cards */
.preview-card{
	display: block;
	border: 1px solid #CCC;
	border-radius: 3px;
	background-color: transparent;
	margin: 1rem 0;
}

.preview-card__link{
	display: table;
	width: 100%;
	text-decoration: none;
	cursor: pointer;
	color: #000;
	background-color: transparent;
	text-decoration: none;
	transition: background-color 0.15s;
}

.preview-card__link--has-preview{
	display: grid;
	grid-template-columns: 64px auto;
}

.preview-card__link:hover{
	background-color: rgba(0, 0, 0, 0.12);
	text-decoration: none;
}

.preview-card__preview{
	background-color: #CCC;
	overflow: hidden;
}

.preview-card__preview img{
	width: 100%;
	height: 100%;
	object-fit: cover;
	background-size: cover;
	background-position: 50%;
	border-radius: 2px 0 0 2px;
}

.preview-card__info{
	padding: 8px;
	overflow-x: hidden;
}

.preview-card__title{
	display: block;
	font-weight: bold;
	font-size: 1.2rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.preview-card__description{
	display: block;
	margin: 0.25rem 0;
}

.preview-card__host{
	display: block;
	color: #333;
}
</style>
