<template>
<div 
class="d-flex"
>
  <div class="column1 margin">
  <LeftPanelButtons />
  <LeftMenu />
</div>
  <div class="column column2 margin">
    <Client/>
    <v-card 
        class="card"
      >
    </v-card>
  </div>
  <div class="column column3 margin">
    <!-- <article class="card"> -->
    <RightMenu />
    
  </div>
  
</div>
</template>

<script>
    
import LeftPanelButtons from '@/pages/crm/Client/LeftPanelButtons'
import LeftMenu from '@/pages/crm/Client/LeftMenu'
import Client from '@/pages/crm/Client/Client'
import RightMenu from '@/components/RightMenu/RightMenu'




export default {
  

    components:{
      LeftPanelButtons,
      LeftMenu,
      Client, 
      RightMenu
    },
     
 
}
</script>

<style>
html {
  font-family: sans-serif;
}

.columns {
  display: flex;
}

.column {
  /* background: #eee; */
  /* border: 1px solid #ccc; */
  margin: 1px;
  display: flex;
  flex: 1;
  flex-direction: column;
}
.btn {
  width: 190px;
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

