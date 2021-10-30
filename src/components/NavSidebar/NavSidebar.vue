<template>
  	<div class="sidebar">
		<!-- -->
		<section class="user-section">

		</section>

		<!-- -->
		<nav>
			<ul>
				<li><router-link class="nav__link" to="/">
					<span class="nav__icon material-icons">home</span>
					<span class="nav__label">Explore</span>
				</router-link></li>

				<li><router-link class="nav__link" to="/search">
					<span class="nav__icon material-icons">search</span>
					<span class="nav__label">Search</span>
				</router-link></li>

				<li><router-link class="nav__link" to="/helloworld">
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
	grid-template-rows: 150px auto 150px;
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

.sidebar nav li .nav__link:hover,
.sidebar nav li .active{
	background-color: rgba(255, 255, 255, 0.25);
}

.sidebar nav .nav__icon{
	text-align: center;
	width: 48px;
	line-height: 48px;
	color: var(--black-400)
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
	border-bottom: 1px solid var(--black-700);
}
</style>
