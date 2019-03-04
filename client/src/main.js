// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
// import store from '@/store/Store.js'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import Geonames from '@/services/Geonames'
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import 'vuetify/dist/vuetify.min.css'

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyAx_hQgeWDJILn7Hy6FJ0rNrjtXfbQ-O0k'
  // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
})

// Vue.use(Vuetify)
Vue.use(Vuetify, {
  iconfont: 'mdi' // use the material-design-icons
})
Vue.config.productionTip = false
// create a global state
// Vue.prototype.$test = '12345'
// Vue.prototype.$state = store

Vue.mixin({
  data () {
    return {
      currUser: null
    }
  },
  methods: {
    user () {
      return this.$root.currUser
    },
    isLoggedIn () {
      // console.log('this.$root', this.$root)
      return this.$root && this.$root.currUser !== null
    },
    isLoggedOut () {
      return this.$root.currUser == null
    },
    isDriver () {
      console.log(`IsDriver? ${!this.isPassenger()}`)
      return !this.isPassenger()
    },
    isPassenger () {
      // console.log('this.$root.user', this.$root.user)
      const isPassenger = this.isLoggedIn() && this.$root.currUser.isPassenger
      console.log(`IsPassenger? ${isPassenger}`)
      return isPassenger
    },
    isAdmin () {
      return this.isLoggedIn() && this.$root.currUser.isAdmin
    },
    routeTo (route) {
      this.$router.push(route)
    },
    async geonames (value) {
      // console.log('change', val, this.home)
      if (value.length > 2) {
        await Geonames().get('/searchJSON', {params: {name_startsWith: value}})
          .then((data) => {
            console.log('data', data.data.geonames)
            this.locations = data.data.geonames
          })
      }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
