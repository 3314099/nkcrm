<template>
    <div class="d-flex justify-space-between"
    >
    <div class="ma-2">
       <leftMenu
        />
    </div>
         <div class="flex-grow-1 ma-2">
           <Content
        />
         </div>
         <div class="ma-2">
            <RightMenu />
         </div>
         
    </div>
</template>
<script>
  import leftMenu from '@/pages/admin/leftMenu'
  import Content from '@/pages/admin/Content'
  import RightMenu from '@/components/RightMenu/RightMenu'

export default {
  components:{
    leftMenu,
    Content,
    RightMenu
  }
}
</script>
<style scoped>
html {
  font-family: sans-serif;
}

.columns {
  display: flex;
}

.btn {
  width: 190px;
}
.column1 {
  flex: 1;
}

.column2 {
  flex: 2;
}

.column3 {
   max-width: 280px;
   min-width: 280px;
}

.card {
  background: mediumseagreen;
  border: 1px solid seagreen;
  color: white;
  flex: 1;
  margin: 4px 2px;
  padding: 5px;
}

.margin{
  margin: 5px;
}
.v-button {
  text-align: left;
}

</style>
