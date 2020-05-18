<template>
	<div>
    <!-- <pre>{{params.selectedTarget}}</pre> -->
  <v-card
  class="ma-1"
  outlined
  >
  <v-card-title
  style="background: #F5F5F5"
  class="ma-0 pa-1 pl-1"
  >
  <div class="font-italic caption width">
    </div>
          <v-btn
          @click="toChangeCheckLMB()"
          small
          icon>
          <v-icon color="black">mdi-check-box-outline</v-icon>
          </v-btn>
          <!-- <v-btn
          v-if="!item.checked"
          @click="toChangeCheckLMB(true,item.btnId)"
          small
          :disabled= params.btnDisabled
          icon
          >
            <v-icon :color="item.textColor">mdi-checkbox-blank-outline</v-icon>
          </v-btn> -->
  <v-btn

  :text="params.selectedTarget.id !== 'allTargets' ? true :  false"
  :outlined="params.selectedTarget.id === 'allTargets' ? true : false"
  small
  @click="toChangeTargetBtn('allTargets')"
  >
   ВСЕ ЦЕЛИ
  </v-btn>
  <v-spacer></v-spacer>
  </v-card-title>
  </v-card>


     <v-container
        id="scroll-target"
        style="max-height: 680px"
        class="py-0 px-1 overflow-y-auto"
      >
    <v-card
  class="ma-0"
  outlined
  >
  <v-card-title
  v-for="(item, i) in leftMenuTargets"
  :style="`background: ${item.color}`"
  :class="item.type === 'section' ? 'ma-0 pa-1 pl-1' : 'ma-0 pa-1 pl-6 subtitle-1' "
  :key="i"
  >
  <div class="font-italic caption width">
    {{(item.btnId) | countAccounts(params.accounts)}}
    </div>
          <v-btn
          v-if="item.checked"
          @click="toChangeCheckLMB(false,item.btnId)"
          :disabled= params.btnDisabled
          small
          icon>
          <v-icon :color="item.textColor">mdi-check-box-outline</v-icon>
          </v-btn>
          <v-btn
          v-if="!item.checked"
          @click="toChangeCheckLMB(true,item.btnId)"
          small
          :disabled= params.btnDisabled
          icon
          >
            <v-icon :color="item.textColor">mdi-checkbox-blank-outline</v-icon>
          </v-btn>
  <v-btn

  :color="item.textColor"
  :text="params.selectedTarget.id === item.id ? false :  true"
  :outlined="params.selectedTarget.id === item.id ? true : false"

  small
  @click="toChangeTargetBtn(item.id)"
  >
   {{item.title}}
  </v-btn>
  <v-spacer></v-spacer>
  <v-badge
  v-if="item.type === 'group'"
  class="pl-3"
                    inline
                    :color="item.badgeColor"
                    :content="111 | visibility(params.visibility)"
                  >
                  </v-badge>

  </v-card-title>
  </v-card>
 </v-container>

<v-card
  class="ma-1"
  outlined
  >
  <v-divider inset></v-divider>
  <v-card-title
  style="background: #F5F5F5"
  class="ma-0 pa-1 pl-1"
  >
  <div class="font-italic caption width">
    </div>
          <v-btn
          @click="toChangeCheckLMB()"
          small
          icon>
          <v-icon color="black">mdi-check-box-outline</v-icon>
          </v-btn>
          <!-- <v-btn
          v-if="!item.checked"
          @click="toChangeCheckLMB(true,item.btnId)"
          small
          :disabled= params.btnDisabled
          icon
          >
            <v-icon :color="item.textColor">mdi-checkbox-blank-outline</v-icon>
          </v-btn> -->
  <v-btn

  :text="params.selectedTarget !== 'allTargets' ? true :  false"
  :outlined="params.selectedTarget === 'allTargets' ? true : false"
  small
  @click="toChangeTargetBtn('allTargets')"
  >
    ЭКОНОМИЯ
  </v-btn>
  <v-spacer></v-spacer>
  </v-card-title>
  <v-divider inset></v-divider>
  </v-card>





    </div>


</template>

<script>
import {eventEmitter} from '@/main'
import LeftMenu from '@/store/FinPlan/LeftMenu.js'
import Targets from '@/store/FinPlan/Targets.js'
  export default {
    mixins: [LeftMenu, Targets],




    data: () => ({
      btnDisabled: false,

      panel: 0,
      inset: true,
       checkbox: true,
    }),
    props:{
      params:{
        type:Object
      }
    },
    computed: {
      leftMenuTargets(){
        return this.fullObjectsArray(this.params.targets)
      }
    },
    methods: {
      fullObjectsArray(targets){ // создает массив всех айтемов с присвоением цвета, и битых групп.
        let fullArrayItems = targets
        let sectionsArray = fullArrayItems.filter(item => item.type === 'section')
        let groupsArray = fullArrayItems.filter(item => item.type === 'group')
        groupsArray.forEach((group) => {
          let withSection = sectionsArray.filter(sectionItem => { // массив групп с небитыми разделами
            if(sectionItem.id === group.sectionId){
              group.color = sectionItem.color // присваивает группе цвет раздела
              return true
            }else{
              return false
            }
          })
          if(!withSection.length){
            group.sectionId = 'withoutSection'
          }
        })
        let colorsArray = this.$store.getters.colorsArray
        for (let i = 0; i < groupsArray.length; i++) {
          for (let k = 0; k < colorsArray.length; k++) {
            if(groupsArray[i].color === colorsArray[k].color && groupsArray[i].type === 'group'){
              groupsArray[i].color = colorsArray[k].childColor
              groupsArray[i].badgeColor = colorsArray[k].color
            }
          }
        }
        let sortedTargetsArray = []

        for (let i = 0; i < sectionsArray.length; i++) {
          sortedTargetsArray.push(sectionsArray[i])
          for (let k = 0; k < groupsArray.length; k++) {
            if(sectionsArray[i].id === groupsArray[k].sectionId && groupsArray[k].type === 'group'){
              sortedTargetsArray.push(groupsArray[k])
            }
          }
        }
        sortedTargetsArray.forEach((item)=>{
              if(item.type === 'section' && item.id !== 'allTargets'){
                item.textColor = 'white'
              }else{
                item.textColor = 'black'
              }
        })
        return sortedTargetsArray
      },
      toChangeTargetBtn(id){
        let target = {}
        if(id === 'allTargets'){
          target = {id: 'allTargets'}
        }else{
          target = this.leftMenuTargets.filter(target => target.id === id)[0]
        }
      eventEmitter.$emit('toChangeTargetBtn', target)
      },
      toChangeCheckLMB(bool, id){
        eventEmitter.$emit('toChangeCheckLMB', bool,id )
      }
    }
  }
</script>


