<template>
  <v-card class="mx-auto">
    <v-navigation-drawer permanent fixed>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <img src="https://www.cryptocompare.com/media/35651259/logowbg.png" alt="logo" class="logo" width="90%"/>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item-group color="indigo" >
          <v-list-item
                  v-for="coin in coinList"
                  :key="coin.CoinInfo.id" :to="'/' + coin.CoinInfo.Id"
                  link @click="getCoin(coin)">
            <v-list-item-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ coin.CoinInfo.Name }} {{coin.CoinInfo.FullName}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {

  computed: {
    coinList () {
      return this.$store.getters.getCoinList.Data
    }
  },
  mounted () {
    this.getCoinList()
  },
  methods: {
    getCoinList () {
      this.$store.dispatch('coin_list')
    },
    getCoin (coin) {
      this.$root.$emit('sendRemove', this.$store.getters.getFsym)
      this.$store.dispatch('coin', coin.CoinInfo.Name)
      this.$store.dispatch('fsym', coin.CoinInfo.Name)
      this.$root.$emit('sendAdd', coin.CoinInfo.Name)
    }
  }
}
</script>

<style scoped>

</style>
