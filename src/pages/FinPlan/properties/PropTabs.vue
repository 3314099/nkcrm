<template>
<div>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-1">
      <h1 class="font-weight-bold display-3 basil--text">Настройки</h1>
    </v-card-title>

    <v-tabs
      v-model="params.tabBtn"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
      :href="'#targets'"
      @click="toChangePropertyTabMode('targets')"
        >
      Цели
      </v-tab>
      <v-tab
      :href="'#accounts'"
      @click="toChangePropertyTabMode('accounts')"
        >
      Счета
      </v-tab>
      <v-tab
      :href="'#filters'"
      @click="toChangePropertyTabMode('filters')"
        >
      Фильтры
      </v-tab>
      <v-tab
      :href="'#categories'"
      >
      Категории
      </v-tab>
      <v-tab
      :href="'#tags'"
      @click="toChangePropertyTabMode('filters')"
      >
      Теги
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="propertyTabMode">
      <v-tab-item
      :value="'targets'"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>
            <targets
            :params="params"
             />
            </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
      :value="'accounts'"
      >
        <Accounts
          :params="params"
        />
      </v-tab-item>
      <v-tab-item
      :value="'filters'"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>
            <filters
            :params="params"
             />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
      :value="'categories'"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>
            <categories
            :params="params"
             />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
      :value="'tags'"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>
            <tags
            :tags="params.tags"
            />
            </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
  </div>
</template>
<script>
  import tags from '@/pages/FinPlan/Accounts/tags'
  import categories from '@/pages/FinPlan/Accounts/categories'
  import filters from '@/pages/FinPlan/Accounts/filters'
  import targets from '@/pages/FinPlan/Accounts/targets'
  import Accounts from '@/pages/FinPlan/Accounts/Accounts'

  export default {
    components:{
      targets, Accounts, tags, categories, filters
    },
    computed:{
        propertyTabMode(){
          return this.$store.getters.propertyTabMode
        }
    },
    props:{
      params:{
        type:Object
      }
    },
    methods:{
      toChangePropertyTabMode(val){
        this.$store.dispatch('propertyTabMode', val)
      },
    }
  }
</script>
<style>
/* Helper classes */
.basil {
  /* background-color: #F5F5F5 !important; */
}
.basil--text {
  color: #356859 !important;
}
</style>
