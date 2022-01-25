<template>
	<div class="loading-overlay">
		<img src="../../assets/logo.png" alt="Loading..." title="Loading...">
	</div>
</template>

<style>
.loading-overlay{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100vh;

	background-color: #FFF;

	display: flex;
	justify-content: center;
	align-items: center;
}

.loading-overlay img{
	display: block;
	height: 128px;
	width: auto;
	animation: loading-overlay__anim 2s linear infinite;
}

@keyframes loading-overlay__anim {
	0% { opacity: 1; }
	50% { opacity: 0; }
	100% { opacity: 1; }
}
</style>
