export default {
	state: {
		calendar: true,
		calculator: false,
		currency: false,
		dayCalc: false,
		creditCalc: false
	},
	mutations: {
		changeCalendar (state){
			state.calendar =  !state.calendar
			state.calculator =  false
			state.currency =  false
			state.dayCalc =  false
			state.creditCalc =  false
		},
		changeCalculator (state){
			state.calendar =  false
			state.calculator =  !state.calculator
			state.currency =  false
			state.dayCalc =  false
			state.creditCalc =  false
		},
		changeCurrency (state){
			state.calendar =  false
			state.calculator =  false
			state.currency =  !state.currency
			state.dayCalc =  false
			state.creditCalc =  false
		},
		changeDayCalc (state){
			state.calendar =  false
			state.calculator =  false
			state.currency =  false
			state.dayCalc =  !state.dayCalc
			state.creditCalc =  false
		},
		changeCreditCalc (state){
			state.calendar =  false
			state.calculator =  false
			state.currency =  false
			state.dayCalc =  false
			state.creditCalc =  !state.creditCalc
		}
	},
	getters: {
		computedCalendar (state) {
			return state.calendar
		},
		computedCalculator (state) {
			return state.calculator
		},
		computedCurrency (state) {
			return state.currency
		},
		computedDayCalc (state) {
			return state.dayCalc
		},
		computedCreditCalc (state) {
			return state.creditCalc
		},
	}
}
