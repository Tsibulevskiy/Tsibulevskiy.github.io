<template>
  <v-app>
    <v-navigation-drawer app>
      <side-bar/>
    </v-navigation-drawer>

    <v-app-bar app>
      <top-bar/>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
import sideBar from '../components/sideBar'
import topBar from '../components/topBar'

export default {
  components: {
    sideBar,
    topBar
  }
}
</script>

<style scoped>

</style>
