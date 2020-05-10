<template>
  <div>
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
    
    <v-data-table
      :headers="headers"
      :items="itemsArray"
      align="center"
      fixed-header 
      height="400px"
      style="color: black; background-color: white"
      hide-default-footer
    >
      <template v-slot:item.groupTitle="{ item }">
        <v-chip class="mr-2" small :color="item.color"> {{     }}</v-chip>
        {{item.groupTitle}}
      </template>
      <template v-slot:item.expenses="{ item }">
        <v-switch
              class="pa-0 ml-4 mt-2 mb-0"
              v-model="item.expenses"
               @change="toChangeSwitch('expenses',item.expenses, item)"
              color="success"
              :disabled="modeBtn ? true : false"
            ></v-switch>
      </template>
      <template v-slot:item.entrances="{ item }">
        <v-switch
          class="pa-0 ml-6 mt-2 mb-0"
              v-model="item.entrances"
              @change="toChangeSwitch('entrances',item.entrances, item)"
              color="primary"
              :disabled="modeBtn ? true : false"
            ></v-switch>
      </template>
      <template v-slot:item.change="{ item }">
          <v-icon
          class="pa-0 ml-5 mt-0 mb-0"
          @click="toChangeModeBtn('item', 'edit', item)"
          >mdi-lead-pencil</v-icon>
      </template>
      <template slot="no-data">
        <div>Список пуст</div>
      </template>




    </v-data-table>
  </div>
</template>
<script>
  import {eventEmitter} from '@/main'
  export default {
    props:{
      itemsArray:Array,
      toChangeModeBtn: Function,
      modeBtn:String
    },
    data () {
      return {
        headers: [
          {
            text: 'Группа фильтров',
            align: 'start',
            sortable: false,
            value: 'groupTitle',
          },
          { text: 'Наименование фильтра', value: 'title' },
          { text: 'Комментарий', value: 'comment' },
          { text: 'Расходы', 
          align: 'center',
          sortable: false,
          value: 'expenses' },
          { text: 'Поступления',
          align: 'center',
          sortable: false, 
          value: 'entrances' },
          { text: 'Изменить', value: 'change' },
        ],
        
      }
    },
    methods:{
      toChangeSwitch(type,val, item){
        if(type === 'expenses'){
          item.expenses = val
          item.expenses ? false : item.entrances = true
        }else{
          item.entrances = val
          item.entrances ? false : item.expenses = true
        }
        
        this.toEdit(item)
      },
      async toEdit(item){
        try{
          const filter = await this.$store.dispatch('editFilter', {
            id: item.id,
            title: item.title,
            comment: item.comment,
            type: item.type,
            color: item.color,
            groupId: item.groupId,
            expenses: item.expenses,
            entrances: item.entrances,
            })

            eventEmitter.$emit('changeItem', 'updatedFilter', filter)
          }catch (e){
            // console.log('error')
          }
      },
    }
  }
</script>
