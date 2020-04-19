<template>
    <div 
    class="d-flex justify-space-between"
    >
    <div>
        <leftBar
         />
    </div>

    </div>
</template>

<script>
import fp_state from '@/state/fp_state'    
import leftBar from '@/pages/FinPlan/leftBar/leftBar'
// import RightMenu from '@/components/RightMenu/RightMenu'
// import LeftMenu from '@/pages/FinPlan/LeftMenu'
// import Purse from '@/pages/FinPlan/Purse/Purse'
// import DragDrop from '@/pages/FinPlan/Purse/DragDrop'


export default {
  mixins:[fp_state],
  components:{
      leftBar
  },
}
</script>

<style scoped>

</style>

