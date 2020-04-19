// import {eventEmitter} from '@/main'
export default  {
  data: ()=>({
      route: '/',
      counter: 0,

      // leftBar
      visibility: true,
      lMbuttons:[
        {to:'/accounts', icon: 'mdi-credit-card-multiple-outline', click:'accounts', link:'/accounts'},
        {to:'/operations', icon: 'mdi-currency-rub', click:'operations', link:'/operations'},
        {to:'/properties', icon: 'mdi-brightness-7', click:'properties', link:'/properties'},
        {to:'/statistic', icon: 'mdi-poll', click:'statistic', link:'/statistic'},
      ],
      leftMenuButton: 0,
      leftMenuitems:[],
      lmBtnDisabled: false,

      accounts: [],

  }),
  async mounted(){
    this.leftMenuitems = await this.$store.dispatch('fetchLeftMenuitems')
    this.accounts = await this.$store.dispatch('fetchAccounts')
  },
  

  created(){
    
    // this.asd = 3
    // this.route = this.$route.name
  }
}

// route: '/',
// visibility: true,
