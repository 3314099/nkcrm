<template>
  <div>
    <PropTabs
    :params="params"
    />
  </div>
</template>
<script>
  import PropTabs from '@/pages/FinPlan/properties/PropTabs'
export default {
  components:{
    PropTabs
  },
  props:{
    params:{
      type: Object
    }
  }
}
</script>
