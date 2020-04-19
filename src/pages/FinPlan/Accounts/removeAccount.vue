<template>
  <div>
    <v-card
    class="mx-3"
    >
    <v-container>
          Вы уверены, что хотите удалить счет?
          {{id}}
          <v-spacer></v-spacer>
            <v-btn text color="primary" @click="openBanner('', true)">Отмена</v-btn>
            <v-btn text color="red" @click="toRemoveAccount(id)">Удалить</v-btn>

    </v-container>

    </v-card>

  </div>
</template>
<script>
import Account from '@/store/FinPlan/Account.js'
export default{
  mixins:[Account],
  props:{
    id:{
      type:String
    }
  }
}
</script>
