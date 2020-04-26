<template>
<div>
  modeBtn:{{modeBtn}} /
  mode:{{mode}}
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
        <div v-if="modeBtn === 'filter'">
          <colorPicker
          :color="params.editCategory.filter.color"
          />
        </div>
        <div v-if="modeBtn && modeBtn !== 'filter'">
          <v-autocomplete
            style="min-width: 460px"
            class="pa-1"
            v-model="selectField"
            name="id"
            :items="selectFieldArray"
            item-text="title"
            item-value="id"
            dense
            small
            outlined
            :label="selectLable"
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
            @click= "toChangeModeBtn('filter', 'create')"
            :disabled="errorBtn"
            >
              Создать фильтр
            </v-btn>
          </div> 
          <div 
         class="pa-1">
            <v-btn
            width=""
            class="mx-1"
            outlined
            color="primary" 
            @click= "toChangeModeBtn('category', 'create')"
            :disabled="errorBtn"
            >
            Создать категорию
          </v-btn>
          </div>
          <div 
         class="pa-1">
            <v-btn
            width=""
            class="mx-1"
            color="primary" 
            @click= "toChangeModeBtn('subCategory', 'create')"
            :disabled="errorBtn"
            >
            Создать подкатегорию
          </v-btn>
        </div>  
      </div>
    </div>
  </div>
  <v-divider class="mx-4"></v-divider>
    <div class="d-flex justify-space-between">
  <div>
    <h2 class="ma-4 pr-0">Фильтры:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="d-flex row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="filter in filtersArray"
        :key="filter.id"
      label
      :color="filter.color"
      :text-color="'white'"
      filter: true
      class="mx-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ filter.title }}
    </v-chip>
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
    <h2 class="ma-4 pr-0">Категории:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="cat in categoriesArray"
        :key="cat.id"
      label
      :color="cat.color"
      filter: true
      class="ma-1"
      close
      :text-color="'white'"
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ cat.title }}
    </v-chip>
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
    <h2 class="ma-4 pr-0">Подкатегории:</h2>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 800px"
        class="row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
  
        <v-chip
        v-for="scat in subCategoriesArray"
        :key="scat.id"
      outlined
      label
      :text-color="'black'"
      :color="scat.color"
      filter: true
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ scat.title }}
    </v-chip>
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
        color: '#F44336',
        selectField: '',
        selectFieldArray: [],
        type: '',
        titleLable: 'Строка поиска',
        selectLable: '',
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
      fullCategoriesArray(){
        let arr = this.params.categories
          // присваиваем цвет
        for (var i = this.params.categories.length - 1; i >= 0; --i) {
          for (var k = arr.length - 1; k >= 0; --k) {
            if (this.params.categories[i].id === arr[k].filterId) {
              arr[k].color = this.params.categories[i].color
            }
          }
        }
        return arr
      },
      filtersArray(){
        return this.fullCategoriesArray.filter((cat)=>{
          return (cat.type === 'filter')
          })
      },
      categoriesArray(){
        return this.fullCategoriesArray.filter((cat)=>{
          return (cat.type === 'category')
          })
      },
      subCategoriesArray(){
        return this.fullCategoriesArray.filter((cat)=>{
          return (cat.type === 'subCategory')
          })
      },
    },
    methods:{
      toChangeModeBtn(modeBtn, mode){
        this.modeBtn = modeBtn
        this.mode = mode
        switch(this.modeBtn) {
          case 'filter':  
            if(this.mode === 'create'){
              this.titleLable = 'Создание фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = []
            } else {
              this.titleLable = 'Изменение фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = []
            }
            break
          case 'category':
            if(this.mode === 'create'){
              this.titleLable = 'Создание категории'
              this.commentLable = 'Комментарий к категории'
              this.selectFieldArray = this.filtersArray
            } else {
              this.titleLable = 'Изменение категории'
              this.commentLable = 'Комментарий к категории'
              this.selectFieldArray = this.filtersArray
            }
            break
          case 'subCategory':
             if(this.mode === 'create'){
              this.titleLable = 'Создание фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = this.categoriesArray
            } else {
              this.titleLable = 'Изменение фильтра'
              this.commentLable = 'Комментарий к фильтру'
              this.selectFieldArray = this.categoriesArray
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
              case 'filter':
                color = this.params.editCategory.filter.color,
                filterId = '',
                categoryId = ''
                break
              case 'category':
                color = '',
                filterId = this.selectField,
                categoryId = ''
                break
              case 'subCategory':
                filterId = this.fullCategoriesArray.filter((cat)=>{
                  return (cat.id === this.selectField)
                  })
                filterId = filterId.filter((cat)=>{
                  return (cat.id === this.selectField)
                  })
                  console.log(filterId[0].filterId)
                color = '',
                filterId = filterId[0].filterId,
                categoryId = this.selectField
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
          break
        }
      },
      async toCreate(color,filterId,categoryId){
        try{
          const category = await this.$store.dispatch('createCategory', {
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: color,
            filterId: filterId,
            categoryId: categoryId
            })
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''

            eventEmitter.$emit('changeCategory', 'createdCategory', category)
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
      toCancelCreateFilter(){
        this.modeBtn = ''
        this.commentsField = ''
      },
      
      updateCategory(){
        console.log('updateFilter')
      },
      removeCategory(){
        console.log('removeFilter')
      },
      toCancelCreateCategory(){
        this.modeBtn = ''
        this.commentsField = ''
      }
    },
  }
</script>
