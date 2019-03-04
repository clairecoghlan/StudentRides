<template lang="pug">
  v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title Profile
        .container.pl-4.pr-4.pt-2.pb-2
          v-tabs
            v-tab(ripple) Personal Details
            v-tab(v-if="isPassenger()" ripple )  Schedule
            v-tab(v-if="isPassenger()" ripple ) Pickup Locations
            v-tab(v-if="isPassenger()" ripple )  Drivers
            v-tab(v-if="isDriver()" ripple ) Schedule
            v-tab(v-if="isDriver()" ripple ) Waypoints
            v-tab(v-if="isDriver()" ripple ) Passenger

            v-tab-item
              v-card
                v-card-text
                  profile-personal(v-bind:user="user")

            v-tab-item(v-if="isPassenger()")
              v-card
                v-card-text
                  profile-passenger(v-bind:user="user",schedule="passSchedule")

            v-tab-item(v-if="isPassenger()")
              v-card
                v-card-text
                  pass-pickups(v-bind:user="user")

            v-tab-item(v-if="isPassenger()")
              v-card
                v-card-text
                  pass-drivers(v-bind:user="user")

            v-tab-item(v-if="isDriver()")
              v-card
                v-card-text
                  profile-driver(v-bind:user="user",schedule="driverSchedule")

            v-tab-item(v-if="isDriver()")
              v-card
                v-card-text
                  driver-waypoints(v-bind:user="user")
                  //- ,waypoints="waypoints"

            v-tab-item(v-if="isDriver()")
              v-card
                v-card-text
                 driver-pass(v-bind:user="user")
        br
        .error(v-html="error")
        .success(v-html="success")
        br
      br
      v-btn(@click="save" dark).cyan Save
      v-btn(@click="getProfile" dark).cyan Reload

</template>

<script>
import ProfilePersonal from './ProfilePersonal'
import ProfilePassenger from './ProfilePassenger'
import ProfileDriver from './ProfileDriver'
import DriverWaypoints from './DriverWaypoints'
import DriverPass from './DriverPass'
import PassPickups from './PassPickups'
import PassDrivers from './PassDrivers'
import ProfileService from '@/services/ProfileService'

export default {
  name: 'Profile',
  components: {
    ProfilePersonal,
    ProfilePassenger,
    PassPickups,
    PassDrivers,
    ProfileDriver,
    DriverWaypoints,
    DriverPass
  },
  data () {
    return {
      user: {},
      waypoints: [],
      success: '',
      error: ''
    }
  },
  props: [
    // 'user'
  ],
  mounted () {
    this.user = this.$root.currUser
    if (!this.user) {
      this.routeTo('/')
    }
    console.log('Profile View mounted, getting passenger profile')
    this.getProfile(this.user) // .then(() => this.getPassSchedule())
    console.log('User', this.user)
  },
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
    },
    async getProfile () {
      const user = this.user
      if (user.isPassenger) {
        await this.getPassengerProfile(user)
      } else {
        await this.getDriverProfile(user)
      }
    },
    async getDriverScheduleByUserId (userId) {
      const user = await ProfileService.getProfileById(userId)
      const schedule = user.DriverProfile.DriverSchedule
      return schedule
    },
    async getPassengerProfile (user) {
      try {
        console.log('Getting profile for user ', user)
        this.error = this.success = null // reset the feedback
        // console.log('pre profile this.$state.state', this.$state.state)
        const res = await ProfileService.getProfile(user)
        this.$root.currUser = this.user = res.data.user
        // console.log('user', this.user,
        //   'user profile', this.user.PassProfile,
        //   'user.profile.id', this.user.PassProfile.id,
        //   'user.profile.schedules', this.user.PassProfile.PassSchedules)

        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async getDriverProfile (user) {
      try {
        console.log('Getting driver profile')
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getProfile(user)
        this.$root.currUser = this.user = res.data.user
        this.waypoints = this.user.DriverProfile.DriverWaypoints
        console.log('profile:this.waypoints', this.waypoints)
        // console.log('user', this.user,
        //   'user profile', this.user.DriverProfile,
        //   'user.profile.id', this.user.DriverProfile.id,
        //   'user.profile.schedules', this.user.DriverProfile.DriverSchedules)

        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async getPassSchedule (user) {
      try {
        console.log('Getting Schedule')
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getPassSchedule(user)
        this.schedule = res.data.schedule
        console.log('Schedule', this.schedule)
        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    },
    async save () {
      try {
        console.log('Saving Profile')
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.saveProfile(this.user)
        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
        console.log(`client: Error saving profile ${this.error}`)
      }
    }
  }
}
</script>

<style scoped>

</style>
