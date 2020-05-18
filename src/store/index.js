import Vue from 'vue'
import Vuex from 'vuex'
import LeftChangeButtons from '@/store/ChangeButtons/LeftChangeButtons.js'
import RightChangeButtons from '@/store/ChangeButtons/RightChangeButtons.js'
import SnackBar from '@/store/ChangeButtons/SnackBar.js'
import CopyToClipboard from '@/store/ChangeButtons/CopyToClipboard.js'
import VueClipboard from 'vue-clipboard2'
import auth from '@/store/auth.js'
import Account from '@/store/FinPlan/Account.js'
import Filters from '@/store/FinPlan/Filters.js'


Vue.use(Vuex)
Vue.use(VueClipboard)


export default new Vuex.Store({
	modules:{
		SnackBar,
		CopyToClipboard,
		LeftChangeButtons,
		RightChangeButtons,
    auth,
    Account,
    Filters
	},
	state: {
    error: null
	},
	mutations: {
    setError(state,error){

      console.log(error)
      state.error = error
    },
    clearError(state){
      state.error = null
    }
	},
  getters:{
    error: s => s.error
  }

})
