<template>
  	<div class="sidebar">
		<!-- -->
		<section class="user-section">
			<div class="sidebar-id">
				<div class="sidebar-id__avatar">
					<img src="../../assets/avatar.jpg" alt="a sleepy crow">
				</div>

				<div class="sidebar-id__info">
					<div class="sidebar-id__name">a sleepy crow</div>
					<div class="sidebar-id__username">@sleepycrow@gamedev.mastodon.social</div>
				</div>

				<div class="sidebar-id__btn">
					<button class="btn icon-btn">
						<span class="material-icons">arrow_drop_down</span>
					</button>
				</div>
			</div>
		</section>

		<!-- -->
		<nav>
			<ul>
				<li><router-link class="nav__link" active-class="active" to="/">
					<span class="nav__icon material-icons">home</span>
					<span class="nav__label">Explore</span>
				</router-link></li>

				<li><router-link class="nav__link" active-class="active" to="/search">
					<span class="nav__icon material-icons">search</span>
					<span class="nav__label">Search</span>
				</router-link></li>

				<li><router-link class="nav__link" active-class="active" to="/helloworld">
					<span class="nav__icon material-icons">star</span>
					<span class="nav__label">Hello World!</span>
				</router-link></li>
			</ul>
		</nav>

		<!-- -->
		<footer>

		</footer>
  	</div>
</template>

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

.sidebar nav li .active{
	background-color: transparent;
}

.sidebar .active .nav__icon{
	color: #FFF;
}

.sidebar .active .nav__label{
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
	width: calc(100% - 8px);
	max-width: calc(100% - 8px);
	
	position: relative;
	display: table;
	table-layout: fixed;
	border-spacing: 4px;

	background-color: rgba(255, 255, 255, 0.15);
	border-radius: 8px;
	margin: 16px 4px;
	overflow-x: hidden;
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

.sidebar-id__name{
	font-weight: bold;
	color: #FFF;
}

.sidebar-id__username{
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
