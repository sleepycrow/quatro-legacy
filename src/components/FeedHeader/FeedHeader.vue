<template>
	<header class="flex-header">
		<div class="flex-header__title">
			<div ref="dropdownContainer" class="flex-header__dropdown">
				<button class="flex-header__dropdown__title" @click="toggleFeedDropdown()">
					{{ selectedTl.name }}
					<span class="material-icons">arrow_drop_down</span>
				</button>

				<ul ref="selectorDropdown" class="flex-header__dropdown__content">
					<li v-for="tl in timelines" :key="tl.id" @click="onTimelineSelect(tl.id)">
						{{ tl.name }}
					</li>
				</ul>
			</div>
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
		timelines: { type: Array, required: true }
	},

	emits: ['timelineChange', 'settingsChange'],

	data: () => ({
		selectedTl: null
	}),

	created(){
		let tlId = (this.$props.selected ? this.$props.selected : this.$props.timelines[0].id)
		this.selectTl(tlId)

		document.addEventListener('click', this.onDocumentClick)
	},

	unmounted(){
		document.removeEventListener('click', this.onDocumentClick)
	},

	methods: {
		selectTl(tlId){
			if(typeof(tlId) !== 'string') return

			for(let tl of this.$props.timelines){
				if(tl.id == tlId){
					this.selectedTl = tl
					this.$emit('timelineChange', this.selectedTl.id)
					return
				}
			}
		},

		onTimelineSelect(tlId){
			this.toggleFeedDropdown(false)
			this.selectTl(tlId)
		},

		toggleFeedDropdown(makeVisible = null){
			var visibleClass = 'flex-header__dropdown__content--visible'

			if(makeVisible === null) makeVisible = !this.$refs.selectorDropdown.classList.contains(visibleClass)
			
			if(makeVisible) this.$refs.selectorDropdown.classList.add(visibleClass)
			else this.$refs.selectorDropdown.classList.remove(visibleClass)
		},

		onDocumentClick(e){
			if(this.hidden || this.$refs.dropdownContainer.contains(e.target)) return
			this.toggleFeedDropdown(false)
		}
	}

}
</script>