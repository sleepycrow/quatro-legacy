<template>
	<div
		ref="dropdownContainer"
		:class="containerClass + (this.horizAlign === 'right' ? ' dropdown--right': '')"
	>
		<button :class="btnClass" @click="toggleDropdown()">
			<span v-if="btnIcon.length > 0" class="material-icons" v-html="btnIcon" />
			<span v-if="btnText.length > 0" v-text="btnText" />
			<span v-if="showArrow" class="material-icons">arrow_drop_down</span>
		</button>

		<ul ref="dropdownContent" :class="menuClass">
			<slot />
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		btnClass: { type: String, default: 'btn btn--transparent btn--dropdown' },
		btnText: { type: String, default: '' },
		btnIcon: { type: String, default: '' },
		showArrow: { type: Boolean, default: false },

		containerClass: { type: String, default: 'dropdown' },

		menuClass: { type: String, default: 'dropdown__content' },
		horizAlign: { type: String, default: 'left' }, 
		vertAlign: { type: String, default: 'down' } //dummy, doesn't do anything yet
	},

	created(){
		document.addEventListener('click', this.onDocumentClick)
	},

	unmounted(){
		document.removeEventListener('click', this.onDocumentClick)
	},

	methods: {
		toggleDropdown(makeVisible = null){
			var visibleClass = 'dropdown__content--visible'

			if(makeVisible === null)
				makeVisible = !this.$refs.dropdownContent.classList.contains(visibleClass)
			
			if(makeVisible)
				this.$refs.dropdownContent.classList.add(visibleClass)
			else
				this.$refs.dropdownContent.classList.remove(visibleClass)
		},

		onDocumentClick(e){
			if(this.$refs.dropdownContainer.contains(e.target) && (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON'))
				return
			
			this.toggleDropdown(false)
		}
	}
}
</script>