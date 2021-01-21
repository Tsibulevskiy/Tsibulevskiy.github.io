<template>
  <v-container>
    <h2 class="mr-2"> {{ coin.FullName }}</h2>
  </v-container>

</template>

<script>
export default {
  computed: {
    coin () {
      return this.$store.getters.getCoin
    }
  }
}
</script>

<style scoped>

</style>
