<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const count = ref(0)

const stores = {
	auth: useAuthStore()
}
</script>

<template>
	<div class="page-content">
		<div style="text-align: center">
			<img src="../../assets/logo.png" alt="vue">
		</div>

		<h1>Hello, World!</h1>

		<p>
			Recommended IDE setup:
			<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
			+
			<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
		</p>

		<p>
			<a href="https://vitejs.dev/guide/features.html" target="_blank">
				Vite Documentation
			</a>
			|
			<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
		</p>

		<button type="button" @click="count++">count is: {{ count }}</button>

		<form v-if="!stores.auth.loggedIn" @submit="login">
			<h3>Login</h3>

			<input ref="usr" type="text" placeholder="Username"><br>
			<input ref="pwd" type="password" placeholder="Password"><br>
			<button>Log in</button>
		</form>

		<form v-if="stores.auth.loggedIn" @submit="logout">
			<h3>Logout</h3>

			<button>Log out</button>
		</form>

		<p>
			Edit
			<code>components/HelloWorld.vue</code> to test hot module replacement.
			okej dd
		</p>
	</div>
</template>

<script>
export default {
	methods: {
		login(e){
			e.preventDefault()
			this.stores.auth.loginUser(this.$refs.usr.value, this.$refs.pwd.value)
				.then(() => {
					this.$router.push('/')
				})

			this.$refs.usr.value = ''
			this.$refs.pwd.value = ''
		},

		logout(e){
			e.preventDefault()
			this.stores.auth.logoutUser()
		}
	}
}
</script>

<style scoped>
a {
	color: #42b983;
}

form{
	border: 1px solid #000;
	padding: 8px;
	margin: 8px 0;
}

form input,
form button{
	margin: 4px 0;
}
</style>
