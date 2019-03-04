<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    driver-schedule(name='driver-schedule', v-show="isScheduleVisible", v-bind:driverSchedule="schedule")
    v-btn(@click="getPassDrivers" dark).cyan Search
    table(striped)
      thead
        tr
          td(colspan="1") Driver
          td(colspan="1") Pick up Location
      tbody

        tr(v-for="driver in drivers" :key="driver.driverUserId")
          td {{driver.driverEmail}}
          td {{driver.location}}
          td
            v-btn(@click='showDriverSchedule(driver.driverUserId)' dark).cyan See Schedule
</template>

<script>
import ProfileService from '@/services/ProfileService'
import DriverSchedule from './Modal'
export default {
  name: 'Drivers',
  components: {
    DriverSchedule
  },
  data () {
    return {
      isScheduleVisible: false,
      schedule: [],
      drivers: []
    }
  },
  props: {
  },
  mounted () {
    console.log('Drivers mounted')
    // this.getPassSchedule()
  },
  methods: {
    async getPassDrivers () {
      try {
        console.log('****** getPassDrivers?', this.user())
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getPassDrivers(this.user())
        this.drivers = res.data.driverWaypoints
        // console.log('Schedule', this.schedule)
        // this.success = res.data.success
      } catch (err) {
        console.log('error?')
        this.error = err.response.data.error
      }
    },
    async showDriverSchedule (driverUserId) {
      console.log('Button clucked for driver', driverUserId)
      this.isScheduleVisible = true
      // this.schedule = ProfileService.getDriverScheduleByUserId(driverUserId)
      const res = await ProfileService.getProfileById(driverUserId)
      const user = res.data.user
      console.log('driver?', user)
      this.schedule = user.DriverProfile.DriverSchedules
    },
    closeModal () {
      console.log('Close Button clucked')
      this.isScheduleVisible = false
    }
  },
  computed: {
  }
}
</script>

<style scoped>
table {
  width: 100%;
}

table,tr,td {
  border: 1px cyan solid;
  border-collapse: collapse;
}
td.time {
  text-align:right;
}
</style>
