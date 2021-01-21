<template>
  <v-container>
    <v-row>
      <v-col cols="12" cm="4" md="3" v-if="price">
        <v-card elevation="2">
          <v-card-title>USD: {{ price.USD}}</v-card-title>
          <v-card-title>JPY: {{ price.JPY}}</v-card-title>
          <v-card-title>EUR: {{ price.EUR}}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" cm="7" md="8">
        <v-card color="grey lighten-4"
                max-width="900">
          <v-sheet color="transparent"
                   class="v-sheet--offset mx-auto"
                   elevation="12"
                   max-width="calc(100% - 32px)">
            <v-sparkline
                    :smooth="16"
                    :gradient="['#f72047', '#ffd200', '#1feaea']"
                    :line-width="2"
                    :value="value"
                    :labels="labels"
                    auto-draw
                    label-size="3"
                    stroke-linecap="round">
            </v-sparkline>
          </v-sheet>
          <v-card-title v-if="coin">
            {{ coin.Name }} ({{coin.FullName}})
          </v-card-title>
          <v-card-text v-if="coin">
            <h4>Algorithm: {{ coin.Algorithm }}</h4>
            <h4>ProofType: {{ coin.ProofType }}</h4>
            <ul>Rating:
              <li>Rating {{ coin.Rating.Weiss.Rating }}</li>
              <li>TechnologyAdoptionRating {{ coin.Rating.Weiss.TechnologyAdoptionRating }}</li>
              <li>MarketPerformanceRating {{ coin.Rating.Weiss.MarketPerformanceRating }}</li>
            </ul>
            <h4>DocumentType: {{ coin.DocumentType }}</h4>
            <h4>NetHashesPerSecond: {{ coin.NetHashesPerSecond }}</h4>
            <h4>BlockNumber: {{ coin.BlockNumber }}</h4>
            <h4>BlockTime: {{ coin.BlockTime }}</h4>
            <h4>BlockReward: {{ coin.BlockReward }}</h4>
            <h4>AssetLaunchDate: {{ coin.AssetLaunchDate }}</h4>
            <h4>MaxSupply {{ coin.MaxSupply }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  computed: {
    coin () {
      return this.$store.getters.getCoin
    },
    labels () {
      const labels = this.$store.getters.getLabels
      const time = labels.map(i => moment(i).format('h:mm:ss p'))
      return time
    },
    value () {
      return this.$store.getters.getValue
    },
    price () {
      return this.$store.getters.getCoinPrice
    }
  }
}
</script>

<style scoped>

</style>
