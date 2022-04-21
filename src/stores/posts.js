import { defineStore } from "pinia"
import { assignIn } from 'lodash'


export const usePostsStore = defineStore('posts', {
	state: () => ({
		posts: {}
	}),

	actions: {
		importPosts(posts = []){
			for(let post of posts){
				if(typeof post !== 'object')
					continue
				
				post.deleted = false // TODO: m,ake this do a th ing pls pls plsd pls pls pls pls

				if(post.reblog != null && typeof post.reblog === 'object'){
					posts.push(post.reblog)
					post.reblog = post.reblog.id
				}
				
				if(this.posts[post.id])
					assignIn(this.posts[post.id], post)
				else
					this.posts[post.id] = post
			}
		},

		getPost(id = ''){
			if(!this.posts.hasOwnProperty(id) || this.posts[id].deleted)
				return null
			
			let post = this.posts[id]

			if(typeof post.reblog === "string")
				post.reblog = this.getPost(post.reblog)
			
			return post
		}
	}
})