<template>
<div 
class="d-flex justify-space-between"
>
  <div class="ma-1">
    <v-card outlined>
    <LeftPanelButtons 
    :params="params" 
    />
    <LeftMenu 
    :params="params"
    />
    </v-card>
  </div>

  <div class="flex-grow-1 ma-1">
    <Accounts
    v-if="params.route === 'accounts'"
    :params="params"
    :key="params.accounts.length + counter"
    />
    <properties
    v-if="params.route === 'properties'"
    :params="params"
    :key="params.accounts.length + counter"
    />
  </div>

  <div class="ma-1">
    <RightMenu />
  </div>
  
</div>
</template>
<script>
import {eventEmitter} from '@/main'
import finPlan from '@/store/FinPlan/finPlan.js'
import LeftPanelButtons from '@/pages/FinPlan/LeftPanelButtons'
import Accounts from '@/pages/FinPlan/Accounts/Accounts'
import properties from '@/pages/FinPlan/properties/properties'
import LeftMenu from '@/pages/FinPlan/LeftMenu'
import RightMenu from '@/components/RightMenu/RightMenu'


export default{
  mixins:[finPlan],
  components:{
    LeftPanelButtons,
    Accounts,
    properties,
    LeftMenu,
    RightMenu
  },
  data: ()=>({
    counter: 0,

    params: {
    editCategory: {},
    tabBtn: 'priority',
    accounts:[],
    tags:[],
    account:{},
    filter1List:[],
    route: '',
    leftPanelButton: '',
    visibility: true,
    overlay: false,
    banner:'',
    loading: true,
    leftMenuButton: 0,
    leftMenuButtonColor: '',
    btnDisabled: false,
    leftMenuitems: [],
    },

  }),
  
  async mounted(){
    this.params.leftMenuitems = await this.$store.dispatch('fetchLeftMenuitems')
    this.params.accounts = await this.$store.dispatch('fetchAccounts')
    this.params.tags = await this.$store.dispatch('fetchTags')

    let filter1List = await this.$store.dispatch('fetchFilter1')
    let arr = []
         Object.keys(filter1List).forEach(key => {
          arr.push(filter1List[key].filter1)
        })
        // console.log(arr)
        this.params.filter1List = [...new Set(arr)].sort();
        // this.typesAccountListCounter++
        this.params.loading = false
        // this.checkedAccountArray = this.accounts
  },
  created(){
    this.params.route = this.$route.name
    eventEmitter.$on('leftMenuButton', (btnId) =>{
      this.changeLeftMenuButton(btnId)
    }),
    eventEmitter.$on('toChangeCheckLMB', (val,id) =>{
      this.changeCheckLMB(val,id)
    }),
    eventEmitter.$on('leftPanelButtons', (value) =>{
      this.params.leftPanelButton = value
      this.params.route = this.$route.name
      this.counter++
    }),
    eventEmitter.$on('changeVisibility', () =>{
      this.params.visibility = !this.params.visibility
    }),
    eventEmitter.$on('openBanner', (banner, account) =>{
      this.params.banner = banner
      if(banner){
        this.params.account = account
        this.params.btnDisabled = true
      }else{
        this.params.account = {}
        this.params.btnDisabled = false
      }
    }),
    eventEmitter.$on('createdAccount', (account) =>{
      this.addNewAccount(account)
    }),
    eventEmitter.$on('updatedAccount', (account) =>{
      this.updateAccount(account)
    }),
    eventEmitter.$on('deletedAccount', (id) =>{
      this.deletedAccount(id)
    })
    eventEmitter.$on('changeCheckAccount', (bool,accountId) =>{
      this.changeCheckAccount(bool,accountId)
    })
    eventEmitter.$on('changeCheckShowAccounts', (bool,showAccounts) =>{
      this.changeCheckShowAccounts(bool,showAccounts)
    })
    eventEmitter.$on('createdTag', (tag,tabBtn) =>{
      this.addNewTag(tag)
      this.params.tabBtn = tabBtn
    })
    eventEmitter.$on('deletedTag', (id,tabBtn) =>{
      this.deletedTag(id)
      this.params.tabBtn = tabBtn
    })
    eventEmitter.$on('updatedTag', (tag,tabBtn) =>{
      this.updatedTag(tag)
      this.params.tabBtn = tabBtn
    })
  },
  methods:{

    async changeCheckAccount(bool,accountId){
      for (var i = this.params.accounts.length - 1; i >= 0; --i) {
        if (this.params.accounts[i].id === accountId) {
            this.params.accounts[i].checked = bool;
        }
      }
      this.counter++
      try{
          await this.$store.dispatch('changeCheckedAccount', {bool, accountId})
    
          }catch (e){
            console.log('error')
          }
    },
    async changeCheckShowAccounts(bool,showAccounts){
      for (var i = this.params.accounts.length - 1; i >= 0; --i) {
        for (var n = showAccounts.length - 1; n >= 0; --n) {
          if (this.params.accounts[i].id === showAccounts[n].id) {
              this.params.accounts[i].checked = bool;
          }
        }
      }
      this.counter++
        let accounts = this.params.accounts
      try{
        // console.log(this.params.accounts)
            await this.$store.dispatch('changeCheckedAccountsArray', accounts)
      
            // this.$store.dispatch('changeSnackBar',{
            // timeout: 3000,
            // text: 'Изменения сохранены',
            // color: 'success'})

          }catch (e){
            console.log('error')
          }
    },
    addNewAccount(account){
      this.params.accounts.unshift(account)
      this.params.account = {}
      this.counter++
    },
    addNewTag(tag){
      this.params.tags.unshift(tag)
      this.counter++
    },
    updatedTag(tag){
      if(!tag){
        this.counter++
      }else{
        for (var i = this.params.tags.length - 1; i >= 0; --i) {
          if (this.params.tags[i].id === tag.id){
            this.params.tags[i] = tag;
          }
        }
      this.counter++
      }
    },
    updateAccount(account){
      for (var i = this.params.accounts.length - 1; i >= 0; --i) {
        if (this.params.accounts[i].id === account.id) {
          this.params.accounts[i] = account;
          }
      }
      this.params.account = {}
      this.counter++
    },
    deletedAccount(id){
        for (var i = this.params.accounts.length - 1; i >= 0; --i) {
          if (this.params.accounts[i].id === id) {
              this.params.accounts.splice(i,1);
          }
        }
        this.params.account = {}
        this.counter++
    },
    deletedTag(id){
        for (var i = this.params.tags.length - 1; i >= 0; --i) {
          if (this.params.tags[i].id === id) {
              this.params.tags.splice(i,1);
          }
        }
        this.counter++
    },
    changeLeftMenuButton(btnId){
      this.params.leftMenuButton = btnId
      for (var i = this.params.leftMenuitems.length - 1; i >= 0; --i) {
        if (this.params.leftMenuitems[i].btnId === btnId){
          this.params.leftMenuButtonColor = this.params.leftMenuitems[i].background
        }
      }
    },
    changeCheckLMB(bool,id){
      for (var i = this.params.leftMenuitems.length - 1; i >= 0; --i) {
        if (id === 0){
          this.params.leftMenuitems[i].checked = bool
        }else if(this.params.leftMenuitems[i].btnId === id){
          this.params.leftMenuitems[i].checked = bool;
        }else if(id % 100 === 0 && this.params.leftMenuitems[i].btnId.toString()[0] === id.toString()[0]){
          this.params.leftMenuitems[i].checked = bool;
        }
      }
      let countCheckTrue = 0
      let countCatCheck = 0
      for (i = this.params.leftMenuitems.length - 1; i >= 1; --i) {
        if(this.params.leftMenuitems[i].checked && this.params.leftMenuitems[i].btnId % 100 !== 0){
          countCheckTrue++
          countCatCheck++
        }
        if(this.params.leftMenuitems[i].btnId % 100 === 0){
          if(countCatCheck > 0){
            this.params.leftMenuitems[i].checked = true
          }else{
            this.params.leftMenuitems[i].checked = false
          }
          countCatCheck = 0
        }
      }
      if(countCheckTrue === 0){
        this.params.leftMenuitems[0].checked = false
      }else{
        this.params.leftMenuitems[0].checked = true
      }
      this.counter++
    }
  }
}
</script>
<style >
 .pad0 {
   padding-top: 0;
   padding-bottom: 0;
 }
 
</style>
