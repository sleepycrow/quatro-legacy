import { createStore, createLogger } from 'vuex'

import timelinesModule from './modules/timelines'
import instanceModule from './modules/instance'
import interfaceModule from './modules/interface'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
	strict: debug,
	plugins: debug ? [createLogger()] : [],

	modules: {
		timelines: timelinesModule,
		instance: instanceModule,
		interface: interfaceModule
	}
}) 