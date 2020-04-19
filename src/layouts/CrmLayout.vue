<template>
     <v-app>
  <StartNavbar />
  <Drawer />

  <!-- Sizes your content based upon application components -->
  <v-content>
    <SnackBar />

    <!-- Provides the application the proper gutter -->
    <v-container fluid>

      <!-- If using vue-router -->
      <router-view></router-view>
    </v-container>
  </v-content>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>

</template>

<script>
import StartNavbar from '../components/StartNavbar'
import Drawer from '../components/Drawer'
import SnackBar from '@/components/SnackBar'


export default {
  components: {
    StartNavbar,
    Drawer,
    SnackBar, 

  }
}
</script>

<style>
body {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden; 
}
.uppercase{
  text-transform: uppercase;
}
.img-size img {
    width: 26px;
    height: 25px;
} 
</style>
