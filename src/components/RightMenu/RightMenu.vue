<template>
  <div>
    <RightPanelButtons />
    <v-window
      v-model="RMWin"
      class="elevation-1"
      vertical
    >
      <v-window-item>
        <Calendar/>
      </v-window-item>
      <v-window-item>
        <Calculator/>
      </v-window-item>
      <v-window-item>
        <Currency/>
      </v-window-item>
    </v-window>
  </div>
</template>
<script>
import RightPanelButtons from '@/components/RightMenu/RightPanelBattons'
import Calendar from '@/components/Calendar'
import Calculator from '@/components/Calculator'
import Currency from '@/components/Currency'
export default {
  components:{
      RightPanelButtons,
      Calendar,
      Calculator,
      Currency
    },
  computed:{
    // rightBarMode(){
    //   return this.$store.getters.rightBarMode
    // },
    RMWin(){
      let LMWin = 0
      switch (this.$store.getters.rightBarMode) {
        case 'calendar':
          LMWin = 0
          break
        case 'calc':
          LMWin = 1
          break
        case 'currency':
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
