<template>
  <div>
      <v-expand-transition>
      <Charts
    v-if="params.banner === ''"
    :params="params"
    />
    <AccTabs
    v-if="params.banner === 'toCreateAccountBanner' || params.banner === 'toEditAccountBanner'"
    :params="params"
    :account="params.account"
    />
    </v-expand-transition>
    
    <ListMenu
    :params ="params"
    :showAccounts = "showAccounts"
    />
    <AccountTable
    :params="params"
    :showAccounts = "showAccounts"

    />
  </div>
</template>
<script>
import Charts from '@/pages/FinPlan/Accounts/Charts'
import ListMenu from '@/pages/FinPlan/Accounts/ListMenu'
// import Account from '@/pages/FinPlan/Accounts/Account'
import AccountTable from '@/pages/FinPlan/Accounts/AccountTable'
import AccTabs from '@/pages/FinPlan/Accounts/AccTabs'


export default{
  components:{
    Charts,
    ListMenu,
    // Account,
    AccountTable,
    AccTabs
    
  },
  data:()=>({
    show: true,
    counter:0,
    route:'',
  }),
  props: {
    params: {
      type:Object
    },
    // showAccounts:{
    //   type:Array
    // }
  },
  computed:{
    showAccounts(){
      return this.params.accounts.filter(account =>{
        if(this.params.leftMenuButton === 0){
          return account.categoryTypeAccount
        }else if(this.params.leftMenuButton % 100 === 0){
          return account.categoryTypeAccount.toString()[0] === this.params.leftMenuButton.toString()[0]
        } else {
          return account.categoryTypeAccount === this.params.leftMenuButton
        }
      })
    }
  },
}
</script>
<style>
</style>
