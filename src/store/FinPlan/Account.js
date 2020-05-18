import firebase from 'firebase/app'
import {eventEmitter} from '@/main'
import { validationMixin } from 'vuelidate'
// import {required} from 'vuelidate/lib/validators'


export default  {
  mixins: [validationMixin],
  methods:{
    // compareValues(key, order = 'asc') {
    //   return function innerSort(a, b) {
    //     if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
    //       // property doesn't exist on either object
    //       return 0;
    //     }

    //     const varA = (typeof a[key] === 'string')
    //       ? a[key].toUpperCase() : a[key];
    //     const varB = (typeof b[key] === 'string')
    //       ? b[key].toUpperCase() : b[key];

    //     let comparison = 0;
    //     if (varA > varB) {
    //       comparison = 1;
    //     } else if (varA < varB) {
    //       comparison = -1;
    //     }
    //     return (
    //       (order === 'desc') ? (comparison * -1) : comparison
    //     );
    //   };
    // },
    ACCOUNTJSleftMenuBtnName(leftMenuButton,leftMenuitems){
      let btnName = ''
      let parentText = ''
      let parentColor = ''
      let btnColor = ''
      for (var i = leftMenuitems.length - 1; i >= 0; --i) {
        if (leftMenuButton === this.params.leftMenuitems[i].btnId){
          if(leftMenuitems[i].parentText != ''){
            parentText = leftMenuitems[i].parentText
          }
          parentColor = leftMenuitems[i].parentBackground
          btnName = leftMenuitems[i].text
          btnColor = leftMenuitems[i].background
        }
      }
      return {parentText: parentText, btnName: btnName, parentColor:  parentColor, color: btnColor}
    },
    toChangeCheck(check,item){
     eventEmitter.$emit('checked', check, item)
    //  eventEmitter.$emit('changeCheckedAccountArray', check, item)
    // console.log(check,item.id)
    },

    openBanner(banner, account){
        if(banner === ''){
          eventEmitter.$emit('draggable', true)
        }else{
          eventEmitter.$emit('draggable', false)
        }
        eventEmitter.$emit('openBanner', banner,account)
    },
    changeLoading(val){
      eventEmitter.$emit('changeLoading', val)
    },
    toChangeCheckShowAccounts(bool,showAccounts){
      eventEmitter.$emit('changeCheckShowAccounts', bool,showAccounts)
    },
    async toChangeCheckAccount(bool,accountId){
      eventEmitter.$emit('changeCheckAccount', bool, accountId)
    },
  },
  actions: {
    async fetchFilter1({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')

        let types = (await firebase.database().ref(`/users/${uid}/filter1`).once('value')).val() || {}
        return (Object.keys(types).map(key=> ({...types[key],id:key}) ).sort())
      }catch(e){
      commit('setError', e)
      throw e
      }

    },

    async fetchAccounts({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')

        let accounts = (await firebase.database().ref(`/users/${uid}/accounts`).once('value')).val() || {}
        // const acts = []
        // Object.keys(accounts).forEach(key => {
        //   acts.push({
        //     categoryTypeAccount: accounts[key].categoryTypeAccount,
        //     categoryAccount: accounts[key].categoryAccount,
        //     title: accounts[key].title,
        //     type: accounts[key].type,
        //     bill: accounts[key].bill,
        //     currancy: accounts[key].currancy,
        //     comments: accounts[key].comments,
        //     id: key
        //   })
        // })
        // return acts
        const acts = Object.keys(accounts).map(key=> ({...accounts[key],id:key}) )
        accounts = acts.reverse()

        return accounts
      }catch(e){
      commit('setError', e)
      throw e
      }
    },
    async fetchCategories({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')
        let categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        const cats = Object.keys(categories).map(key=> ({...categories[key],id:key}) )
        return cats
      }catch(e){
      commit('setError', e)
      throw e
      }
    },

    async fetchTargets({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')
        let targets = (await firebase.database().ref(`/users/${uid}/targets`).once('value')).val() || {}
        const targs = Object.keys(targets).map(key=> ({...targets[key],id:key}) )
        return targs
      }catch(e){
      commit('setError', e)
      throw e
      }
    },
    async fetchTags({commit,dispatch}){
      try{
        const uid = await dispatch('getUid')
        let tags = (await firebase.database().ref(`/users/${uid}/tags`).once('value')).val() || {}
        const tgs = Object.keys(tags).map(key=> ({...tags[key],id:key}) )

        // tags = tgs.sort(this.compareValues('title')); // - по возрастанию
        //tags = tgs.sort(compareValues('title', 'desc')); // - по убыванию


        return tgs
      }catch(e){
      commit('setError', e)
      throw e
      }
    },
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
    async createAccount({commit,dispatch}, {
      categoryTypeAccount,
      color,
      title,
      checked,
      currancy,
      dateCreate,
      comments,
      }){
        try{
          const uid = await dispatch('getUid')
          const account = await firebase.database().ref(`/users/${uid}/accounts`).push({
            categoryTypeAccount,
            color,
            title,
            checked,
            currancy,
            dateCreate,
            comments,
            })
            return{
              id:account.key,
              categoryTypeAccount,
              color,
              title,
              checked,
              currancy,
              dateCreate,
              comments,
            }
        }catch(e){
        commit('setError', e)
        throw e
        }
    },
    async createTarget({commit,dispatch}, {
      title,
      comment,
      type,
      color,
      sectionId,
      groupId,
      expenses,
      entrances,
      }){
        try{
          const uid = await dispatch('getUid')
          const target = await firebase.database().ref(`/users/${uid}/targets`).push({
            title,
            comment,
            type,
            color,
            sectionId,
            groupId,
            expenses,
            entrances,
            })
            return{
              id:target.key,
              title,
              comment,
              type,
              color,
              sectionId,
              groupId,
              expenses,
              entrances,
              }
        }catch(e){
        commit('setError', e)
        throw e
        }
    },


    async editTarget({commit,dispatch}, {
      id,
      title,
      comment,
      type,
      color,
      sectionId,
      groupId,
      expenses,
      entrances,
      }){
      try{
        // console.log(
        //   id,
        //   title,
        //   comment,
        //   type,
        //   color,
        //   sectionId,
        //   groupId,
        //   expenses,
        //   entrances)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/targets`).child(id).update({
          id,
          title,
          comment,
          type,
          color,
          sectionId,
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
            sectionId,
            groupId,
            expenses,
            entrances,
          }

      }catch(e){
      commit('setError', e)
      throw e
      }
    },
    async createCategory({commit,dispatch}, {
      title,
      comment,
      type,
      color,
      filterId,
      categoryId,
      }){
        try{
          const uid = await dispatch('getUid')
          const category = await firebase.database().ref(`/users/${uid}/categories`).push({
            title,
            comment,
            type,
            color,
            filterId,
            categoryId,
            })
            return{
              id:category.key,
              title,
              comment,
              type,
              color,
              filterId,
              categoryId,
            }
        }catch(e){
        commit('setError', e)
        throw e
        }
    },
    async createTag({commit,dispatch}, {
      title,
      comment,
      }){
        try{
          const uid = await dispatch('getUid')
          const tag = await firebase.database().ref(`/users/${uid}/tags`).push({
            title,
            comment,
            })
            return{
              id:tag.key,
              title,
              comment,
            }
        }catch(e){
        commit('setError', e)
        throw e
        }
    },
    async changeCheckedAccountsArray({commit,dispatch},
      accounts
    ){
      let acts = {}
      for (var i = accounts.length - 1; i >= 0; --i) {
        acts[accounts[i].id] = accounts[i]
        // delete acts[accounts[i].id].id;
      }

        try{
          // accounts.forEach(function(elem) {
          //   acts[elem.id] = elem;
          //   delete acts[elem.id].id;
          // });
          // console.log(acts);

          const uid = await dispatch('getUid')
          accounts = acts
            await firebase.database().ref(`/users/${uid}`).update({
              accounts,
            })
            return
        }catch(e){
          commit('setError', e)
          throw e
          }
    },
    async changeCheckedAccount({commit,dispatch},{
      bool,
      accountId
    }){
        try{
          const uid = await dispatch('getUid')
          await firebase.database().ref(`/users/${uid}/accounts`).child(accountId).update({
              checked: bool
            })
          return
        }catch(e){
          commit('setError', e)
          throw e
          }
    },
    async pushLMBArray({commit},{
      leftMenuitems,
      }){
        try{
          // const uid = await dispatch('getUid')

            await firebase.database().ref(`admin`).update({
              leftMenuitems,
            })
          return{
            leftMenuitems
          }
        }catch(e){
          commit('setError', e)
          throw e
          }
    },
    async editAccount({commit,dispatch}, {
      id,
      categoryTypeAccount,
      color,
      title,
      checked,
      currancy,
      dateCreate,
      comments,
    }){
      try{
        const uid = await dispatch('getUid')

        await firebase.database().ref(`/users/${uid}/accounts`).child(id).update({
          categoryTypeAccount,
          color,
          title,
          checked,
          currancy,
          dateCreate,
          comments,
          })
          return{
            id,
            categoryTypeAccount,
            color,
            title,
            checked,
            currancy,
            dateCreate,
            comments,
          }

      }catch(e){
      commit('setError', e)
      throw e
      }
  },
  async editTag({commit,dispatch}, {
    id,
    title,
    comment,
    }){
    try{
      const uid = await dispatch('getUid')

      await firebase.database().ref(`/users/${uid}/tags`).child(id).update({
        id,
        title,
        comment,
        })
        return{
        id,
        title,
        comment,
        }

    }catch(e){
    commit('setError', e)
    throw e
    }
},
    async removeAccount({commit,dispatch},id){
      try{
        const uid = await dispatch('getUid')
        // console.log(uid,id)

        await firebase.database().ref(`/users/${uid}/accounts/${id}`).remove()
      }catch(e){
      commit('setError', e)
      throw e
      }
    },
    async removeTag({commit,dispatch},id){
      try{
        const uid = await dispatch('getUid')
        // console.log(uid,id)

        await firebase.database().ref(`/users/${uid}/tags/${id}`).remove()
      }catch(e){
      commit('setError', e)
      throw e
      }
    },

    async removeTarget({commit,dispatch},id){
      try{
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/targets/${id}`).remove()
      }catch(e){
      commit('setError', e)
      throw e
      }
    }
  }
}

