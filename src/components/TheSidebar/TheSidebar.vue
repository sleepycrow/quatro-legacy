<script setup>
import { useAuthStore } from "../../stores/auth";
import { useInstanceStore } from "../../stores/instance"
import { useNotifsStore } from "../../stores/notifs";

const stores = {
	auth: useAuthStore(),
	notifs: useNotifsStore(),
	instance: useInstanceStore()
}
</script>

<template>
	<div class="sidebar">
		<!-------------- User ID -------------->
		<section class="user-section">
			<div class="sidebar-id"> 
				<div class="sidebar-id__avatar">
					<img
						:src="stores.auth.userInfo.avatar"
						:alt="stores.auth.userInfo.display_name"
						:title="stores.auth.userInfo.display_name"
					>
				</div>

				<div class="sidebar-id__info">
					<div class="sidebar-id__name">{{ stores.auth.userInfo.display_name }}</div>
					<div class="sidebar-id__username">@{{ stores.auth.userInfo.username }}</div>
				</div>

				<div class="sidebar-id__btn">
					<button class="btn icon-btn" @click="stores.auth.fetchUserInfo()">
						<span class="material-icons">arrow_drop_down</span>
					</button>
				</div>
			</div>
		</section>

		<!-------------- Navigation -------------->
		<nav>
			<ul class="sidebar__nav">
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
					<router-link class="nav__link" active-class="nav__link--active" to="/bookmarks">
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
					<router-link class="nav__link" active-class="nav__link--active" to="/notifications">
						<span class="nav__icon material-icons">notifications</span>
						<span class="nav__label">{{ $t('menu.notifications') }}</span>
						<sup v-if="stores.notifs.unread > 0" class="nav__label-badge">{{ stores.notifs.unread }}</sup>
					</router-link>
				</li>
			</ul>
		</nav>

		<!-------------- Footer -------------->
		<footer>
			<!-- TODO: make this take the user to an instance info page, like in the old misskey layout -->
			<img src="../../assets/logo.png" :alt="stores.instance.nodeName" :title="stores.instance.nodeName">
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
@import 'sidebar.css';

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
