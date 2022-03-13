<script setup>
import DropdownMenu from '../DropdownMenu/DropdownMenu.vue'
</script>

<template>
	<header class="flex-header">
		<div class="flex-header__title">
			<!-- Feed Selector Dropdown -->
			<DropdownMenu
				v-if="shouldHaveDropdown"
				btn-class="flex-header__dropdown__title"
				:btn-text="$t('timelines.'+selectedTl.id)"
				:show-arrow="true"
			>
				<li v-for="tl in timelines" :key="tl.id">
					<router-link :to="tl.target">
						{{ $t('timelines.'+tl.id) }}
					</router-link>
				</li>
			</DropdownMenu>

			<!-- Normal header -->
			<h1 v-else>
				<slot />
			</h1>
		</div>

		<div class="flex-header__buttons">
			<button class="btn icon-btn">
				<span class="material-icons">tune</span>
			</button>
		</div>
	</header>
</template>

<script>
export default {

	components: { DropdownMenu },

	props: {
		timelines: { type: Array, required: false, default: ()=>([]) },
		selected: { type: String, default: '' }
	},

	emits: ['settingsChange'],

	data: () => ({
		selectedTl: null
	}),

	computed: {
		shouldHaveDropdown(){
			return (this.$props.timelines.length > 0)
		}
	},

	created(){
		if(this.shouldHaveDropdown){
			let tlId = (this.$props.selected.length > 0 ? this.$props.selected : this.$props.timelines[0].id)
			for(let tl of this.$props.timelines){
				if(tl.id == tlId){
					this.selectedTl = tl
					break
				}
			}
		}
	}

}
</script>