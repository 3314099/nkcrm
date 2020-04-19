<template>
  <v-app>
    <v-component :is="layuot">
      <router-view />
    </v-component>

    
  </v-app>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import CrmLayout from './layouts/CrmLayout'

export default {
  name: 'App',
  computed: {
    layuot() {
      return (this.$route.meta.layuot || 'EmptyLayout')
    }
  },

  components: {
    EmptyLayout, CrmLayout
  },

  data: () => ({
    //
  }),
};
</script>
