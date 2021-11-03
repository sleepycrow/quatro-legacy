/**
 * Contains various utility functions, mostly for processing text.
 */


/**
 * Converts special characters (characters with meaning in HTML) into harmless HTML entities
 * Shamelessly stolen wholesale from https://github.com/teppeis/htmlspecialchars/
 * @param {string} text
 * @returns {string}
 */ 
export function htmlSpecialChars(text){
	if(text == null) return null;

	return String(text).replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll('\'', '&#039;')
}


/**
 * Substitutes custom emoji shortcodes (:shortcode:) in text for the custom emoji themselves as <img> tags
 * @param {string} text
 * @param {Object[]} emoji - An array of mastodon-like "Emoji" objects (https://docs.joinmastodon.org/entities/emoji/)
 * @returns {string}
 */
export function htmlizeCustomEmoji(text, emoji){
	for(var i = 0; i < emoji.length; i++){
		text = text.replaceAll(
			`:${emoji[i].shortcode}:`,
			'<img class="emoji" src="'+encodeURI(emoji[i].url)+'" alt=":'+emoji[i].shortcode+':">'
		)
	}

	return text
}