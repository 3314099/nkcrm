<template>
  <div>
    <v-app-bar app
      color="primary"
      dense
      dark
      clipped-left

    >

    <router-link 
    to="/" 
    tag="div" 
    class="v-toolbar__title"
    exact :style="{ cursor: 'pointer'}"
    >
    НаКонтроле
    </router-link>

      <v-btn 
        text
        class="ma-2"
        href="https://ru.vuejs.org/v2/guide/installation.html"
        target="blank"
        >
        <v-icon 
        left
        >mdi-vuejs</v-icon>
        Vuejs
        </v-btn>
        <v-btn 
        text
        class="ma-2"
        href="https://vuetifyjs.com/ru/introduction/why-vuetify"
        target="blank"
        >
        <v-icon 
        left
        >mdi-vuetify</v-icon>
        vuetify
        </v-btn>

        <v-btn 
        text
        class="ma-2"
        href="https://materialdesignicons.com/"
        target="blank"
        >
        <v-icon 
        left
        >mdi-material-design</v-icon>
        Material design icons
        </v-btn>
        <Date />

      <v-spacer />
      <v-menu
      >

        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon left>mdi-book-open-page-variant</v-icon>
          </v-btn>
        </template>


        <v-list left>
          <v-list-item
            v-for="(link, i) in links"
            :key="i"
            :to="link.url"
          >
            <v-list-item-title>{{link.title}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ma-2"
            dark
            icon
            v-on="on"
          >User
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            :onclick ="profile"
          >
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
            
          >
            <v-list-item-title>Выйти</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>




    </v-app-bar>
  </div>
</template>

<script>
import Date from "@/components/Date"

export default {
  data() {
    return {
      links: [
        { title: 'Admin', icon: '', url: '/admin'},
        { title: 'Клиент', icon: '', url: '/client'},
        { title: 'Организация', icon: '', url: '/business'},
        { title: 'Счета', icon: '', url: '/accounts'},
        { title: 'Операции', icon: '', url: '/operations'},
        { title: 'Настройки', icon: '', url: '/properties'},
        { title: 'тестовая', icon: '', url: '/test'},
        { title: 'Счета2', icon: '', url: '/accounts2'},
        { title: 'Видео', icon: '', url: '/video'},
      ],
      loginLink: "/login",
      items: [
        { title: 'Профиль', url: '/profile'},
        { title: 'Выйти', url: '/logout' },
      ],
    }
  },
  components: {
    Date,
  },
  methods: {
    profile(){

    },
    async logout(){
      // console.log(111)
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout') 
    }
  }

}
</script>
