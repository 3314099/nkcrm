export default {
	state: {
		snackColor: 'red lighten-1',
		copyToClipboardText: 'Действий не было',
		copyToClipboarded: false,
		timeout: 1000,
		top: true,
		upperCase: false,
		lineText: false,
		visibility: true,
    leftMenuMode: 'targets'
	},
	mutations: {
		changeUpperCase (state){
			state.upperCase =  !state.upperCase
		},
		changeLineText (state){
			state.lineText =  !state.lineText
		},
		changeVisibility (state){
			state.visibility =  !state.visibility
		},
	},
	actions: {
	},
	getters: {
		computedUpperCase (state) {
			return state.upperCase
		},
		computedLineText (state) {
			return state.lineText
		},
		computedVisibility (state) {
			return state.visibility
		}
    },
}
