<template>
<div>
  {{selectField}}
  <div class="d-flex justify-start justify-space-between">
    <div>
      <div class="d-flex justify-space-between">
        <div>
          <v-text-field
            class="pa-1"
            :style="modeBtn ? 'min-width: 400px' : 'min-width: 280px'"
            :label="titleLable"
            v-model="titleField"
            dense
            :error-messages="childTitleFieldErrors"
            :hint="modeBtn ? 'Не менее 3-х и не более 15-ти символов' : ''"
            outlined
            small
            clearable
            :counter="modeBtn ? 15 : false"
            @blur="$v.childTitleField.$touch()"
          >
          </v-text-field>
        </div>
        <div v-if="modeBtn === 'group'">
          <colorPicker
          :params="params"
          :editItem="editItem"
          :colorsIgnore="colorsIgnore"
          />
        </div>
        <div v-if="modeBtn && modeBtn !== 'group'" >
          <v-autocomplete
            style="min-width: 460px"
            class="pa-1"
            v-model="selectField"
            :auto-select-first="true"
            name="id"
            no-data-text="Список пуст"
            :items="selectListArray"
            item-text="title"
            item-value="id"
            dense
            small
            outlined
            label="Выберите группу фильтров"
          ></v-autocomplete>
        </div>
      </div>
      <div v-if="modeBtn">
        <v-text-field
          class="pa-1"
          :label="commentLable"
          v-model="commentField"
          dense
          rows="1"
          hint="не более 50 символов"
          outlined
          small
          clearable
          :counter="50"
        >
        </v-text-field>
      </div>
      
    </div>

    <div class="d-flex" >
      <div v-if="modeBtn" class="d-flex justify-space-around flex-column align-center ">
        <div v-if="mode !== 'create'">
          <v-btn
              @click="button('remove')"
              class="mx-2"
              outlined
              color="red" 
              >Удалить
              </v-btn>
        </div>
        <div>
          <v-btn
              @click="button('cancel')"
              class="mx-2"
              outlined
              color="green" 
              >Отменить
              </v-btn>
        </div>
        <div>
          <v-btn
              class="mx-2"
              outlined
              color="primary" 
              @click="button(mode)"
              :disabled="errorBtn"
              >
              Сохранить
            </v-btn>
        </div>
      </div>


      <div v-if="modeBtn === ''" class="d-flex flex-wrap justify-space-around">
          <div 
            class="pa-1"
          >
            <v-btn
            width=""
            class="mx-1"
            outlined
            color="primary" 
            @click= "toChangeModeBtn('group', 'create')"
            :disabled="errorBtn"
            >
              Создать группу фильтров
            </v-btn>
          </div> 
          <div 
         class="pa-1">
            <v-btn
            width=""
            class="mx-1"
            outlined
            color="primary" 
            @click= "toChangeModeBtn('item', 'create')"
            :disabled="errorBtn"
            >
            Создать фильтр
          </v-btn>
          </div>
      </div>
    </div>
  </div>
  <v-divider class="mx-4"></v-divider>
    <div class="d-flex justify-space-between">
    <div>
      <h2 class="ma-4 pr-0">Группы фильтров:</h2>
    </div>
    <div>
      <h3 v-if="!this.groupsArray.length" class="ma-4 pr-0">Список пуст</h3>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="d-flex row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
        <v-tooltip 
        max-width= 400
        top
        v-for="group in groupsArray"
        :key="group.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
      v-on="on"
      label
      :ripple="false"
      :color="group.color"
      :outlined="selectedItemBtnId ? false : true"
      style="border-width: 4px"
      text-color="'black'"
      filter: true
      class="mx-1"
      :close="group.id !== 'withoutGroup' ? true : false"
      close-icon= 'mdi-lead-pencil'
      @click:close="toChangeModeBtn('group', 'edit', group)"
      @click="selectItemBtnId(group.id)"
    >
      {{ group.title }}
    </v-chip>
    </template>
      <span 
      >
      <div v-if="group.comment">{{group.comment}}</div>
      <div v-else>Нет комментариев</div>
      </span>
    </v-tooltip>
  </div>
   <v-row
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
  </div>
  <div class="d-flex justify-space-between">
    <div>
    <h2 class="ma-4 pr-0">Фильтры:</h2>
    </div>
    <div>
    <h3 v-if="!this.fullItemsArray.length" class="ma-4 pr-0">Список пуст</h3>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
          <v-tooltip 
        max-width= 400
        top
        v-for="item in fullItemsArray"
        :key="item.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
        v-on="on"
        outlined
        style="border-width: 4px"
      label
      :color="item.color"
      text-color="'black'"
      filter: true
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toChangeModeBtn('item', 'edit', item)"
      @click="changeCheck(tag.id)"
    >
      {{ item.title }}
    </v-chip>
    </template>
      <span 
      >
      <div >Группа фильтров: {{ item | tips(fullGroupsArray) }} </div>
      <div >-----------------</div>
      <div v-if="item.comment">{{item.comment}}</div>
      <div v-else>Нет комментариев</div>
      </span>
    </v-tooltip>
  </div>
   <v-row
          align="center"
          justify="center"
          style="height: 0px"
        >
        </v-row>
      </v-container>
  </div>




  </div>
</template>
<script>
  import { validationMixin } from 'vuelidate'
  // import { required, minLength, maxLength} from 'vuelidate/lib/validators'
  // import { required, minLength, maxLength} from 'vuelidate/lib/validators'
  import {eventEmitter} from '@/main'
  import colorPicker from "@/components/colorPicker"
  export default {
    mixins: [validationMixin],
    validations: {
      childTitleField: {
        unique: function(){
          return this.valchildTitleField.unique
          },
        length: function(){
          return this.valchildTitleField.length
          },
      }
      
      
      
        

      // }
      // childTitleField: ()=>{
      //   return {
      //     

      //   }
      // },
      // })
    },
    components:{colorPicker},
    data(){
      return {
        mode:'',
        color:'',
        modeBtn: '',
        editItem: {},
        selectField: 'withoutGroup',
        selectedItemBtnId: '',
        type: '',
        titleField: '',
        titleLable: 'Строка поиска',
        commentField: '',
        commentLable: '',
        errorBtn: false,
        itemsWithWGGroup: false,
        // rules
        // titleFieldRules: [
        // v => !!v || 'Обязательное поле',
        // v => (v && v.length > 10) || 'Не менее 10 символов',
        // ],
        // titleErrors:[111,222]
      }
    },
    props:{
      params:{
        type: Object
      }
    },
    computed:{
      valchildTitleField(){
        let valchildTitleField = {}
        let unique = true
        let length = true
        let childTitleField = this.childTitleField
        let editItem = this.editItem
        console.log(editItem)
        let GroupsArray = []
        GroupsArray.push({id:'withoutGroup',color:'',comment:'',groupId:'',title:'Без группы',type:'group'})
        GroupsArray= GroupsArray.concat(this.fullGroupsArray)
        console.log(GroupsArray)
        if(this.mode === 'edit'){
          GroupsArray = GroupsArray.filter((item)=>{
                return (item.title !== editItem.title)})
        }
        console.log(GroupsArray)
        let ItemsArray = this.fullItemsArray
        switch(this.modeBtn) {
          case 'group':
              GroupsArray = GroupsArray.filter((item)=>{
                return (item.title.toUpperCase() === childTitleField.toUpperCase())})  
              GroupsArray.length ? unique = false : unique = true
            break
          case 'item':
            ItemsArray = ItemsArray.filter((item)=>{
              return (item.title.toUpperCase() === childTitleField.toUpperCase())})  
            ItemsArray.length ? unique = false : unique = true
            break
          default:
            unique = true
          break
        }
        // this.childTitleField ? unique = true : unique = false
        this.childTitleField.length > 2 && this.childTitleField.length < 16 ? length = true : length = false
        if(this.modeBtn){
          valchildTitleField.unique = unique
          valchildTitleField.length = length
        }else{
          valchildTitleField.unique = true
          valchildTitleField.length = true
        }
        return valchildTitleField
        
      },
      
      childTitleField(){
        if(this.titleField){
          return this.titleField
        }else{
          return ''
        }
      },
      childCommentField(){
        if(this.commentField){
          return this.commentField
        }else{
          return ''
        }
      },
      childTitleFieldErrors() {
        console.log(this.$v.childTitleField.$dirty)
        let errors = []
        if (!this.$v.childTitleField.$dirty) return errors
        !this.$v.childTitleField.length && errors.push('Не менее 3-х и не более 15-ти символов')
        !this.$v.childTitleField.unique && errors.push('Наименование уже существует')
        return errors
      },
      fullItemsAndGroupsArray(){
        return this.params.filters 
      },
      fullGroupsArray(){  // создаем массив групп внутри функции
      return this.fullItemsAndGroupsArray.filter((item)=>{
          return (item.type === 'group')
          })
      
      },
      fullItemsArray(){ // создаем массив айтемов внутри функции
        let fullItemsArray = this.fullItemsAndGroupsArray.filter((item)=>{
          return (item.type === 'item')
          })
          let countItemsWithGroup = 0
          for (var i = fullItemsArray.length - 1; i >= 0; --i) {
            let countItemsWithoutGroup = 0
            for (var k = this.fullGroupsArray.length - 1; k >= 0; --k) {
              if(fullItemsArray[i].groupId === this.fullGroupsArray[k].id){
                fullItemsArray[i].color = this.fullGroupsArray[k].color // присваиваем айтемам цвет групп
                countItemsWithoutGroup++ // если ++, то у айтема есть группа
              }
            }
            if(!countItemsWithoutGroup){fullItemsArray[i].groupId = 'withoutGroup'} //присваиваем айтему(withoutGroup или битый groupId) ,groupId = withoutGroup
            if(fullItemsArray[i].groupId === 'withoutGroup'){
              fullItemsArray[i].color = ''
              countItemsWithGroup++
            }
          }
          if(countItemsWithGroup){
            this.toChangeItemsWithWGGroup(true)
          }else{
            this.toChangeItemsWithWGGroup(false)
          }
          const selectedItemBtnId = this.selectedItemBtnId 
          if(selectedItemBtnId){
            fullItemsArray = this.fullItemsAndGroupsArray.filter((item)=>{
              return (item.groupId === selectedItemBtnId)})
          }
          fullItemsArray =  fullItemsArray.filter((item)=>{
          return (item.title.toUpperCase()).match(this.childTitleField.toUpperCase())
          })
          return fullItemsArray 
        
      },
      groupsArray(){
        let groupsArray = []
        if(this.itemsWithWGGroup){
          groupsArray.push({id:'withoutGroup',color:'',comment:'111',groupId:'',title:'Без группы',type:'group'})
        }
        groupsArray= groupsArray.concat(this.fullGroupsArray)
        const selectedItemBtnId = this.selectedItemBtnId 
        if(selectedItemBtnId){ // формирует массив групп с учетом нажатой группы
          groupsArray = groupsArray.filter((item)=>{
            return (item.id === selectedItemBtnId)})
        }
        if(this.childTitleField){
          groupsArray = this.filteredItemArrayByTitleField(groupsArray)
        }
        return groupsArray
      },
      colorsIgnore(){
        let arr = [] 
        for (var k = this.fullGroupsArray.length - 1; k >= 0; --k) {
            arr.push(this.fullGroupsArray[k].color)
        }
          return arr
      },
      selectListArray(){
        let selectListArray = []
        selectListArray.push({id:'withoutGroup',color:'',comment:'111',groupId:'',title:'Без группы',type:'group'})
        selectListArray = selectListArray.concat(this.fullGroupsArray)
          return selectListArray
      }
    },
    methods:{
      filteredItemArrayByTitleField(groupsArray){ // получает computed fullItemsArray и возвращает фильтрованый список групп
        let newGroupsArray = []
        const uniqueArray = [...new Set(this.fullItemsArray.map(item => item.groupId))]; // получаем массив уникальных id по groupId
        for(var h = 0; h < uniqueArray.length; h++){
          if(uniqueArray[h] === 'withoutGroup'){
            newGroupsArray.push({id:'withoutGroup',color:'',comment:'111',groupId:'',title:'Без группы',type:'group'})
          }
        }
        for (var i = 0; i < groupsArray.length; i++) {
          for (var k = 0; k < uniqueArray.length; k++) {
            if(groupsArray[i].id === uniqueArray[k] && groupsArray[i].id !== 'withoutGroup'){
              newGroupsArray.push(groupsArray[i]) // добавляем объекты group в массив
            }
          }
        }
        return newGroupsArray
      },
      toChangeItemsWithWGGroup(bool){
        this.itemsWithWGGroup = bool
      },
      toChangeModeBtn(modeBtn, mode, editItem){
        this.modeBtn = modeBtn
        this.mode = mode
        this.$v.$reset()
        switch(this.modeBtn) {
          case 'group':  
            if(this.mode === 'create'){
              this.titleLable = 'Создание группы фильтров'
              this.commentLable = 'Комментарий к группе фильтров'
            } else { // edit
              this.editItem = editItem
              eventEmitter.$emit('changeColorPicker', this.editItem.color)
              this.titleLable = 'Изменение группы фильтров'
              this.commentLable = 'Комментарий к группе фильтров'
              this.titleField = this.editItem.title
              this.commentField = this.editItem.comment
            }
            break
          case 'item':
            if(this.mode === 'create'){
              this.titleLable = 'Создание фильтра'
              this.commentLable = 'Комментарий к фильтру'
            } else { // edit
              this.titleLable = 'Изменение фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.editItem = editItem
              this.titleField = this.editItem.title
              this.selectField = this.editItem.groupId
              this.commentField = this.editItem.comment
            }
            break
          default:
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            this.selectLable = ''
          break
        }
      },
      button(val){
     
        let color = ''
        let groupId = ''
        switch(val) {
          case 'create':
            if (this.$v.$invalid){
            this.$v.$touch()
            return
            }
            switch(this.modeBtn){
              case 'group':
                color = this.params.colorPicker,
                groupId = ''
                break
              case 'item':
                color = '',
                groupId = this.selectField
                break
            }
            this.toCreate(color,groupId)
            break
          case 'edit':
            if (this.$v.$invalid){
            this.$v.$touch()
            return
            }
            switch(this.modeBtn){
              case 'group':
                color = this.params.colorPicker,
                groupId = ''
                break
              case 'item':
                color = '',
                groupId = this.selectField
                break
            }
            this.toEdit(color,groupId)
            break
          case 'remove':
              this.toRemove()
            break
          default: // cancel
            this.$v.$reset()
            this.modeBtn = ''
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            this.selectLable = ''
            this.selectField = 'withoutGroup'
            this.editItem = {}
            this.titleField = ''
            this.commentField = ''
            eventEmitter.$emit('changeColorPicker', '')
          break
        }
      },
      async toCreate(color,groupId){
        try{
          const item = await this.$store.dispatch('createFilter', {
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: color,
            groupId: groupId,
            })
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''

            eventEmitter.$emit('changeItem', 'createdFilter', item)
            eventEmitter.$emit('changeColorPicker', '')
          }catch (e){
            // console.log('error')
          }
      },
      async toEdit(color,groupId){
        try{
          const item = await this.$store.dispatch('editFilter', {
            id: this.editItem.id,
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: color,
            groupId: groupId,
            })
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''

            eventEmitter.$emit('changeItem', 'updatedFilter', item)
            eventEmitter.$emit('changeColorPicker', '')
          }catch (e){
            // console.log('error')
          }
      },
      async toRemove(){
      try{
            await this.$store.dispatch('removeFilter', this.editItem.id)
            eventEmitter.$emit('changeItem', 'deletedFilter', this.editItem.id)
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''
            this.editItem = {}

          }catch (e){
            // console.log('error')
          }
      },
      selectItemBtnId(selectedItemBtnId){
        if(!this.selectedItemBtnId){
          this.selectedItemBtnId = selectedItemBtnId
        }else{
          this.selectedItemBtnId = ''
        }
      }
    },
    filters:{
      tips(item,groups){
        let groupTitle = 'Без группы'
          for (var i = groups.length - 1; i >= 0; --i) {
            if (groups[i].id === item.groupId) {
              groupTitle = groups[i].title
            }
          }
        return groupTitle
      }
    }
  }
</script>
