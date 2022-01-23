<template>
	<div class="sidebar">
		<!-------------- User ID -------------->
		<section class="user-section">
			<!-- DEBUG: the v-if is a temporary thing, in the finished version we will likely want to switch layouts depending on login state, like on misskey -->
			<div v-if="$store.state.auth.loggedIn" class="sidebar-id"> 
				<div class="sidebar-id__avatar">
					<img
						:src="$store.state.auth.userInfo.avatar"
						:alt="$store.state.auth.userInfo.display_name"
						:title="$store.state.auth.userInfo.display_name"
					>
				</div>

				<div class="sidebar-id__info">
					<div class="sidebar-id__name">{{ $store.state.auth.userInfo.display_name }}</div>
					<div class="sidebar-id__username">@{{ $store.state.auth.userInfo.username }}</div>
				</div>

				<div class="sidebar-id__btn">
					<button class="btn icon-btn" @click="$store.dispatch('fetchUserInfo')">
						<span class="material-icons">arrow_drop_down</span>
					</button>
				</div>
			</div>
		</section>

		<!-------------- Navigation -------------->
		<nav>
			<ul>
				<li>
					<router-link class="nav__link" :class="(isOnTimelinePage ? 'nav__link--active' : '')" to="/">
						<span class="nav__icon material-icons">home</span>
						<span class="nav__label">{{ $t('menu.timelines') }}</span>
					</router-link>
				</li>

				<li>
					<router-link class="nav__link" active-class="nav__link--active" to="/helloworld">
						<span class="nav__icon material-icons">search</span>
						<span class="nav__label">{{ $t('menu.search') }}</span>
					</router-link>
				</li>

				<li>
					<router-link class="nav__link" active-class="nav__link--active" to="/helloworld">
						<span class="nav__icon material-icons">bookmarks</span>
						<span class="nav__label">{{ $t('menu.bookmarks') }}</span>
					</router-link>
				</li>

				<li>
					<router-link class="nav__link" active-class="nav__link--active" to="/helloworld">
						<span class="nav__icon material-icons">chat</span>
						<span class="nav__label">{{ $t('menu.chats') }}</span>
					</router-link>
				</li>

				<li>
					<router-link class="nav__link" active-class="nav__link--active" to="/helloworld">
						<span class="nav__icon material-icons">notifications</span>
						<span class="nav__label">{{ $t('menu.notifications') }}</span>
					</router-link>
				</li>
			</ul>
		</nav>

		<!-------------- Footer -------------->
		<footer>
			<!-- content goes here -->
		</footer>
	</div>
</template>

<script>
export default {
	computed: {
		isOnTimelinePage(){
			return this.$route.fullPath.includes('timelines')
		}
	}
}
</script>

<style>
.sidebar{
	position: fixed;
	top: 0;
	left: 0;
	width: var(--sidebar-width);
	height: 100vh;

	display: grid;
	grid-template-rows: 5rem auto 150px;
	overflow: hidden auto;

	background-color: #347FC4;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.75);

	color: #FFF;
}

.sidebar nav ul{
	display: block;
	width: 100%;

	padding: 0;
	list-style-type: none;
}

.sidebar nav li{
	display: block;
}

.sidebar nav li .nav__link{
	display: block;
	cursor: pointer;
	text-decoration: none;
	width: 100%;
	color: #FFF;
	overflow: hidden;
	padding: 4px 0;
	margin: 0;
	background-color: transparent;
	transition: background-color 0.25s;
}

.sidebar nav li .nav__link:hover{
	background-color: rgba(255, 255, 255, 0.25);
}

.sidebar nav li .nav__link--active{
	background-color: transparent;
}

.sidebar .nav__link--active .nav__icon{
	color: #FFF;
}

.sidebar .nav__link--active .nav__label{
	font-weight: bold;
}

.sidebar nav .nav__icon{
	text-align: center;
	width: 48px;
	line-height: 48px;
	color: #CCC;
}

.sidebar nav .nav__avatar{
	margin: 8px;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	line-height: 48px;
	vertical-align: middle;
}

.sidebar nav .nav__label{
	font-weight: normal;
	line-height: 48px;
}

.sidebar .separator{
	width: 100%;
	padding: 0;
	margin: 4px 0;
	border-bottom: 1px solid #CCC;
}

.sidebar-id{
	height: 4rem;
	max-height: 4rem;
	width: calc(100% - 8px);
	max-width: calc(100% - 8px);
	
	position: relative;
	display: table;
	table-layout: fixed;
	border-spacing: 6px;

	background-color: rgba(255, 255, 255, 0.15);
	border-radius: 8px;
	margin: 16px 4px;
	overflow: hidden;
	transition: background-color 0.2s;
	cursor: pointer;
}

.sidebar-id:hover{
	background-color: rgba(255, 255, 255, 0.3);
}

.sidebar-id__avatar{
	display: table-cell;
	width: 3rem;
	min-width: 3rem;
	max-width: 3rem;
	vertical-align: middle;
}

.sidebar-id__avatar img{
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	vertical-align: middle;
}

.sidebar-id__info{
	display: table-cell;
	vertical-align: middle;
	overflow: hidden;
}

.sidebar-id__info div{
	margin: 4px 0;
}

.sidebar-id__name{
	height: 1rem;
	max-height: 1rem;
	overflow: hidden;
	font-weight: bold;
	color: #FFF;
}

.sidebar-id__username{
	height: 1rem;
	max-height: 1rem;
	overflow: hidden;
	font-weight: normal;
	color: #EEE;
}

.sidebar-id__btn{
	display: table-cell;
	width: var(--icon-button-size);
	min-width: var(--icon-button-size);
	max-width: var(--icon-button-size);
	vertical-align: middle;
}

.sidebar-id__btn button{
	vertical-align: middle;
}
</style>
