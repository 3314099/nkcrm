<template>
<div>
  111
<v-card
class="mx-3 my-2"
  >
    <v-container
    >
    {{params.leftMenuButtonColor}}
      <div class="d-flex justify-space-start">
        <h2 v-if="params.banner === 'toCreateAccountBanner'">Создание счета в разделе:</h2>
        <h2 v-if="params.banner === 'toEditAccountBanner'">Изменение счета в разделе:</h2>
        <span 
            class="mx-2 font-weight-black headline "
            >
            <v-chip
            v-if="leftMenuBtnName.parentText"
            pa-0
            small
                class="ma-1"
                color="indigo"
                label
                text-color="white"
              >
                {{leftMenuBtnName.parentText}}
              </v-chip>
              <v-chip
              pa-0
              small
                class="ma-1"
                color="blue lighten-4"
                label
                text-color="black"
              >
                {{leftMenuBtnName.btnName}}
              </v-chip>
            </span>
          </div>
            <div class="d-flex flex-wrap">
      <v-col class="d-flex justify-space-between" cols="12">
        <inputField 
          :title="title" 
          @updateValue="title.title = $event"
        />
                <v-combobox
                outlined
                :class="classFlex"
                  select="filter1"
                  v-model="filter1"
                  :items="params.filter1List"
                  label="Тип счета"
                  name="filter1"
                  :search-input.sync="filter1"
                  >
                </v-combobox>
        <v-select
        style="max-width: 200px;"
        outlined
        :class="classFlex"
          v-model="currancy"
            :items="items"
            label="Валюта"
            name="currancy"
        ></v-select>
        <datePicker />
      </v-col>
      
      <v-col class="text-center pa-0" cols="8" >
        <v-textarea
        :class="classFlex"
          rows="1"
          v-model="comments"
          outlined
          name="comments"
          label="Комментарии"
          type="text"
        >
        </v-textarea>
      </v-col>
      <v-col class="text-center ma-0 pa-0" col-lg-4 col-md-4>
        <v-btn
          @click="openBanner('', account)"
          class="my-2 mx-5"
          outlined
          color="red" 
          >Отменить
          </v-btn>
        <v-btn
          v-if="params.banner ==='toCreateAccountBanner'"
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toCreateAccount()"
          >
          Сохранить1
        </v-btn>
        <v-btn
          v-if="params.banner ==='toEditAccountBanner'"
          class="my-2 mx-5"
          outlined
          color="primary" 
          @click="toEditAccount(account.id)"
          >
          Сохранить
        </v-btn>
        </v-col>
        </div>

    </v-container>
    </v-card>
      </div>
</template>
<script>
// import {eventEmitter} from '@/main'
import Account from '@/store/FinPlan/Account.js'
import { validationMixin } from 'vuelidate'
import {required} from 'vuelidate/lib/validators'
import datePicker from '@/components/datePicker'
import inputField from '@/components/inputField'
export default {
  // mixins: [Account],
  mixins: [validationMixin,Account],
  name: 'AddAccount',
  validations: {
    titleError: {required},
  },
    components:{
      inputField,
      datePicker
    },
  data:()=>({
    
    filter1List:[],
    title: {
      title: '',
      class: 'px-2',
      label: "Название счета",
      outlined: true,
      type: "text",
      name: "title",
      required: true,
      titleErrors: [],
    },
    classFlex: 'px-2',
    categoryTypeAccount: 0,
    checked: true,
    filter1: '',
    categoryAccount: '',
    color:'',
    currancy: 'RUB',
    comments: '',
    bill: 0,
    items: [
        'RUB',
        'EUR',
        'USD',
      ],
    search: null,
  }),
  props:{
    params:{
      type:Object
    },
    account:{
      type:Object,
      // required: true,
    },
  },
  created() {

    this.color = this.params.leftMenuButtonColor
    
    if(this.account){

      this.filter1List = this.params.filter1List
      this.title.title = this.account.title
      this.checked = this.account.checked
      this.categoryAccount = ''
      this.categoryTypeAccount = this.account.categoryTypeAccount
      this.filter1 = this.account.filter1
      this.currancy = this.account.currancy
      this.color = this.account.color
      this.comments = this.account.comments
    }
  },
  computed: {
    titleError(){
      return this.title.title
    },
    // titleErrors(){
    //   const errors = []
    //   if (!this.$v.title.title.$dirty) return errors
    //   !this.$v.title.title.required && errors.push('Обязательное поле')
    //   return errors
    // },
    leftMenuBtnName(){
      if(this.params.banner === 'toCreateAccountBanner'){
        return this.ACCOUNTJSleftMenuBtnName(this.params.leftMenuButton,this.params.leftMenuitems)
      }else{
        return this.ACCOUNTJSleftMenuBtnName(this.account.categoryTypeAccount,this.params.leftMenuitems)
      }
    },
    
  },
  methods:{
    // changeColor(color){
    //   this.color= color    }

  }
  
}
</script>
<style>

</style>
