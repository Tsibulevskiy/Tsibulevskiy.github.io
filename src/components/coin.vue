<template>
  <v-container>
    <h2 v-if="fsym">{{ fsym }}</h2>
    <v-row>
      <v-col cols="12" cm="4" md="4">
        <v-card elevation="2" v-if="coin_info" class="coin pl-2">
          <v-card-text class="pa-0">FLAGS: {{ coin_info.FLAGS}}</v-card-text>
          <v-card-text class="pa-0">FROMSYMBOL: {{ coin_info.FROMSYMBOL}}</v-card-text>
          <v-card-text class="pa-0">HIGH24HOUR: {{ coin_info.HIGH24HOUR}}</v-card-text>
          <v-card-text class="pa-0">HIGHDAY: {{ coin_info.HIGHDAY}}</v-card-text>
          <v-card-text class="pa-0">HIGHHOUR: {{ coin_info.HIGHHOUR}}</v-card-text>
          <v-card-text class="pa-0">LASTMARKET: {{ coin_info.LASTMARKET}}</v-card-text>
          <v-card-text class="pa-0">LASTTRADEID: {{ coin_info.LASTTRADEID}}</v-card-text>
          <v-card-text class="pa-0">LASTUPDATE: {{ time(coin_info.LASTUPDATE).format('h:mm:ss p')}}</v-card-text>
          <v-card-text class="pa-0">LASTVOLUME: {{ coin_info.LASTVOLUME}}</v-card-text>
          <v-card-text class="pa-0">LASTVOLUMETO: {{ coin_info.LASTVOLUMETO}}</v-card-text>
          <v-card-text class="pa-0">LOW24HOUR: {{ coin_info.LOW24HOUR}}</v-card-text>
          <v-card-text class="pa-0">LOWDAY: {{ coin_info.LOWDAY}}</v-card-text>
          <v-card-text class="pa-0">LOWHOUR: {{ coin_info.LOWHOUR}}</v-card-text>
          <v-card-text class="pa-0">MARKET: {{ coin_info.MARKET}}</v-card-text>
          <v-card-text class="pa-0">MEDIAN: {{ coin_info.MEDIAN}}</v-card-text>
          <v-card-text class="pa-0">OPEN24HOUR: {{ coin_info.OPEN24HOUR}}</v-card-text>
          <v-card-text class="pa-0">OPENDAY: {{ coin_info.OPENDAY}}</v-card-text>
          <v-card-text class="pa-0">OPENHOUR: {{ coin_info.OPENHOUR}}</v-card-text>
          <v-card-text class="pa-0">PRICE: {{ coin_info.PRICE}}</v-card-text>
          <v-card-text class="pa-0">TOPTIERVOLUME24HOUR: {{ coin_info.TOPTIERVOLUME24HOUR}}</v-card-text>
          <v-card-text class="pa-0">TOPTIERVOLUME24HOURTO: {{ coin_info.TOPTIERVOLUME24HOURTO}}</v-card-text>
          <v-card-text class="pa-0">TOSYMBOL: {{ coin_info.TOSYMBOL}}</v-card-text>
          <v-card-text class="pa-0">TYPE: {{ coin_info.TYPE}}</v-card-text>
          <v-card-text class="pa-0">VOLUME24HOUR: {{ coin_info.VOLUME24HOUR}}</v-card-text>
          <v-card-text class="pa-0">VOLUME24HOURTO: {{ coin_info.VOLUME24HOURTO}}</v-card-text>
          <v-card-text class="pa-0">VOLUMEDAY: {{ coin_info.VOLUMEDAY}}</v-card-text>
          <v-card-text class="pa-0">VOLUMEDAYTO: {{ coin_info.VOLUMEDAYTO}}</v-card-text>
          <v-card-text class="pa-0">VOLUMEHOUR: {{ coin_info.VOLUMEHOUR}}</v-card-text>
          <v-card-text class="pa-0">VOLUMEHOURTO: {{ coin_info.VOLUMEHOURTO}}</v-card-text>
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
        </v-card>
        <v-card color="grey lighten-4" class="mt-4"
                max-width="900">
          <v-sheet color="transparent"
                   class="v-sheet--offset mx-auto"
                   elevation="12"
                   max-width="calc(100% - 32px)">
            <v-sparkline
              :smooth="16"
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :line-width="2"
              :value="price"
              :labels="time_value"
              auto-draw
              label-size="3"
              stroke-linecap="round">
            </v-sparkline>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      connection: null,
      coin_info: null,
      subAdd: 'SubAdd',
      subRemove: 'SubRemove'
    }
  },
  computed: {
    coin () {
      return this.$store.getters.getCoin
    },
    labels () {
      const labels = this.$store.getters.getLabels
      const time = labels.map(i => moment(i).format('h:mm:ss p'))
      return time
    },
    fsym () {
      return this.$store.getters.getFsym
    },
    price () {
      return this.$store.getters.getPrice
    },
    time_value () {
      return this.$store.getters.getTime
    },
    value () {
      return this.$store.getters.getValue
    },
    apiKey () {
      return this.$store.getters.getApiKey
    },
    baseWs () {
      return this.$store.getters.getBaseWs
    }
  },
  created () {
    const wm = this
    console.log('Started Connection')
    this.connection = new WebSocket(this.baseWs + this.apiKey)
    this.connection.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.TYPE && data.TYPE === '5') {
        this.coin_info = data
        wm.$store.dispatch('price', data.PRICE)
        wm.$store.dispatch('time', moment(data.LASTUPDATE).format('h:mm:ss p'))
        // console.log(data)
      }
    }
    this.connection.onopen = () => wm.sendMessage(this.subAdd)
  },
  mounted () {
    /* eslint-disable */
    const wm = this
    this.$root.$on('sendRemove', function (value) {
      wm.sendMessage(wm.subRemove, value)
    })
    this.$root.$on('sendAdd', function (value) {
      wm.sendMessage(wm.subAdd, value)
    })
  },
  methods: {
    /* eslint-disable */
    sendMessage (message, value) {
      const subRequest = {
        "action": message,
        "subs": ["5~CCCAGG~" + value + "~USD"]
      }
      this.connection.send(JSON.stringify(subRequest))
      this.connection.send(message)
    },
    time(val) {
      return moment(val)
    }
  }
}
</script>

<style scoped lang="scss">
  .coin {
    .v-card__text {
      font-size: 10px;
    }
  }
</style>
