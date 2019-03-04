<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    vuetify-google-autocomplete(
      id="pass-location-map"
      label="Home"
      append-icon="search"
      placeholder="Start typing"
      v-on:placechanged="getAddressData"
    )
    br
    v-layout(horizontal)
      v-text-field(
        v-model="user.DriverProfile.carReg"
        label="Car Reg"
      )
      br
      v-text-field(
        v-model="user.DriverProfile.capacity"
        label="Capacity"
      )

    driver-schedule(v-if="user.DriverProfile" v-bind:schedule="user.DriverProfile.DriverSchedules")

    br
    .error(v-html="error")
    .success(v-html="success")

</template>

<script>
// import Vue from 'vue'
// import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'
import DriverSchedule from './DriverSchedule'

export default {
  name: 'ProfileDriver',
  components: {
    DriverSchedule
  },
  data () {
    return {
      // user: {},
      success: '',
      error: ''
    }
  },
  mounted () {
    if (!this.user) {
      this.routeTo('/')
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
