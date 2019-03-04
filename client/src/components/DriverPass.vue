<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    v-btn(@click="getDriverPass" dark).cyan Search

    table(striped)
      thead
        tr
          td(colspan="1") Passengers
          td(colspan="1") Pick up Location
      tbody

        tr(v-for="pass in passengers")
          td {{pass.passEmail}}
          td {{pass.location}}
</template>

<script>
import ProfileService from '@/services/ProfileService'
export default {
  name: 'Passengers',
  data () {
    return {
      passengers: []
    }
  },
  props: {
  },
  mounted () {
    console.log('Passengers mounted')
    // this.getPassSchedule()
  },
  methods: {
    async getDriverPass () {
      try {
        console.log('****** getDriverPass?', this.user())
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getDriverPass(this.user())
        console.log('*** data', res.data)
        this.passengers = res.data.passPickupPoints
        console.log('*** Passenger pickup points', this.passengers)
        // this.success = res.data.success
      } catch (err) {
        console.log('error?')
        this.error = err.response.data.error
      }
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
