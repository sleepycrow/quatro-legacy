/**
 * Reorder an array of posts to group threads together.
 * Works only in reverse-chronological order, refactor if needed.
 * @param {Array} timeline -- an array of status objects 
 * @returns An array of status objects and threads (arrays of status objects)
 */
export function reorderTimeline(timeline){
	var needed = []
	var found = {}
	var output_timeline = []

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
			let post_chain = [post]
			let last_post = post

			while(typeof(last_post.in_reply_to_id) === "string" && found.hasOwnProperty(last_post.in_reply_to_id)){
				last_post = found[last_post.in_reply_to_id]
				post_chain.splice(0, 0, last_post)
			}

			output_timeline.push(post_chain)

		}else{
			output_timeline.push(post)
		}
		/* eslint-enable  no-prototype-builtins */
	}

	return output_timeline
}