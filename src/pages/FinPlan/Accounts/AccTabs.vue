<template>
  <v-card>
    <v-toolbar flat 
    :color="this.params.banner === 'toCreateAccountBanner' || 'toEditAccountBanner' ? '#F5F5F5' :  'this.leftMenuButtonColor'"
    :text-color="this.params.leftMenuButton === 0 ? 'black' : 'white'"
    >
      <v-toolbar-title>
        <div class="d-flex justify-space-start">
        <h2 v-if="params.banner === 'toCreateAccountBanner'">Создание счета в разделе:</h2>
        <h2 v-if="params.banner === 'toEditAccountBanner'">Изменение счета {{account.title}}  в разделе:</h2>
        <span 
            class="mx-2 font-weight-black headline "
            >
            <v-chip
            pa-0
            small
                class="ma-1"
                :color="leftMenuBtnName.parentColor"
                label
                text-color="white"
              >
                {{leftMenuBtnName.parentText}}
              </v-chip>
              <v-chip
              pa-0
              small
                class="ma-1"
                :color="leftMenuBtnName.color"
                label
                text-color="black"
              >
                {{leftMenuBtnName.btnName}}
              </v-chip>
            </span>
          </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn
          @click="openBanner('', account)"
          class="my-2 mx-5"
          outlined
          color="red" 
          >Отменить
          </v-btn>
        <v-btn
          v-if="params.banner ==='toCreateAccountBanner' && !hideSaveButton"
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toCreateAccount()"
          >
          Сохранить1
        </v-btn>
        <v-btn
          v-if="params.banner ==='toEditAccountBanner' && !hideSaveButton"
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toEditAccount(account.id)"
          >
          Сохранить
        </v-btn>
    </v-toolbar>
    <v-tabs 
    vertical 
     background-color="#F5F5F5"
    >
      <v-tab 
      @click="toHideSaveButton(false)"
      style="align-self: start"
      >
        <v-icon left>mdi-shape-outline</v-icon>
        Главная
      </v-tab>
      <v-tab 
      @click="toHideSaveButton(false)"
      style="align-self: start"
      >
        <v-icon left>mdi-application</v-icon>
        Категории
      </v-tab>
      <v-tab 
      @click="toHideSaveButton(false)"
      style="align-self: start">
        <v-icon left>mdi-tag-multiple-outline</v-icon>
        Теги
      </v-tab>
      <v-tab
      v-if="this.params.banner === 'toEditAccountBanner'" 
      @click="toHideSaveButton(true)"
      style="align-self: start">
        <v-icon 
        left
        >mdi-trash-can-outline</v-icon>
        Удаление
      </v-tab>

      <v-tab-item>
        <div class="d-flex justify-space-start">
          <div style= 'min-width: 60%;'>
            <inputField 
              :inputField="inputField" 
              @updateValue="inputField.value = $event"
            />
          </div >
          <div style= 'min-width: 20px;'>
            <selectField 
            :selectField="selectField" 
              @updateValue="selectField.value = $event"
            />
          </div>
          <div style= 'min-width: 20px;'>
            <datePicker
            :dateField="dateField" 
            />
          </div>
        </div>
        <div style= 'min-width: 20px;'>
            <textField 
            :textField="textField" 
              @updateValue="textField.value = $event"
            />
          </div>
      </v-tab-item>

      <v-tab-item>
        <categories
        :params="params"
         />
      </v-tab-item>
      <v-tab-item>
        <tags 
        :tags="params.tags"
        />
      </v-tab-item>
      <v-tab-item>
        <h1 class="text-center pt-5"> Вы уверены, что хотите удальть счёт?</h1>
        <div class="text-center pt-5">
        <v-btn
          @click="toRemoveAccount(account.id)"
          class="my-2 mx-5"
          outlined
          color="red" 
        >Удалить</v-btn>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>
<script>
  import {eventEmitter} from '@/main'
  import { validationMixin } from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'
  import Account from '@/store/FinPlan/Account.js'
  // import filters from '@/pages/FinPlan/Accounts/filters'
  import tags from '@/pages/FinPlan/Accounts/tags'
  import categories from '@/pages/FinPlan/Accounts/categories'
  import inputField from '@/components/inputField'
  import selectField from '@/components/selectField'
  import datePicker from '@/components/datePicker'
  import textField from '@/components/textField'
export default {
  mixins:[validationMixin, Account],
  validations: {
    titleError: {required},
  },
  components:{
    inputField, selectField, datePicker, textField, tags, categories
  },
  props:{
    params:{
      type:Object
    },
    account:{
      type:Object,
      // required: true,
    },
  },
  data: () => ({
      hideSaveButton: false,
      checked: true,
      inputField: {
        val: '',
        class: 'pa-2',
        label: "Название счета",
        hidedetails: false,
        outlined: true,
        type: "text",
        name: "title",
        required: true,
        titleErrors: [],
      },

      selectField:{
        default: 'RUB',
        val: 'RUB',
        outlined: 'outlined',
        class: 'pa-2',
        items: [
          'RUB',
          'EUR',
          'USD',
        ],
        label: 'Валюта',
        name: 'currancy'
      },

      textField:{
        val: 'Lorem',
        class: 'pa-2',
        rows: 2,
        hidedetails: true, 
        outlined: true,
        name:  '',
        label:  'Комментарии',
        type: 'text',
      },
      dateField:{
        val: new Date().toISOString().substr(0, 10),
        default: '2020-04-05'
      }
  }),
  computed:{
    leftMenuBtnName(){
      if(this.params.banner === 'toCreateAccountBanner'){
        return this.ACCOUNTJSleftMenuBtnName(this.params.leftMenuButton,this.params.leftMenuitems)
      }else{
        return this.ACCOUNTJSleftMenuBtnName(this.account.categoryTypeAccount,this.params.leftMenuitems)
      }
    },
    titleError(){
      return this.inputField.val
    },
  },
  created(){
    this.selectField.val = 'RUB'
    if(this.account){
      this.inputField.val = this.account.title
      this.checked = this.account.checked
      this.categoryTypeAccount = this.account.categoryTypeAccount
      this.selectField.val = this.account.currancy
      this.textField.val = this.account.comments
      this.dateField.val = this.account.dateCreate
    }
  },
  methods:{
    checkUndefined(val){
      if(val) {
        return val
      }else{
        return ''
      }
    },
    toHideSaveButton(bool){
      this.hideSaveButton = bool
    },
    async toCreateAccount(){
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        const account = await this.$store.dispatch('createAccount', {
          categoryTypeAccount: this.params.leftMenuButton,
          color: this.leftMenuBtnName.color,
          title: this.inputField.val,
          checked: 'checked',
          currancy: this.selectField.val,
          dateCreate: this.dateField.val,
          comments: this.checkUndefined(this.textField.val),
          })
          
          // const type= this.type
          this.inputField.val = '',
          this.selectField.val = 'RUB',
          this.dateField.val = new Date().toISOString().substr(0, 10),
          this.textField.val = '',
          this.$v.$reset()

          // this.$store.dispatch('changeSnackBar',{
          // timeout: 3000,
          // text: 'Счет был создан',
          // color: 'success'})

          eventEmitter.$emit('createdAccount', account)
          eventEmitter.$emit('openBanner', '')

        }catch (e){
          // console.log('error')
        }
    },
    async toEditAccount(id){
      if (this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try{
        const account = await this.$store.dispatch('editAccount', {
          id,
          categoryTypeAccount: this.account.categoryTypeAccount,
          color: this.account.color,
          title: this.inputField.val,
          checked: this.account.checked,
          currancy: this.selectField.val,
          dateCreate: this.dateField.val,
          comments: this.textField.val,
        })
          this.inputField.val = '',
          this.selectField.val = 'RUB',
          this.dateField.val = new Date().toISOString().substr(0, 10),
          this.textField.val = '',
          this.$v.$reset()
        
          eventEmitter.$emit('updatedAccount', account)
          eventEmitter.$emit('openBanner', '')

        this.$store.dispatch('changeSnackBar',{
          timeout: 3000,
          text: 'Счет был изменен',
          color: 'success'})
          
          
        }catch (e){
          // console.log('error')
        }
    },
    async toRemoveAccount(id){
      try{
            await this.$store.dispatch('removeAccount', id)
          
            this.$store.dispatch('changeSnackBar',{
            timeout: 3000,
            text: 'Счет был удален',
            color: 'success'})

            eventEmitter.$emit('deletedAccount', id)
            eventEmitter.$emit('openBanner', '')

          }catch (e){
            // console.log('error')
          }
    }
    
  }
}
</script>
<style>
</style>
