<script setup>
import { getDateText, getFuzzyDate } from '../../lib/time_utils'
</script>

<template>
	<time class="fuzzy-date" :datetime="datetime" :title="dateText" @click="toggleDateType">
		{{ ( (fuzzyDate !== null && showFuzzy) ? $t(...fuzzyDate) : dateText ) }}
	</time>
</template>

<script>
export default {
	props: {
		datetime: { type: String, required: true },
		autoupdate: { type: Number, required: false, default: -1 }
	},

	data: () => ({
		showFuzzy: true,
		interval: null,
		fuzzyDate: ''
	}),

	computed: {
		dateText(){
			return getDateText(this.datetime)
		}
	},

	created(){
		this.refreshSelf()

		if(this.autoupdate){
			let date = new Date(this.datetime)
			let now = new Date()

			// for efficiency, let's only update posts if they're less than 2 hours old. it shouldn't be too noticable lmao
			if(now - date < 1000*60*60*2)
				this.interval = window.setInterval(this.refreshSelf, this.autoupdate*1000)
		}
	},

	unmounted(){
		if(this.interval !== null)
			window.clearInterval(this.interval)
	},

	methods: {
		refreshSelf(){
			this.fuzzyDate = getFuzzyDate(this.datetime)
		},

		toggleDateType(){
			this.showFuzzy = !this.showFuzzy
		}
	}
}
</script>

<style>
.fuzzy-date{
	cursor: pointer;
}
</style>