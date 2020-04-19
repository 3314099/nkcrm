import firebase from 'firebase/app'

export default  {
  actions: {
    async fetchLeftMenuitems({commit}){
      try{
        let leftMenuitems = (await firebase.database().ref(`/admin/leftMenuitems`).once('value')).val() || {}
        const lmits = Object.keys(leftMenuitems).map(key=> ({...leftMenuitems[key]}) )
        // const acts = Object.keys(accounts).map(key=> ({...accounts[key],id:key}) )
        // accounts = acts.reverse()

        return lmits
      }catch(e){
      commit('setError', e)
      throw e
      }
    },
  }
}
