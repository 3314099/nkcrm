import firebase from "firebase";
export default {
  state:{
    selectedFiltersGroupId: '',
    filters:[]
  },
  actions:{
    async fetchFilters({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')
        let filters = (await firebase.database().ref(`/users/${uid}/filters`).once('value')).val() || {}
        let fils = Object.keys(filters).map(key=> ({...filters[key],id:key}) )
        // fils = this.sortObjectsArray(fils, 'title')
        commit('updateFilters', fils)
      }catch(e){
        commit('setError', e)
        throw e
      }
    },
    async createFilter({commit,dispatch}, {
      title,
      comment,
      type,
      color,
      groupId,
      expenses,
      entrances,
    }){
      try{
        const uid = await dispatch('getUid')
        const filter = await firebase.database().ref(`/users/${uid}/filters`).push({
          title,
          comment,
          type,
          color,
          groupId,
          expenses,
          entrances,
        })
        return{
          id:filter.key,
          title,
          comment,
          type,
          color,
          groupId,
          expenses,
          entrances,
        }
      }catch(e){
        commit('setError', e)
        throw e
      }
    },
    async editFilter({commit,dispatch}, {
      id,
      title,
      comment,
      type,
      color,
      groupId,
      expenses,
      entrances,
    }){
      try{
        const uid = await dispatch('getUid')

        await firebase.database().ref(`/users/${uid}/filters`).child(id).update({
          id,
          title,
          comment,
          type,
          color,
          groupId,
          expenses,
          entrances,
        })
        return{
          id,
          title,
          comment,
          type,
          color,
          groupId,
          expenses,
          entrances,
        }

      }catch(e){
        commit('setError', e)
        throw e
      }
    },
    async removeFilter({commit,dispatch},id){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/filters/${id}`).remove()
      }catch(e){
        commit('setError', e)
        throw e
      }
    },
    updateFilters ({commit}, filters){
      commit('updateFilters', filters)
    },
    selectedFiltersGroupId ({commit}, id){
      commit('selectedFiltersGroupId', id)
    },
  },
  mutations:{
    updateFilters(state, filters){
      state.filters = filters
    },
    selectedFiltersGroupId(state, id){
      state.selectedFiltersGroupId = id
    }
  },
  getters:{
    filters (state) {
      return state.filters
    },
    selectedFiltersGroupId (state) {
      return state.selectedFiltersGroupId
    },
  }
}
