/**
 * Group threads in a timeline together.
 * Works only in reverse-chronological order, refactor if needed.
 * @param {Array} timeline -- an array of status objects 
 * @returns An array of status objects, possibly with a new property - ancestors (array or status objects)
 */
export function groupThreads(timeline, hideShown = true){
	var needed = []
	var found = {}
	var outputTimeline = []

	// Loop 1: Find replies in the timeline
	for(let i = 0; i < timeline.length; i++){
		let post = timeline[i]

		if(typeof(post.in_reply_to_id) === "string" && post.in_reply_to_id.length !== "")
			needed.push(post.in_reply_to_id)
		
		if(needed.includes(post.id))
			found[post.id] = post
	}

	// Loop 2: Reorder the timeline
	for(let i = 0; i < timeline.length; i++){
		let post = timeline[i]

		if(needed.includes(post.id)) continue;

		/* eslint-disable  no-prototype-builtins */
		if(typeof(post.in_reply_to_id) === "string" && found.hasOwnProperty(post.in_reply_to_id)){
			let ancestors = []
			let lastPost = post

			while(typeof(lastPost.in_reply_to_id) === "string" && found.hasOwnProperty(lastPost.in_reply_to_id)){
				lastPost = found[lastPost.in_reply_to_id]
				ancestors.splice(0, 0, lastPost)

				if(hideShown) delete found[lastPost.id]
			}

			post.ancestors = ancestors
		}
		/* eslint-enable  no-prototype-builtins */

		outputTimeline.push(post)
	}

	return outputTimeline
}