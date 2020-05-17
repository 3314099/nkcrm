<template>
  <div style="max-width: 20px">
    <v-card
    outlined
    >
        <div>
        <PanelButtons />
        </div>

        <div>
          <Menu 
          :visibility1="visibility"
          :key="counter"
          />
        </div>
    </v-card>
  </div>
</template>
<script>
import fp_state from '@/state/fp_state'
import PanelButtons from '@/pages/FinPlan/leftBar/accounts/panelButtons'
import Menu from '@/pages/FinPlan/leftBar/accounts/menu'
export default{
  mixins:[fp_state],
  components:{
      PanelButtons, Menu
  }
}
</script>
<style scoped>

</style>
