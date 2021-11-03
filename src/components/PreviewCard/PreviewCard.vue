<template>
  	<!-- Link/Photo/Video Preview -->
	<!-- We'll use the same card for all types for now, it works well enough and saves us some headache. -->
	<template v-if="card.type === 'link' || card.type === 'photo' || card.type === 'video'">
		<a class="preview-card-wrapper" :href="card.url" :title="card.title" target="_blank">
			<div class="preview-card preview-card--link">
				<div v-if="card.image" class="preview-card__preview preview-card__preview--link">
					<img :src="card.image" :alt="card.title">
				</div>
				<div class="preview-card__info">
					<strong class="preview-card__title">{{ card.title }}</strong>
					<div class="preview-card__host">{{ previewCardHost }}</div>
				</div>
			</div>
		</a>
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
.preview-card-wrapper{
	display: block;
	text-decoration: none;
	cursor: pointer;
	margin: 1rem 0;
}

.preview-card{
	border: 1px solid #CCC;
	border-radius: 2px;
	background-color: transparent;
}

.preview-card:hover{
	background-color: #EEE;
}

.preview-card__preview{
	width: 100%;
}

.preview-card__preview--link img{
	width: 100%;
	height: auto;
	max-height: 300px;
	object-fit: cover;
	background-size: cover;
	background-position: 50%;
	border-radius: 2px 2px 0 0;
}

.preview-card__info{
	padding: 8px;
	overflow-x: hidden;
}

.preview-card__title{
	display: block;
	font-weight: bold;
	font-size: 1.2rem;
}

.preview-card__host{
	display: block;
	color: #333;
}
</style>
