import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import VueSocketIO from 'vue-socket.io'
// import io from 'socket.io-client'

// Vue.use(new VueSocketIO({
//   debug: false,
//   connection: io('wss://streamer.cryptocompare.com/v2?api_key=c7672ea88ee9152b9af099d43dd030eb08a058188eea47ad0ee1375370c39e17&subs=5~CCCAGG~BTC~USD'),
//   vuex: {
//     store,
//     actionPrefix: 'SOCKET_',
//     mutationPrefix: 'SOCKET_'
//   }
// })
// )

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
