import {createStore, createLogger} from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

console.log(debug)
export default createStore({
	strict: debug,
	plugins: debug ? [createLogger()] : []
})