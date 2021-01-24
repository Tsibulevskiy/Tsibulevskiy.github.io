<template>
  <v-container>
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
