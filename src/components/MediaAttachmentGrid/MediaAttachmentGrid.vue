<template>
	<!-- TODO: replace me with actual attachment grid with a lightbox -->
	<p v-if="sensitive" style="color: red; text-align: center; font-weight: bold;">sensitive media!!</p>

	<div class="status__attachments" :class="attachments.length > 1 ? 'attachment-grid' : 'single-attachment'">
		<a v-for="attachment in attachments" :key="attachment.id" :href="attachment.remote_url ? attachment.remote_url : attachment.text_url">
			<img
				v-if="attachment.type === 'image'"
				:src="attachment.preview_url"
				:alt="attachment.description"
				:title="attachment.description"
			>

			<video
				v-if="attachment.type === 'video'"
				:src="attachment.text_url"
				controls
				loop
			>
				<p>no video</p>
			</video>

			<audio
				v-if="attachment.type === 'audio'"
				:src="attachment.text_url"
				controls
			>
				<p>no audio</p>
			</audio>
		</a>
	</div>
</template>


<script>
export default {
	props: {
		attachments: { type: Array, required: true },
		sensitive: { type: Boolean, default: false }
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
	width: calc(50% - 8px);
	margin: 4px;
	flex-shrink: 0;
	flex-grow: 1;
}

.attachment-grid img{
	height: 250px;
	width: 100%;
	object-fit: cover;
}

.attachment-grid video, audio{
	height: 250px;
	width: 100%;
	max-width: 100%;
}

/* Single attachment */
.single-attachment{
	text-align: center;
}

.single-attachment img{
	width: 100%;
	max-height: 400px;
	object-fit: cover;
	height: auto;
}

.single-attachment video, audio{
	width: 100%;
	max-width: 100%;
	max-height: 400px;
}

/* Make the video and audio players look presentable */
.status__attachments video{
	background-color: #000;
}

.status__attachments audio{
	background-color: green;
	/*
	The green is just a placeholder.
	If we want to keep/build off of this instead of starting from scratch, we should give
	audio elements some kind of background image.
	*/
}
</style>
