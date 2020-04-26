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
            hint="3-16 символов"
            outlined
            small
            clearable
            :counter="15"
          >
          </v-text-field>
        </div>
        <div v-if="modeBtn === 'filterGroup'">
          <colorPicker
          :params="params"
          :editItem="editItem"
          :colorsIgnore="colorsIgnore"
          />
        </div>
        <div v-if="modeBtn && modeBtn !== 'filterGroup'">
          <v-autocomplete
            style="min-width: 460px"
            class="pa-1"
            v-model="selectField"
            :auto-select-first="true"
            name="id"
            no-data-text="Список пуст"
            :items="selectFieldArray"
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
            @click= "toChangeModeBtn('filterGroup', 'create')"
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
            @click= "toChangeModeBtn('filter', 'create')"
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
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="d-flex row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
        <v-tooltip 
        max-width= 400
        top
        v-for="Gfilter in filtersGroupArray"
        :key="Gfilter.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
      v-on="on"
      label
      :color="Gfilter.color"
      :text-color="'black'"
      filter: true
      class="mx-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toChangeModeBtn('filterGroup', 'edit', Gfilter)"
      @click="changeCheck(tag.id)"
    >
      {{ Gfilter.title }}
    </v-chip>
    </template>
      <span 
      >
      <div v-if="Gfilter.comment">{{Gfilter.comment}}</div>
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
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
          <v-tooltip 
        max-width= 400
        top
        v-for="fil in filtersArray"
        :key="fil.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
        v-on="on"
      label
      :color="fil.color"
      filter: true
      class="ma-1"
      close
      :text-color="'black'"
      close-icon="mdi-lead-pencil"
      @click:close="toChangeModeBtn('filter', 'edit', fil)"
      @click="changeCheck(tag.id)"
    >
      {{ fil.title }}
    </v-chip>
    </template>
      <span 
      >
      <div >Группа фильтров: {{ fil.filterGroupId | tips(params.filters) }} </div>
      <div >-----------------</div>
      <div v-if="fil.comment">{{fil.comment}}</div>
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
  import {eventEmitter} from '@/main'
  import colorPicker from "@/components/colorPicker"
  export default {
    components:{colorPicker},
    data(){
      return {
        editItem: {},
        color: '#F44336',
        selectField: '',
        selectFieldArray: [],
        type: '',
        titleLable: 'Строка поиска',
        commentLable: '',
        modeBtn: '',
        mode:'',
        errorBtn: false,
        titleField: '',
        commentField: ''
      }
    },
    props:{
      params:{
        type: Object
      }
    },
    computed:{
      colorsIgnore(){
        let arr = [] 
        for (var k = this.params.filters.length - 1; k >= 0; --k) {
          if(this.params.filters[k].type === 'filterGroup'){
            arr.push(this.params.filters[k].color)
          }
        }
          return arr
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
      fullFiltersArray(){
        let arr = this.params.filters
          // присваиваем цвет
        for (var i = this.params.filters.length - 1; i >= 0; --i) {
          for (var k = arr.length - 1; k >= 0; --k) {
            if (this.params.filters[i].id === arr[k].filterGroupId) {
              arr[k].color = this.params.filters[i].color
            }
          }
        }
        return arr
      },
      filtersGroupArray(){
        return this.fullFiltersArray.filter((cat)=>{
          return (cat.type === 'filterGroup')
          })
      },
      filtersArray(){
        return this.fullFiltersArray.filter((cat)=>{
          return (cat.type === 'filter')
          })
      },
    },
    methods:{
      toChangeModeBtn(modeBtn, mode, editItem){
        this.modeBtn = modeBtn
        this.mode = mode
        switch(this.modeBtn) {
          case 'filterGroup':  
            if(this.mode === 'create'){
              this.titleLable = 'Создание группы фильтров'
              this.commentLable = 'Комментарий к группе фильтров'
              this.selectFieldArray = []
            } else { // edit
              this.editItem = editItem
              eventEmitter.$emit('changeColorPicker', this.editItem.color)
              this.titleLable = 'Изменение группы фильтров'
              this.commentLable = 'Комментарий к группе фильтров'
              this.selectFieldArray = []
              this.titleField = this.editItem.title
              this.commentField = this.editItem.comment
            }
            break
          case 'filter':
            if(this.mode === 'create'){
              this.titleLable = 'Создание фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = this.filtersGroupArray
            } else { // edit
              this.titleLable = 'Изменение фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = this.filtersGroupArray
              this.editItem = editItem
              this.titleField = this.editItem.title
              this.selectField = this.editItem.filterGroupId
              this.commentField = this.editItem.comment
            }
            break
          default:
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            this.selectLable = ''
            this.selectFieldArray = []
          break
        }
      },
      button(val){
        let color = ''
        let filterId = ''
        let categoryId = ''
        switch(val) {
          case 'create':
            switch(this.modeBtn){
              case 'filterGroup':
                color = this.params.colorPicker,
                filterId = '',
                categoryId = ''
                break
              case 'filter':
                color = '',
                filterId = this.selectField,
                categoryId = ''
                break
            }
              this.toCreate(color,filterId,categoryId)
            break
          case 'edit':
            break
          case 'remove':
            break
          default: // cancel
            this.modeBtn = ''
            this.titleLable = 'Строка поиска'
            this.commentLable = ''
            this.selectLable = ''
            this.selectFieldArray = []
            this.editItem = {}
            this.titleField = ''
            eventEmitter.$emit('changeColorPicker', '')
          break
        }
      },
      async toCreate(color,filterGroupId,filterId){
        try{
          const filter = await this.$store.dispatch('createFilter', {
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: color,
            filterGroupId: filterGroupId,
            filterId: filterId
            })
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''

            eventEmitter.$emit('changeFilter', 'createdFilter', filter)
            eventEmitter.$emit('changeColorPicker', '')
          }catch (e){
            // console.log('error')
          }
      },
      updateFilter(){
        console.log('updateFilter')
      },
      removeFilter(){
        console.log('removeFilter')
      },
      updateCategory(){
        console.log('updateFilter')
      },
      removeCategory(){
        console.log('removeFilter')
      },
    },
    filters:{
      tips(filterId,filters){
        let filterGroupTitle = ''
          for (var i = filters.length - 1; i >= 0; --i) {
            if (filters[i].id === filterId) {
              filterGroupTitle = filters[i].title
            }
          }
        return filterGroupTitle
      }
    }
  }
</script>
