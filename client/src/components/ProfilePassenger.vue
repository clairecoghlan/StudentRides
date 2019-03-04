<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    //- vuetify-google-autocomplete(
    //-   id="pass-location-map"
    //-   label="Home"
    //-   append-icon="search"
    //-   placeholder="Start typing"
    //-   v-on:placechanged="getAddressData"
    //- )
    //- br
    //- v-text-field(
    //-   label="Home"
    //-   list="locations"
    //-   v-model="user.hom"
    //-   label="Pickup Locations"
    //- )
    //- datalist#locations
    //-   option(v-for="location in allLocations") {{location}}

    pass-schedule(v-bind:schedule="user.PassProfile.PassSchedules")

    br
    .error(v-html="error")
    .success(v-html="success")

</template>

<script>
// import Vue from 'vue'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import PassSchedule from './PassSchedule'

// Vue.use(VuetifyGoogleAutocomplete, {
//   apiKey: 'AIzaSyAx_hQgeWDJILn7Hy6FJ0rNrjtXfbQ-O0k'
//   // Can also be an object. E.g, for Google Maps Premium API, pass `{ client: <YOUR-CLIENT-ID> }`
// })

export default {
  name: 'ProfilePassenger',
  components: {
    PassSchedule
  },
  data () {
    return {
      // user: {},
      allLocations: ['Aghada', 'Midleton', 'Tivoli', 'Lower Rd', 'Town Centre'],
      locations: '',
      passProfile: {
        location: ''
      },
      driverProfile: {},
      success: '',
      error: ''
    }
  },
  props: [
    'user',
    'schedule'
  ],
  methods: {
    /**
     * When the location found
     * @param {Object} addressData Data of the found location
     * @param {Object} placeResultData PlaceResult object
     * @param {String} id Input container ID
     */
    getAddressData: function (addressData, placeResultData, id) {
      console.log(addressData, placeResultData, id)
      this.address = addressData
    }
  }
}
</script>

<style scoped>

</style>
