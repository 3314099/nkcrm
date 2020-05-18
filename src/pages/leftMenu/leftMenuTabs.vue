<template>
  <div>
    <v-window
      v-model="LMWin"
      class="elevation-1"
      vertical
    >
      <v-window-item>
        <LeftMenu
        :params="params"
        />
      </v-window-item>
      <v-window-item>
        <leftMenuTargets
        :params="params"
        />
      </v-window-item>
      <v-window-item>
        <filterLmList
        :params="params"
        />
      </v-window-item>
    </v-window>
  </div>
</template>
<script>
import LeftMenu from '@/pages/leftMenu/LeftMenu'
import leftMenuTargets from '@/pages/leftMenu/leftMenuTargets'
import filterLmList from '@/pages/FinPlan/Accounts/filterLmList'
  export default {
    components:{
      leftMenuTargets,
      LeftMenu,
      filterLmList
      },
    props:{
      params:Object
    },
    computed:{
      leftMenuMode(){
        return this.$store.getters.leftMenuMode
      },
      LMWin(){
        let LMWin = 0
        switch (this.$store.getters.leftMenuMode) {
          case 'accounts':
              LMWin = 0
            break
          case 'targets':
              LMWin = 1
            break
          case 'filters':
              LMWin = 2
            break
          default:
            LMWin = 0
            break
        }
        return LMWin
      }
    }

  }
</script>
