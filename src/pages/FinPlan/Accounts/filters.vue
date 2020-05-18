<template>
<div>
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
            :hint="modeBtn ? 'Не менее 3-х и не более 30-ти символов' : ''"
            outlined
            small
            clearable
            :counter="modeBtn ? 30 : false"
            @blur="$v.childTitleField.$touch()"
          >
          </v-text-field>
        </div>
        <div v-if="modeBtn === 'group'">
          <colorPicker
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
          class="pa-1 pb-0"
          :label="commentLable"
          v-model="commentField"
          :error-messages="childCommentFieldErrors"
          dense
          rows="1"
          hint="не более 50 символов"
          outlined
          small
          clearable
          :counter="100"
          @blur="$v.childCommentField.$touch()"

        >
        </v-text-field>
      </div>
      <v-col
      cols="12"
      v-if="modeBtn && modeBtn !== 'group'"
      class="d-flex justify-start pa-0 my-0"
      >
        <v-col
        cols="4"
        class="pa-0 my-0"
        >
          <h3>Типы операций:</h3>
        </v-col>
        <v-col
        class="pa-0 my-0"
        cols="4"
        >
          <v-switch
              class="pa-0 my-0"
              v-model="expenses"
              label="Расходы"
              color="success"
              :error-messages="switchesErrors"
              @change="$v.switches.$touch()"
            ></v-switch>
        </v-col>
        <v-col
        class="pa-0 my-0"
        cols="4"
        >
          <v-switch
          class="pa-0 my-0"
              v-model="entrances"
              label="Поступления"
              color="primary"
              :error-messages="switchesErrors"
              @change="$v.switches.$touch()"
            ></v-switch>
        </v-col>
      </v-col>

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

    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col>
        <v-divider class="my-3"></v-divider>
      </v-col>
      <v-col
        cols="2"
        class="d-flex justify-center"
      >
      <h3> Группы фильтров</h3>
      </v-col>
      <v-col>
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>

    <div class="d-flex justify-center">
    <div class="d-flex justify-center">
      <h3 v-if="!this.groupsArray.length" class="mt-0">Список пуст</h3>
    </div>
  <v-container
        v-if="this.groupsArray.length"
        id="scroll-target"
        style="max-width: 1000px"
        class="d-flex row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
        <v-tooltip
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
      :outlined="MGselectedFiltersGroupId ? false : true"
      style="border-width: 4px"
      text-color="'black'"
      class="mx-1"
      :close="group.id !== 'withoutGroup' ? true : false"
      close-icon= 'mdi-lead-pencil'
      @click:close="toChangeModeBtn('group', 'edit', group)"
      @click="selectedFiltersGroupId(group.id)"
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
      </v-container>
  </div>
  <div >
  <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col
      >
        <v-divider class="my-3"></v-divider>
      </v-col>
      <v-col
        cols="1"
        class="d-flex justify-center"
      >
      <h3> Фильтры</h3>

      </v-col>
      <v-col

      >
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>
  <div class="d-flex justify-space-between">
    <div>
    <h2 class="mx-0 mt-4 pr-0">Фильтры:</h2>
    </div>
    <div>
    <h3 v-if="!this.sortedFullItemsArrayByTitleField.length" class="ma-4 pr-0">Список пуст</h3>
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
        v-for="item in sortedFullItemsArrayByTitleField"
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
  <filtersTable
  :itemsArray="sortedFullItemsArrayByTitleField"
  :toChangeModeBtn="toChangeModeBtn"
  :modeBtn="modeBtn"
  />




  </div>
</template>
<script>
  // import {eventEmitter} from '@/main'
  import { validationMixin } from 'vuelidate'
  import utilits from "@/pages/FinPlan/mixins/utilits.js"
  import colorPicker from "@/components/colorPicker"
  import filtersTable from "@/pages/FinPlan/Accounts/filtersTable"
  export default {
    mixins: [
      validationMixin,
      utilits
    ],
    validations: {
      childTitleField: {
        unique: function(){
          return this.valСhildTitleField.unique
          },
        length: function(){
          return this.valСhildTitleField.length
          },
      },
      childCommentField: {
        length: function(){
          return this.valСhildComentField.length
          },
      },
      switches:{
        empty: function(){
          return this.valEmptySwitches
          },
      }
    },
    components:{colorPicker, filtersTable},
    data(){
      return {
        mode:'',
        color:'',
        modeBtn: '',
        editItem: {},
        selectField: 'withoutGroup',
        type: '',
        titleField: '',
        titleLable: 'Строка поиска',
        commentField: '',
        commentLable: '',
        expenses: true,
        entrances: true,
        errorBtn: false,
        itemsWithWGGroup: false,
      }
    },
    created(){
      // this.selectField = this.$store.getters.selectedFiltersGroupId
    },
    props:{
      params:{
        type: Object
      }
    },
    computed:{
      MGselectedFiltersGroupId(){
        return this.$store.getters.selectedFiltersGroupId
      },
      switches(){
        return this.expenses || this.entrances
      },
      valСhildTitleField(){
        let valСhildTitleField = {}
        let unique = true
        let length = true
        let childTitleField = this.childTitleField
        let editItem = this.editItem
        let GroupsArray = []
        GroupsArray.push({id:'withoutGroup',color:'',comment:'',groupId:'',title:'Без группы',type:'group'})
        GroupsArray= GroupsArray.concat(this.fullGroupsArray)
        let ItemsArray = []
        ItemsArray = ItemsArray.concat(this.fullItemsArray)
        if(this.mode === 'edit'){
          GroupsArray = GroupsArray.filter((item)=>{
                return (item.title !== editItem.title)})
          ItemsArray = ItemsArray.filter((item)=>{
                return (item.title !== editItem.title)})
        }
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
        this.childTitleField.length > 2 && this.childTitleField.length < 31 ? length = true : length = false
        if(this.modeBtn){
          valСhildTitleField.unique = unique
          valСhildTitleField.length = length
        }else{
          valСhildTitleField.unique = true
          valСhildTitleField.length = true
        }
        return valСhildTitleField
      },
      valСhildComentField(){
        let valСhildCommentField = {}
        let length = true
        this.childCommentField.length < 100 ? length = true : length = false
        valСhildCommentField.length = length
        return valСhildCommentField
      },
      valEmptySwitches(){
        let valEmptySwitches = true
        !this.expenses && !this.entrances ? valEmptySwitches = false : valEmptySwitches = true
        return valEmptySwitches
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
        let errors = []
        if (!this.$v.childTitleField.$dirty) return errors
        !this.$v.childTitleField.length && errors.push('Не менее 3-х и не более 30-ти символов')
        !this.$v.childTitleField.unique && errors.push('Наименование уже существует')
        return errors
      },
      childCommentFieldErrors(){
        let errors = []
        if (!this.$v.childCommentField.$dirty) return errors
        !this.$v.childCommentField.length && errors.push('Не более 100 символов')
        return errors
      },
      switchesErrors(){
        let errors = []
        if (!this.$v.switches.$dirty) return errors
        !this.$v.switches.empty && errors.push('Выбрать минимум одно значение')
        return errors
      },
      fullItemsAndGroupsArray(){
        return this.$store.getters.filters
      },
      fullGroupsArray(){  // создаем массив групп внутри функции
      return this.fullItemsAndGroupsArray.filter((item)=>{
          return (item.type === 'group')
          })
      },
      fullItemsArray(){ // создаем массив айтемов с учетом пустых и битых gropId с присвоением цвета
        let fullItemsArray = this.fullItemsAndGroupsArray.filter((item)=>{
          return (item.type === 'item')
          })
          let countItemsWithGroup = 0
          for (var i in fullItemsArray) {
            let countItemsWithoutGroup = 0
            for (var k in this.fullGroupsArray) {
              if(fullItemsArray[i].groupId === this.fullGroupsArray[k].id){
                fullItemsArray[i].color = this.fullGroupsArray[k].color // присваиваем айтемам цвет групп
                fullItemsArray[i].groupTitle = this.fullGroupsArray[k].title // присваиваем айтемам имена групп
                countItemsWithoutGroup++ // если ++, то у айтема есть группа
              }
            }
            if(!countItemsWithoutGroup){fullItemsArray[i].groupId = 'withoutGroup'} //присваиваем айтему(withoutGroup или битый groupId) ,groupId = withoutGroup
            if(fullItemsArray[i].groupId === 'withoutGroup'){
              fullItemsArray[i].color = ''
              fullItemsArray[i].groupTitle = 'Без группы'
              countItemsWithGroup++
            }
          }
          if(countItemsWithGroup){
            this.toChangeItemsWithWGGroup(true)
          }else{
            this.toChangeItemsWithWGGroup(false)
          }
          if(this.MGselectedFiltersGroupId){
            fullItemsArray = this.fullItemsAndGroupsArray.filter((item)=>{
              return (item.groupId === this.MGselectedFiltersGroupId)})
          }
          // fullItemsArray =  fullItemsArray.filter((item)=>{ //фильтрация по titleField
          // return (item.title.toUpperCase()).match(this.childTitleField.toUpperCase())
          // })
          return fullItemsArray

      },
      sortedFullItemsArrayByTitleField(){
        if(this.modeBtn === 'group'){
          let arr = []
          for (var i = this.fullItemsArray.length - 1; i >= 0; --i) {
            for (var k = this.groupsArray.length - 1; k >= 0; --k) {
              if(this.fullItemsArray[i].groupId === this.groupsArray[k].id){
                arr.push(this.fullItemsArray[i])
              }
            }
          }
          return arr
        }else{
          return  this.fullItemsArray.filter((item)=>{ //фильтрация по titleField
            return ((item.title.toLowerCase())
                     .includes(this.translate(this.childTitleField).ru.toLowerCase(),"") ||
                      (item.title.toLowerCase())
                        .includes(this.translate(this.childTitleField).en.toLowerCase(),""))
            })
        }
      },
      groupsArray(){
        let groupsArray = []
        if(this.itemsWithWGGroup){
          groupsArray.push({id:'withoutGroup',color:'',comment:'111',groupId:'',title:'Без группы',type:'group'})
        }
        groupsArray= groupsArray.concat(this.fullGroupsArray)
        if(this.childTitleField){
          if(this.modeBtn === 'group'){
            groupsArray = this.filteredGroupsArrayBysortedGroupArrayByTitleField() // фильтрует массив групп по массиву групп с учетом значения в titleField
          }else{
            groupsArray = this.filteredGroupsArrayBysortedFullItemsArrayByTitleField(groupsArray) // фильтрует массив групп по массиву айтемов с учетом значения в titleField
          }
        }
        if(this.MGselectedFiltersGroupId){ // формирует массив групп с учетом нажатой группы
          const selectedFiltersGroupId = this.MGselectedFiltersGroupId
          groupsArray = groupsArray.filter((item)=>{
            return (item.id === selectedFiltersGroupId)})
        }
        return groupsArray
      },
      colorsIgnore(){
        let arr = []
        for (let k in this.fullGroupsArray) {
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
      filteredGroupsArrayBysortedFullItemsArrayByTitleField(groupsArray){ // получает computed fullItemsArray и возвращает фильтрованый список групп
        let newGroupsArray = []
        const uniqueArray = [...new Set(this.sortedFullItemsArrayByTitleField.map(item => item.groupId))]; // получаем массив уникальных id по groupId
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
      filteredGroupsArrayBysortedGroupArrayByTitleField(){
        let newGroupsArray = []
        // const uniqueArray = [...new Set(this.fullItemsArray.map(item => item.groupId))]; // получаем массив уникальных id по groupId
        // for(var h = 0; h < uniqueArray.length; h++){
        //   if(uniqueArray[h] === 'withoutGroup'){
        //     }
        // }
          newGroupsArray.push({id:'withoutGroup',color:'',comment:'',groupId:'',title:'Без группы',type:'group'})
        newGroupsArray = newGroupsArray.concat(this.fullGroupsArray)
        newGroupsArray =  newGroupsArray.filter((item)=>{
          return ((item.title.toLowerCase()).includes(this.translate(this.childTitleField).ru.toLowerCase()) ||
            (item.title.toLowerCase()).includes(this.translate(this.childTitleField).en.toLowerCase()))
          })
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
              this.$store.dispatch('colorPicker', this.editItem.color)
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
              this.expenses = this.editItem.expenses
              this.entrances = this.editItem.entrances
            }
            break
          default:
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            this.selectLable = ''
            this.expenses = true
            this.entrances = true
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
                color = this.$store.getters.colorPicker
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
                color = this.$store.getters.colorPicker
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
            if(this.MGselectedFiltersGroupId){
              this.selectField = this.MGselectedFiltersGroupId
            }else{
              this.selectField = 'withoutGroup'
            }
            // this.selectField = ''
            this.editItem = {}
            this.titleField = ''
            this.commentField = ''
            this.expenses = true
            this.entrances = true
            this.$store.dispatch('colorPicker', '')
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
            expenses: this.expenses,
            entrances: this.entrances,
            })
            this.createdFilter(item)
          }catch (e){
            // console.log('error')
          }
      },
      createdFilter(item){
        let filters = this.$store.getters.filters
        filters.push(item)
        this.$store.dispatch('updateFilters', filters)
        this.titleField = ''
        this.commentField = ''
        this.modeBtn = ''
        this.expenses = true
        this.entrances = true
        this.$store.dispatch('colorPicker', '')
        //     // this.params.filters = this.sortObjectsArray(this.$store.getters.filters, 'title')
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
            expenses: this.expenses,
            entrances: this.entrances,
            })
          this.updatedFilter(item)
          }catch (e){
            // console.log('error')
          }
      },
      updatedFilter(item){
        let filters = this.$store.getters.filters
        filters = filters.map(filter => filter.id === item.id ? item : filter)
        this.$store.dispatch('updateFilters', filters)
        this.titleField = ''
        this.commentsField = ''
        this.modeBtn = ''
        this.expenses = true
        this.entrances = true
        this.$store.dispatch('colorPicker', '')
      },
      async toRemove(){
        try{
          await this.$store.dispatch('removeFilter', this.editItem.id)
          this.deletedFilter(this.editItem.id)
          this.titleField = ''
          this.commentsField = ''
          this.modeBtn = ''
          this.editItem = {}
        }catch (e){
          // console.log('error')
        }
      },
      deletedFilter(id) {
        let filters = this.$store.getters.filters
        filters = filters.filter(filter => filter.id !== id)
        this.$store.dispatch('updateFilters', filters)
      },
      selectedFiltersGroupId(selectedFiltersGroupId){
        let changeSelectedFiltersGroupId = ''
        if(!this.MGselectedFiltersGroupId){
          changeSelectedFiltersGroupId = selectedFiltersGroupId
        }else{
          changeSelectedFiltersGroupId = ''
        }
        if(changeSelectedFiltersGroupId){
          this.selectField =  changeSelectedFiltersGroupId
        }else{
          this.selectField =  'withoutGroup'
        }
        this.$store.dispatch('selectedFiltersGroupId', changeSelectedFiltersGroupId)
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
