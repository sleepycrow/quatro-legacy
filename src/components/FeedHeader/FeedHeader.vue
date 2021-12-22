<template>
	<header class="flex-header">
		<div class="flex-header__title">
			<!-- Feed Selector Dropdown -->
			<div v-if="shouldHaveDropdown" ref="dropdownContainer" class="flex-header__dropdown">
				<button class="flex-header__dropdown__title" @click="toggleFeedDropdown()">
					{{ $t('timelines.'+selectedTl.id) }}
					<span class="material-icons">arrow_drop_down</span>
				</button>

				<ul ref="selectorDropdown" class="flex-header__dropdown__content">
					<li v-for="tl in timelines" :key="tl.id">
						<router-link :to="tl.target">
							{{ $t('timelines.'+tl.id) }}
						</router-link>
					</li>
				</ul>
			</div>

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

		document.addEventListener('click', this.onDocumentClick)
	},

	unmounted(){
		document.removeEventListener('click', this.onDocumentClick)
	},

	methods: {
		toggleFeedDropdown(makeVisible = null){
			var visibleClass = 'flex-header__dropdown__content--visible'

			if(makeVisible === null)
				makeVisible = !this.$refs.selectorDropdown.classList.contains(visibleClass)
			
			if(makeVisible)
				this.$refs.selectorDropdown.classList.add(visibleClass)
			else
				this.$refs.selectorDropdown.classList.remove(visibleClass)
		},

		onDocumentClick(e){
			if(this.shouldHaveDropdown){
				if(this.$refs.dropdownContainer.contains(e.target))
					return
			
				this.toggleFeedDropdown(false)
			}
		}
	}

}
</script>