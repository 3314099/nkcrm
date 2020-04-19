<template>
<div>
  <addLMB />
  <LeftMenuBTNs />


  
  </div>
</template>
<script>
import addLMB from '@/pages/admin/Left-menu-btns/addLMB'
import LeftMenuBTNs from '@/pages/admin/Left-menu-btns/LeftMenuBTNs'
  export default {
    components:{
      LeftMenuBTNs,
      addLMB

    },
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
        ],
      }
    },
  }
</script>
