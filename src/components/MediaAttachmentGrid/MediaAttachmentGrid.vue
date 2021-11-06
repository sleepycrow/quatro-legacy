<template>
	<!-- TODO: replace me with actual attachment grid with a lightbox -->
	<div :class="attachments.length > 1 ? 'attachment-grid' : 'single-attachment'">
		<a v-for="attachment in attachments" :key="attachment.id" :href="attachment.remote_url ? attachment.remote_url : attachment.text_url">
			<img
				:src="attachment.preview_url"
				:alt="attachment.description"
				:title="attachment.description"
			>
		</a>
	</div>
</template>


<script>
export default {
	props: {
		attachments: { type: Array, required: true }
	}
}
</script>

<style>
/* Media Attachment Grid */
.attachment-grid{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.attachment-grid a{
	margin: 4px;
}

.attachment-grid img{
	height: 250px;
	width: 250px;
	object-fit: cover;
	flex-shrink: 0;
	flex-grow: 0;
}

/* Single attachment */
.single-attachment{
	text-align: center;
}

.single-attachment img{
	width: 100%;
	max-height: 600px;
	object-fit: cover;
	height: auto;
}
</style>
