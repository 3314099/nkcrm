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
    <youtube
    v-if="params.route === 'video'"
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
import youtube from '@/components/youtube'


export default{
  mixins:[finPlan],
  components:{
    LeftPanelButtons,
    Accounts,
    properties,
    LeftMenu,
    RightMenu,
    youtube
  },
  data: ()=>({
    counter: 0,

    params: {
    colorPicker: '',
    categories: [],
    tabBtn: 'priority',
    accounts:[],
    selectedItemBtnId: '',
    tags:[],
    account:{},
    targets:[],
    filters:[],
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
    this.params.tags = this.sortObjectsArray(this.params.tags, 'title')
    this.params.filters = await this.$store.dispatch('fetchFilters')
    this.params.filters = this.sortObjectsArray(this.params.filters, 'title')
    this.params.targets = await this.$store.dispatch('fetchTargets')
    this.params.targets = this.sortObjectsArray(this.params.targets, 'title')
    this.params.categories = await this.$store.dispatch('fetchCategories')
    this.params.categories = this.sortObjectsArray(this.params.categories, 'title')
    
        this.params.loading = false
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
    eventEmitter.$on('changeCategory', (action,val) =>{
      this.params.tabBtn = 'categories'
      this.toChangeCategory(action,val)
    })
    eventEmitter.$on('changeItem', (action,val) =>{
      this.toChangeItem(action,val)
    })
    eventEmitter.$on('changeColorPicker', (color) =>{
      this.params.colorPicker = color
    })
    eventEmitter.$on('changeSelectedItemBtnId', (Id) =>{
      this.params.selectedItemBtnId = Id
    })
  },
  methods:{
    sortObjectsArray(array, field){
      return [...array].sort(( a, b ) => a[field] > b[field] ? 1 : -1)
    },
    sort_by(field, reverse, primer){
      var key = primer ? 
          function(x) {return primer(x[field])} : 
          function(x) {return x[field]};

      reverse = !reverse ? 1 : -1;

      return function (a, b) {
          return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        } 
    },
    toChangeCategory(action,val){
        switch(action) {
          case 'changeFilterColor':  // if (x === 'value1')
            this.params.editCategory.filter.color = val
          break
          case 'createdCategory':  // if (x === 'value1')
            this.params.categories.push(val)
            this.params.categories = this.sortObjectsArray(this.params.categories, 'title')
            this.counter++
          break
          case 'toCreateSubCategory':  // if (x === 'value1')
            this.titleLable = 'Создание подкатегории'
            this.commentLable = 'Комментарий к категории'
          break
          default:
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            break
        }
    },
    toChangeItem(action,val){
      switch(action) {
        case 'createdTarget':  
            this.params.tabBtn = 'targets'
            this.params.targets.push(val)
            // this.params.targets = this.sortObjectsArray(this.params.filters, 'title')
          break
        case 'updatedTarget':
          this.params.tabBtn = 'targets'
          this.params.targets = this.params.targets.map(o => {
            if (o.id === val.id) {
              return val
            }else{
              return o
            }
          })
          // this.params.targets = this.sortObjectsArray(this.params.filters, 'title')
          break
        case 'deletedTarget':
          this.params.tabBtn = 'targets'
          this.params.targets = [...this.params.targets].filter(x => x.id !== val)
          break
          
        case 'createdFilter':  // if (x === 'value1')
            this.params.tabBtn = 'filters'
            this.params.filters.push(val)
            this.params.filters = this.sortObjectsArray(this.params.filters, 'title')
          break
        case 'updatedFilter':  // if (x === 'value1')
          for (var k = this.params.filters.length - 1; k >= 0; --k) {
            if (this.params.filters[k].id === val.id) {
                this.params.filters[k] = val;
            }
          }
          break
        case 'deletedFilter':  
          for (var i = this.params.filters.length - 1; i >= 0; --i) {
            if (this.params.filters[i].id === val) {
                this.params.filters.splice(i,1);
            }
          }
          break
        default:
            break
        }
        this.counter++
    },
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
