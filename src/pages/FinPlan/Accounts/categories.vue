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
        <div v-if="modeBtn === 'toCreateFilter'">
          <colorPicker
          :color="color"
          />
        </div>
        <div v-if="modeBtn && modeBtn !== 'toCreateFilter'">
          <v-autocomplete
            style="min-width: 460px"
            class="pa-1"
            v-model="value"
            :items="items"
            dense
            small
            outlined
            label="Filled"
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
        <div >
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
              @click="button('create')"
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
            @click= "toChangeModeBtn('toCreateFilter')"
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
            @click= "toChangeModeBtn('toCreateCategory')"
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
            @click= "toChangeModeBtn('toCreateSubCategory')"
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
        v-for="n in 25"
        :key="n"
      outlined
      label
      color="teal"
      filter: true
      class="mx-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
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
        v-for="n in 25"
        :key="n"
      label
      color="teal"
      filter: true
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
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
        v-for="n in 25"
        :key="n"
      outlined
      label
      color="teal"
      filter: true
      disabled
      class="ma-1"
      close
      close-icon="mdi-lead-pencil"
      @click:close="toEditTag(tag)"
      @click="changeCheck(tag.id)"
    >
      {{ n * 50 }}
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
    import colorPicker from "@/components/colorPicker"
  export default {
    components:{colorPicker},
    data(){
      return {
        color: '#F44336',
        value: '',
        items: ['foo', 'bar', 'fizz', 'buzz'],
        titleLable: 'Строка поиска',
        commentLable: '',
        createBtn: '',
        modeBtn: '',
        errorBtn: false,
        titleField: '',
        commentField: ''
      }
    },
    methods:{
      toChangeModeBtn(modeBtn){
        this.modeBtn = modeBtn
        switch(modeBtn) {
          case 'toCreateFilter':  // if (x === 'value1')
            this.titleLable = 'Создание фильтра'
            this.commentLable = 'Комментарий к фильтру'
          break
          case 'toCreateCategory':  // if (x === 'value1')
            this.titleLable = 'Создание категории'
            this.commentLable = 'Комментарий к категории'
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
      button(val){
        switch(this.modeBtn) {
          case 'toCreateFilter':  
            this.titleLable = 'Создание фильтра'
            this.commentLable = 'Комментарий к фильтру'
              switch(val){
                case 'create':
                  this.createFilter()
                break
                case 'update':
                  this.updateFilter()
                break
                case 'remove':
                  this.removeFilter()
                break
                case 'cancel':
                  this.cancelCreateFilter()
                break
                default:
                return
              }
            break
          case 'toCreateCategory':  
            this.titleLable = 'Создание категории'
            this.commentLable = 'Комментарий к категории'
            this.createCategory()
            break
          default:
            return
        }
      },
      createFilter(){
        console.log('createFilter')
      },
      updateFilter(){
        console.log('updateFilter')
      },
      removeFilter(){
        console.log('removeFilter')
      },
      cancelCreateFilter(){
        console.log('cancelFilter')
      }
    },
    computed:{
    }
  }
</script>
