<template>
  <div>
    <v-card
    outlined
    >
    <Charts :checkedAccountArray="checkedAccountArray"/>
    {{checkedAccountArray.title}}
    <filtersMenu/>
    <ListMenu
    v-if="banner === ''"
    :loading="loading"
    />
    <addAccount 
    v-if="banner==='toCreateAccountBanner'" 
    :typesAccountList="typesAccountList"
    :mode="'add'"
    />
    <AccountTable
    :key="accounts.length + Counter"
    :accounts="accounts" />

    
    </v-card>
  </div>
</template>
<script>
import {eventEmitter} from '@/main'
import Account from '@/store/FinPlan/Account.js'
import Charts from '@/pages/FinPlan/Purse/Charts'
import filtersMenu from '@/pages/FinPlan/Purse/filtersMenu'
import ListMenu from '@/pages/FinPlan/Purse/ListMenu'
import addAccount from '@/pages/FinPlan/Purse/addAccount'
import AccountTable from '@/pages/FinPlan/Purse/AccountTable'

// import Baner from '@/pages/FinPlan/Purse/Baner'
// import addAccount from '@/pages/FinPlan/Purse/addAccount'


export default {
  mixins:[Account],
  components: {
    Charts,
    filtersMenu,
    ListMenu,
    addAccount,
    AccountTable
  },
  data:()=>({
    baseCategoty: 'baseFond',
    category: 'purse',
    banner: '',
    accounts:[],
    typesAccountList: [],
    Counter: 0,
    AccountArray: [],
    checkedAccountArray: [],
    loading: true,
    

  }),
  created(){
    eventEmitter.$on('changeLoading', (val) =>{
      this.loading = val
    })
    eventEmitter.$on('openBanner', (banner) =>{
      this.banner = banner
    }),
    eventEmitter.$on('createdAccount', (account) =>{
      this.addNewAccount(account)
      // this.Counter++
    }),
    eventEmitter.$on('updatedAccount', (id) =>{
      this.updatedAccount(id)
      this.Counter++
    })
    eventEmitter.$on('updatedTypesAccountList', (type) =>{
      this.updateTypesAccountList(type)
      this.Counter++
    }),
    eventEmitter.$on('deletedAccount', (id) =>{
      this.deletedAccount(id)
      this.Counter++
    })
    // eventEmitter.$on('checked', (check, item) =>{
    //   // console.log(check, item)
    //   if(item === 'all'){
    //     if(check){
    //       this.checkedAccountArray = this.accounts
    //       }else{
    //     this.checkedAccountArray = []
    //     }
    //   }else{
    //     if(check){
    //       this.checkedAccountArray.push(item)
    //     }else{
    //       // console.log(check,item.id)
    //       for (var i = this.checkedAccountArray.length - 1; i >= 0; --i) {
    //         if (this.checkedAccountArray[i].id === item.id) {
    //           this.checkedAccountArray.splice(i,1);
    //           console.log('yes, lenth=' + this.checkedAccountArray.length)
    //         }
    //       }
    //     }
    //   }




    //   // if(check){
    //   //   if(item === 'all'){
    //   //     this.checkedAccountArray = this.accounts
    //   //   }else{
    //   //     this.checkedAccountArray.unshift(item)
    //   //   }
    //   // }else{
    //   //   if(item === 'all'){
    //   //     this.checkedAccountArray = []
    //   //   }else{
    //   //     console.log(check,item.id)
    //   //     for (var i = this.checkedAccountArray.length - 1; i >= 0; --i) {
    //   //       if (this.checkedAccountArray[i].id === item.id) {
    //   //           this.checkedAccountArray.splice(i,1);
    //   //       }
    //   //     }
    //   //   }
    //   // }
    //   // this.deletedAccount(id)
    //   // this.Counter++
    // })

  },
  // async mounted(){
  //   this.accounts = await this.$store.dispatch('fetchAccounts')
  //   this.typesAccount = await this.$store.dispatch('fetchTypesAccount')
  //   let arr = []
  //        Object.keys(this.typesAccount).forEach(key => {
  //         arr.push(this.typesAccount[key].type)
  //       })
  //       this.typesAccountList = [...new Set(arr)];
  //       this.typesAccountList = this.typesAccountList.sort()
  //       this.typesAccountListCounter++
  //       this.changeLoading(false)
  //       this.checkedAccountArray = this.accounts
  // },
  methods: {
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
    },
    addNewAccount(account){
      this.accounts.unshift(account)
      this.Counter++
    },
    updatedAccount(account){
      const idx = this.accounts.findIndex(c => c.id === account.id)
      this.accounts[idx].categoryTypeAccount = account.categoryTypeAccount
      this.accounts[idx].categoryAccount = account.categoryAccount
      this.accounts[idx].title = account.title
      this.accounts[idx].type = account.type
      this.accounts[idx].bill = account.bill
      this.accounts[idx].currancy = account.currancy
      this.accounts[idx].color = account.color
      this.accounts[idx].comments = account.comments
      eventEmitter.$emit('closeBanners')
      this.$forceUpdate()
    },
    deletedAccount(id){
        for (var i = this.accounts.length - 1; i >= 0; --i) {
          if (this.accounts[i].id === id) {
              this.accounts.splice(i,1);
          }
        }
        this.Counter++
    },
    updateTypesAccountList(type){
      this.typesAccountList.push(type)
      this.typesAccountList.sort()
    },
  }
}
</script>

