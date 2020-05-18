<template>
<div>
  <!-- <pre>{{fullObjectsArray}}</pre> -->
  <v-tabs-items v-model="tabModeBtn">
    <v-tab-item
      :value="'default'"
      >
      <v-card
        flat
      >
        <div class="d-flex justify-start justify-space-between">
          <div class="d-flex justify-space-between">
            <v-text-field
              class="pa-1"
              style="min-width: 280px"
              label="Строка поиска"
              type: String
              v-model="titleField"
              dense
              outlined
              small
              clearable
            >
            </v-text-field>
          </div>
          <div class="d-flex" >
            <div v-if="modeBtn === ''" class="d-flex flex-wrap justify-space-around">
                <div
                  class="pa-1"
                >
                  <v-btn
                  class="mx-1"
                  outlined
                  color="primary"
                  @click= "toChangeModeBtn('section', 'create')"
                  >
                    Создать целевой раздел
                  </v-btn>
                </div>
                <div
                  class="pa-1"
                >
                  <v-btn
                  class="mx-1"
                  outlined
                  color="primary"
                  @click= "toChangeModeBtn('group', 'create')"
                  >
                    Создать группу целей
                  </v-btn>
                </div>
                <div
                  class="pa-1"
                >
                  <v-btn
                  class="mx-1"
                  outlined
                  color="primary"
                  @click= "toChangeModeBtn('item', 'create')"
                  >
                  Создать цель
                </v-btn>
                </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-tab-item>


      <v-tab-item
      :value="'section'"
      >
      <v-card
          flat
      >
      <div class="d-flex justify-start justify-space-between">
          <div>
            <div class="d-flex justify-space-between">
              <div>
                <v-text-field
                  class="pa-1"
                  style="min-width: 400px"
                  label="Наименование целевого раздела"
                  type: String
                  v-model="titleField"
                  dense
                  :error-messages="childTitleFieldErrors"
                  hint="Не менее 3-х и не более 15-ти символов"
                  outlined
                  small
                  clearable
                  counter="15"
                  @blur="$v.childTitleField.$touch()"
                >
                </v-text-field>
              </div>
              <div>
                <colorPicker
                :params="params"
                :editItem="editItem"
                :colorsIgnore="colorsIgnore"
                />
              </div>
            </div>
            <div v-if="modeBtn">
              <v-text-field
                class="pa-1 pb-0"
                label="Комментарий  целевому разделу"
                v-model="commentField"
                :error-messages="childCommentFieldErrors"
                dense
                rows="1"
                hint="не более 100 символов"
                outlined
                small
                clearable
                counter="100"
                @blur="$v.childCommentField.$touch()"
              >
              </v-text-field>
            </div>
            <v-col
              cols="12"
              v-if="modeBtn"
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
                >
                </v-switch>
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
                >
                </v-switch>
              </v-col>
            </v-col>
          </div>

          <div class="d-flex" >
            <div class="d-flex justify-space-around flex-column align-center ">
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
                    >
                    Сохранить
                  </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      </v-tab-item>


      <v-tab-item
      :value="'group'"
      >
      <v-card
          flat
        >
      <div class="d-flex justify-start justify-space-between">
          <div>
            <div class="d-flex justify-space-between">
              <div>
                <v-text-field
                  class="pa-1"
                  style="min-width: 400px"
                  label="Наименование цели"
                  type: String
                  v-model="titleField"
                  dense
                  :error-messages="childTitleFieldErrors"
                  hint="Не менее 3-х и не более 30-ти символов"
                  outlined
                  small
                  clearable
                  counter="30"
                  @blur="$v.childTitleField.$touch()"
                >
                </v-text-field>
              </div>
              <div>
                 <v-text-field
                 :error-messages="selectFieldErrors"
                  class="pa-1"
                  value="id"
                  v-model="selectField"
                  label="Выберите целевой раздел в левом меню"
                  outlined
                  readonly
                  dense
                  @blur="$v.valSelectField.$touch()"
                ></v-text-field>
                <v-autocomplete
                  style="min-width: 460px"
                  class="pa-1"
                  v-model="selectField"
                  :auto-select-first="true"
                  name="id"
                  no-data-text="Список пуст"
                  :items="sectionsObjectsArray"
                  item-text="title"
                  item-value="id"
                  dense
                  small
                  outlined
                  label="Выберите целевой раздел"
                ></v-autocomplete>
              </div>
            </div>
            <div>
              <v-text-field
                class="pa-1 pb-0"
                label="Комментарий к целевому разделу"
                v-model="commentField"
                :error-messages="childCommentFieldErrors"
                dense
                rows="1"
                hint="не более 100 символов"
                outlined
                small
                clearable
                counter="100"
                @blur="$v.childCommentField.$touch()"

              >
              </v-text-field>
            </div>
            <v-col
              cols="12"
              v-if="modeBtn"
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
            <div class="d-flex justify-space-around flex-column align-center ">
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
                    >
                    Сохранить
                  </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
      </v-tab-item>



      <v-tab-item
      :value="'item'"
      >
        <v-card
          flat
        >
<div class="d-flex justify-start justify-space-between">
    <div>
      <div class="d-flex justify-space-between">
        <div>
          <v-text-field
            class="pa-1"
            :style="modeBtn ? 'min-width: 400px' : 'min-width: 280px'"
            :label="titleLable"
            type: String
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
        <div v-if="modeBtn === 'section'">
          <colorPicker
          :params="params"
          :editItem="editItem"
          :colorsIgnore="colorsIgnore"
          />
        </div>
        <div v-if="modeBtn && modeBtn !== 'section'" >
          <v-autocomplete
            style="min-width: 460px"
            class="pa-1"
            v-model="selectField"
            :auto-select-first="true"
            name="id"
            no-data-text="Список пуст"
            :items="groupsObjectsArray"
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
      v-if="modeBtn && modeBtn !== 'section'"
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
            @click= "toChangeModeBtn('section', 'create')"
            :disabled="errorBtn"
            >
              Создать целевой раздел
            </v-btn>
          </div>
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
              Создать группу целей
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
            Создать цель
          </v-btn>
          </div>
      </div>
    </div>
  </div>
      </v-card>
      </v-tab-item>
    </v-tabs-items>









    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col>
        <v-divider class="my-3"></v-divider>
      </v-col>
      <v-col
        cols="2"
        class="d-flex justify-center"
      >
      <v-chip
      small
      color="teal"
      :text-color= "searchBtn === 'sections' ? 'white' : 'black'"
      :outlined= "searchBtn === 'sections'"
      @click="toChangeSearchBtn('sections')"
      >
      <h3>Целевые разделы</h3>
      </v-chip>
      </v-col>
      <v-col>
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>
    <div class="d-flex justify-center">
    <div class="d-flex justify-center">
      <h3 v-if="!this.sectionsObjectsArray.length" class="mt-0">Список пуст</h3>
    </div>
  <v-container
        v-if="this.sectionsObjectsArray.length"
        id="scroll-target"
        style="max-width: 1000px"
        class="d-flex row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
        <v-tooltip
        top
        v-for="item in sectionsObjectsArray"
        :key="item.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
      v-on="on"
      label
      :ripple="false"
      :color="item.color"
      :outlined="!params.selectedItemBtnId"
      style="border-width: 4px"
      text-color="'black'"
      class="mx-1"
      :close="item.role !== 'admin'"
      close-icon= 'mdi-lead-pencil'
      @click:close="toChangeModeBtn('section', 'edit', item)"
      @click="selectItemBtnId(item.id)"
    >
      {{ item.title }}
    </v-chip>
    </template>
      <span
      >
      <div v-if="item.comment">{{item.comment}}
      </div>
      <div v-else>Нет комментариев</div>
      </span>
    </v-tooltip>
  </div>
      </v-container>
  </div>



    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col>
        <v-divider class="my-3"></v-divider>
      </v-col>
      <v-col
        cols="2"
        class="d-flex justify-center"
      >
      <v-chip
      small
      color="teal"
      :text-color= "searchBtn === 'groups' ? 'white' : 'black'"
      :outlined= "searchBtn === 'groups' ? false : true"
      @click="toChangeSearchBtn('groups')"
      >
      <h3>Целевые группы</h3>
      </v-chip>
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
          v-for="group in groupsObjectsArray"
          :key="group.id"
          >
            <template v-slot:activator="{ on }">
              <v-chip
                v-on="on"
                label
                :ripple="false"
                :color="group.color"
                :outlined="params.selectedItemBtnId ? false : true"
                :style="'border-width: 4px;' + 'border-style:' + group.border"
                text-color="'black'"
                class="mx-1"
                :close="group.role !== 'admin' ? true : false"
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
      <v-chip
      small
      color="teal"
      :text-color= "searchBtn === 'items' ? 'white' : 'black'"
      :outlined= "searchBtn === 'items' ? false : true"
      @click="toChangeSearchBtn('items')"
      >
      <h3>Цели</h3>
      </v-chip>

      </v-col>
      <v-col

      >
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>
    <div class="d-flex justify-center">
    <div class="d-flex justify-center">
    <h3 v-if="!this.itemsArray.length" class="ma-4 pr-0">Список пуст</h3>
    </div>
  <v-container
        id="scroll-target"
        style="max-height: 100px; max-width: 1000px"
        class="row my-1 mx-2 pt-1 overflow-x-auto"
      >
<div class="d-flex ">
          <v-tooltip
        max-width= 400
        top
        v-for="item in itemsArray"
        :key="item.id"
    >
      <template v-slot:activator="{ on }">
        <v-chip
        v-on="on"
        outlined
        :style="'border-width: 4px;' + 'border-style:' + item.border"
      label
      :color="item.color"
      text-color="'black'"
      filter: true
      class="ma-1"
      :close="item.role !== 'admin' ? true : false"
      close-icon="mdi-lead-pencil"
      @click:close="toChangeModeBtn('item', 'edit', item)"
      @click="changeCheck(tag.id)"
    >
      {{ item.title }}
    </v-chip>
    </template>
      <span
      >
      <div >Целевая группа: {{ item | tips(fullGroupsArray) }} </div>
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
  <div>
    <v-row no-gutters style="flex-wrap: nowrap;">
      <v-col
      >
        <v-divider class="my-3"></v-divider>
      </v-col>
      <v-col
        cols="6"
        class="d-flex justify-center"
      >
      <v-chip
      class="mx-2"
      small
      color="teal"
      :text-color= "targetTable === 'sections' ? 'white' : 'black'"
      :outlined= "targetTable === 'sections' ? false : true"
      @click="toChangeTargetTable('sections')"
      >
      <h3>Целевые разделы</h3>
      </v-chip>
      <v-chip
      class="mx-2"
      small
      color="teal"
      :text-color= "targetTable === 'groups' ? 'white' : 'black'"
      :outlined= "targetTable === 'groups' ? false : true"
      @click="toChangeTargetTable('groups')"
      >
      <h3>Целевые группы</h3>
      </v-chip>
      <v-chip
      class="mx-2"
      small
      color="teal"
      :text-color= "targetTable === 'targets' ? 'white' : 'black'"
      :outlined= "targetTable === 'targets' ? false : true"
      @click="toChangeTargetTable('targets')"
      >
      <h3>Цели</h3>
      </v-chip>

      </v-col>
      <v-col

      >
        <v-divider class="my-3"></v-divider>
      </v-col>
    </v-row>

    <targetsTable
    :targetTable="targetTable"
    :itemsArray="params.targets"
    :toChangeModeBtn="toChangeModeBtn"
    :modeBtn="modeBtn"
    :params="params"
    />
  </div>




  </div>
</template>
<script>
  import ruEnSearch from '@/store/components/ruEnSearch.js'
  import { validationMixin } from 'vuelidate'
  import {eventEmitter} from '@/main'
  import colorPicker from "@/components/colorPicker"
  import targetsTable from "@/pages/FinPlan/Accounts/targetsTable"
  export default {
    mixins: [validationMixin, ruEnSearch],
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
      selectField: {
        select: function(){
          if(this.selectField){
            return false
          }else{
            return true
          }
        }
      },
      switches:{
        empty: function(){
          return this.valEmptySwitches
          },
      }
    },
    components:{colorPicker, targetsTable},
    data(){
      return {
        targetTable: 'targets',
        mode:'',
        color:'',
        modeBtn: '',
        editItem: {},
        type: '',
        titleField: '',
        titleLable: 'Строка поиска',
        selectLable: '',
        commentField: '',
        commentLable: '',
        expenses: true,
        entrances: true,
        errorBtn: false,
        itemsWithWGGroup: false,
        searchBtn: 'items'
        // rules
        // titleFieldRules: [
        // v => !!v || 'Обязательное поле',
        // v => (v && v.length > 10) || 'Не менее 10 символов',
        // ],
        // titleErrors:[111,222]
      }
    },
    created(){
      if(this.params.selectedTarget){
        this.selectField = this.params.selectedTarget.title
      }
    },
    props:{
      params:{
        type: Object
      }
    },
    computed:{
      selectField:{
        get: function () {
          let val=''
        if(this.params.selectedTarget.type === 'section'){
          val = this.params.selectedTarget.title
        }else{
          val=''
        }
        return val
        },
        set: function () {
          return ''
          // https://vuejs.org/v2/guide/computed.html#Computed-Setter
        }
      },
      tabModeBtn(){
        if(this.modeBtn){
          return this.modeBtn
        }else{
          return 'default'
        }
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
      selectFieldErrors(){
        let errors = []
        if (!this.$v.selectField.$dirty) return errors
        !this.$v.selectField.select && errors.push('Выберите раздел в левом меню')
        return errors
      },
      switchesErrors(){
        let errors = []
        if (!this.$v.switches.$dirty) return errors
        !this.$v.switches.empty && errors.push('Выбрать минимум одно значение')
        return errors
      },
      fullObjectsArray(){ // создает массив всех айтемов с присвоением цвета, и битых групп.
        let fullArrayItems = this.params.targets
        // let colorsArray = this.$store.getters.colorsArray.map(item => item.color).filter(x => !this.colorsIgnore.includes(x))
        // создаем массив имеющихся sections
        // const sectionsArray = fullArray.map(o => o.type === '').filter(x => !this.colorsIgnore.includes(x))

        let sectionsArray = fullArrayItems.filter(item => item.type === 'section')
        let groupsArray = fullArrayItems.filter(item => item.type === 'group')
        let itemsArray = fullArrayItems.filter(item => item.type === 'item')
        // const colorsArray = this.params.colorsArray
        // console.log(this.params.colorsArray)
        // ищем битые разделы у групп

        groupsArray.forEach((group) => {
          let withSection = sectionsArray.filter(sectionItem => { // массив групп с небитыми разделами
            if(sectionItem.id === group.sectionId){
              group.color = sectionItem.color // присваивает группе цвет раздела
              group.border = 'solid'
              return true
            }else{
              return false
            }
          })
          if(!withSection.length){
            group.sectionId = 'withoutSection'
            // item.color = colorsArray[colorCounter].color
            group.border = 'dashed'
          }
        })
        // let colorCounter = 0
        // for (let i = 0; i < groupsArray.length; i++) {
        //   if (groupsArray[i].sectionId === 'withoutSection'){
        //     groupsArray[i].color = colorsArray[0].color
        //     // console.log(colorsArray)
        //   }
        // }
        // присваиваем группам withoutSection цвет из массиваа с border dashed

        // ищем битые группы у айтемов
        itemsArray.forEach((item) => {
          let withGroup = groupsArray.filter(groupItem => { // массив айтемов с небитыми группами
            if(groupItem.id === item.groupId){
              item.color = groupItem.color // присваивает айтему цвет группы
              item.border = groupItem.border
              return true
            }else{
              return false
            }
          })
          if(!withGroup.length){
            item.sectionId = 'withoutSection'
            item.groupId = 'withoutGroup'
            item.color = ''
          }
        })
        // присваиваем childColor группам и айтемам по основному цвету(color) => childColor

          // this.params.colorsArray.forEach((color) =>{
          //   if(item.type === 'section' && item.color === color.color){
          //     item.childColor = color.childColor
          //   }
          //   if(item.type === 'section' && item.color === color.color){
          //     item.childColor = color.childColor
          //   }
          // })
        // fullArray = fullArray.map(o => {
        //   this.params.colors.filter(color =>{
        //     o.color === color.color ? o.childColor = color.color
        //   })
        //     if (o.id === val.id) {
        //       return val
        //     }else{
        //       return o
        //     }
        //   })




        return fullArrayItems
      },
      sectionsObjectsArray(){
        let sectionsArray = [{
          id: 'withoutSection',
          role: 'admin',
          type: 'section',
          sectionId: "",
          groupId: "",
          color: "",
          title: "Без раздела",
          comment: "Не имеет дочерних элементов",
          entrances: true,
          expenses: true,
        }]

        sectionsArray = sectionsArray.concat([...this.params.targets].filter(o => o.type === 'section'))
        return sectionsArray
      },
      groupsObjectsArray(){
        let groupsArray = [{
          id: 'withoutGroup',
          role: 'admin',
          type: 'group',
          sectionId: "withoutSection",
          groupId: "",
          color: "",
          title: "Без группы",
          comment: "Не имеет дочерних элементов",
          entrances: true,
          expenses: true,
        }]

        groupsArray = groupsArray.concat([...this.fullObjectsArray].filter(o => o.type === 'group'))
        return groupsArray
      },
      itemsArray(){
        let itemsArray = [...this.fullObjectsArray].filter(o => o.type === 'item')
        return itemsArray
      },
      targetsArray(){
        return this.params.targets
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
          for (var i = fullItemsArray.length - 1; i >= 0; --i) {
            let countItemsWithoutGroup = 0
            for (var k = this.fullGroupsArray.length - 1; k >= 0; --k) {
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
          const selectedItemBtnId = this.params.selectedItemBtnId
          if(selectedItemBtnId){
            fullItemsArray = this.fullItemsAndGroupsArray.filter((item)=>{
              return (item.groupId === selectedItemBtnId)})
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
            return ((item.title.toLowerCase()).includes(this.ruEnSearch.ru.toLowerCase(),"") || (item.title.toLowerCase()).includes(this.ruEnSearch.en.toLowerCase(),""))
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
        const selectedItemBtnId = this.params.selectedItemBtnId
        if(selectedItemBtnId){ // формирует массив групп с учетом нажатой группы
          groupsArray = groupsArray.filter((item)=>{
            return (item.id === selectedItemBtnId)})
        }
        return groupsArray
      },

      colorsIgnore(){
        let arr = []
        for (var k = this.targetsArray.length - 1; k >= 0; --k) {
            arr.push(this.targetsArray[k].color)
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
      toChangeSearchBtn(val){
        this.searchBtn = val
      },
      toChangeTargetTable(val){
        this.targetTable = val
      },
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
          return ((item.title.toUpperCase()).includes(this.ruEnSearch.ru.toUpperCase()) || (item.title.toUpperCase()).includes(this.ruEnSearch.en.toUpperCase()))
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
          case 'section':
              this.targetTable = 'sections'
            if(this.mode === 'edit'){
              this.editItem = editItem
              this.$store.dispatch('colorPicker', this.editItem.color)
              this.titleField = this.editItem.title
              this.commentField = this.editItem.comment
              this.expenses = this.editItem.expenses
              this.entrances = this.editItem.entrances
            }
            break
          case 'group':
              this.targetTable = 'groups'
            if(this.mode === 'edit'){
              this.editItem = editItem
              this.$store.dispatch('colorPicker', this.editItem.color)
              this.titleField = this.editItem.title
              this.commentField = this.editItem.comment
              this.expenses = this.editItem.expenses
              this.entrances = this.editItem.entrances
            }
            break
          case 'item':
            this.targetTable = 'targets'
            if(this.mode === 'edit'){
              this.editItem = editItem
              this.$store.dispatch('colorPicker', this.editItem.color)
              this.titleField = this.editItem.title
              this.selectField = this.editItem.groupId
              this.commentField = this.editItem.comment
              this.expenses = this.editItem.expenses
              this.entrances = this.editItem.entrances
            }
            break
          default:
            this.commentLable = ''
            this.selectLable = ''
            this.expenses = true
            this.entrances = true
            this.targetTable = 'sections'
          break
        }
      },
      button(val){
        let item = {}
        switch(val) {
          case 'create':
            if (this.$v.$invalid){
            this.$v.$touch()
            return
            }
            switch(this.modeBtn){
              case 'section':
                item.color = this.$store.getters.colorPicker
                item.sectionId = ''
                item.groupId = ''
                item.expenses = this.expenses,
                item.entrances = this.entrances
                break
              case 'group':
                item.color = this.$store.getters.colorPicker
                item.sectionId = this.selectField
                item.groupId = ''
                item.expenses = this.expenses,
                item.entrances = this.entrances
                break
              case 'item':
                item.color = this.$store.getters.colorPicker
                item.sectionId = ''
                item.groupId = this.selectField
                item.expenses = this.expenses
                item.entrances = this.entrances
                break
            }
            this.toCreate(item)
            break
          case 'edit':
            if (this.$v.$invalid){
            this.$v.$touch()
            return
            }
            switch(this.modeBtn){
              case 'section':
                item.id = this.editItem.id
                item.color = this.$store.getters.colorPicker
                item.sectionId = ''
                item.groupId = ''
                item.expenses = this.expenses,
                item.entrances = this.entrances
                break
              case 'group':
                item.id = this.editItem.id
                item.color = ''
                item.sectionId = this.selectField
                item.groupId = ''
                item.expenses = this.expenses,
                item.entrances = this.entrances
                break
              case 'item':
                item.id = this.editItem.id
                item.color = this.$store.getters.colorPicker
                item.sectionId = ''
                item.groupId = this.selectField
                item.expenses = this.expenses,
                item.entrances = this.entrances
                break
            }
            this.toEdit(item)
            break
          case 'remove':
              this.toRemove()
            break
          default: // cancel
            this.$v.$reset()
            this.modeBtn = ''
            this.commentLable = ''
            this.selectLable = ''
            this.targetTable = 'targets'
            if(this.params.selectedItemBtnId){
              this.selectField = this.params.selectedItemBtnId
            }else{
              this.selectField = 'withoutGroup'
            }
            // this.selectField = ''
            this.editItem = {}
            this.titleField = ''
            this.commentField = ''
            this.expenses = true
            this.entrances = true
          break
        }
      },
      async toCreate(item){
        try{
          const createdItem = await this.$store.dispatch('createTarget', {
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: item.color,
            sectionId: item.sectionId,
            groupId: item.groupId,
            expenses: item.expenses,
            entrances: item.entrances,
            })
            eventEmitter.$emit('changeItem', 'createdTarget', createdItem)
          this.$store.dispatch('colorPicker', '')
            this.modeBtn = ''
            this.titleField = ''
            this.commentsField = ''
            this.expenses = true
            this.entrances = true

          }catch (e){
            // console.log('error')
          }
      },
      async toEdit(item){
        try{
          const updatedTarget = await this.$store.dispatch('editTarget', {
            id: item.id,
            title: this.childTitleField,
            comment: this.childCommentField,
            type: this.modeBtn,
            color: item.color,
            sectionId: item.sectionId,
            groupId: item.groupId,
            expenses: item.expenses,
            entrances: item.entrances,
            })
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''
            this.expenses = true
            this.entrances = true
            eventEmitter.$emit('changeItem', 'updatedTarget', updatedTarget)
          }catch (e){
            // console.log('error')
          }
      },
      async toRemove(){
      try{
            await this.$store.dispatch('removeTarget', this.editItem.id)
            eventEmitter.$emit('changeItem', 'deletedTarget', this.editItem.id)
            this.titleField = ''
            this.commentsField = ''
            this.modeBtn = ''
            this.editItem = {}

          }catch (e){
            // console.log('error')
          }
      },
      selectItemBtnId(selectedItemBtnId){
        let changeSelectedItemBtnId = ''
        if(!this.params.selectedItemBtnId){
          changeSelectedItemBtnId = selectedItemBtnId
        }else{
          changeSelectedItemBtnId = ''
        }
        if(changeSelectedItemBtnId){
          this.selectField =  changeSelectedItemBtnId
        }else{
          this.selectField =  'withoutGroup'
        }
        eventEmitter.$emit('changeSelectedItemBtnId', changeSelectedItemBtnId)
      },
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

