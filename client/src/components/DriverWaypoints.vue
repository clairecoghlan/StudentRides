<template lang="pug">

  .container.pl-4.pr-4.pt-2.pb-2
    .slot
      //- v-text-field(
      //-   list="waypoints"
      //-   v-model="waypoints"
      //-   v-on:keyup="waypointsKeyup"
      //-   v-on:keyup.enter="processWaypoints"
      //-   label="Way Point Locations"
      //- )
      datalist#locations
        option(v-for="location in locations") {{location.toponymName}}
      br
      v-btn(@click="refresh" dark).cyan display
      table.striped
        thead
          tr
            th Location
            th Mins
        tbody
          tr(v-for="waypoint in waypoints")
            td()
              v-text-field(
                v-model="waypoint.location"
                v-bind:list="waypoint.sequence"
                append-icon="search"
                v-on:keyup="geonames(waypoint.location)"
              )
              datalist(v-bind:id="waypoint.sequence")
                option(v-for="location in locations") {{location.toponymName}}
            td()
              v-text-field(
                v-model="waypoint.mins"
              )
            td
              v-btn(@click="wpAdd(waypoint.sequence)" icon v-model='waypoint.sequence')
                v-icon add_circle
              v-btn(@click="wpDel(waypoint.sequence)" icon v-model='waypoint.sequence')
                v-icon remove_circle
</template>

<script>
import Panel from './Panel'
class Waypoint {
  constructor (user, location, mins, sequence = 0) {
    this.id = null
    this.location = location
    this.sequence = sequence
    this.mins = mins
    console.log('Waypoint User', user)
    if (!user.DriverProfile) {
      console.log('Error : no DriverProfile! ', user)
    } else {
      this.DriverProfileId = user.DriverProfile.id
    }
  }
}
export default {
  name: 'DriverWaypoints',
  data () {
    return {
      locations: []
      // waypoints: '',
      // waypoints: []
    }
  },
  components: {
    Panel
  },
  mounted () {
    console.log('Driver Waypoints Mounted')
    if (!this.user.DriverProfile) {
      console.log('Driver Waypoints, No profile!!')
    }
    this.initWaypoints()
  },
  props: [
    'user',
    'waypoints'
  ],
  methods: {
    refresh () {
      console.log('DriverWaypoints.vue:waypoints', this.waypoints)
      this.initWaypoints()
    },
    fixWaypoints () {
      console.log('Fixing Waypoints')
      for (var i = 0; i < this.waypoints.length; i++) {
        let wp = this.waypoints[i]
        wp.sequence = i + 1
        if (i > 0) {
          if (wp.mins === 0) {
            wp.mins = this.waypoints[i - 1].mins + 10
          }
          if (wp.mins <= this.waypoints[i - 1].mins) {
            wp.mins = this.waypoints[i - 1].mins + 10
          }
        }
      }
      this.user.DriverProfile.DriverWaypoints = this.waypoints
    },
    initWaypoints () {
      this.waypoints = this.user.DriverProfile.DriverWaypoints
      if (this.waypoints.length > 0) {
        console.log('DriverWaypoints.vue:waypoints', this.waypoints)
      } else {
        console.log('DriverWaypoints.vue:no DriverWaypoints - set defaults')
        this.waypoints = [] // clear
        let mins = 10
        let i = 1
        this.waypoints.push(new Waypoint(this.user, this.user.DriverProfile.location, mins * i, i++))
        this.waypoints.push(new Waypoint(this.user, 'UCC', mins * i, i++))
        console.log('Default Waypoints', this.waypoints)
        this.user.DriverProfile.DriverWaypoints = this.waypoints
      }
    },
    wpAdd (index) {
      console.log('add:click', index)
      this.waypoints.splice(index, 0, new Waypoint(this.user, '', 0, index))
      this.fixWaypoints()
    },
    wpDel (index) {
      console.log('del:click', index)
      this.waypoints.splice(index - 1, 1)
      this.fixWaypoints()
    },
    waypointsKeyup (event) {
      // console.log(event.key)
      if (event.key === ',') {
        console.log('new word')
        this.processWaypoints()
      }
    },
    processWaypoints () {
      let mins = 0
      let i = 1
      this.waypoints = [] // clear
      this.waypoints.push(new Waypoint(this.user, 'Home', mins, i++))
      mins += 10
      console.log('this.waypoints', this.waypoints)
      if (this.waypoints.includes(',')) {
        let waypoints = this.waypoints.split(',')
        for (var x in waypoints) {
          let waypoint = waypoints[x]
          console.log('waypoint', waypoint)
          // see if in waypoints
          this.waypoints.push(new Waypoint(this.user, waypoint, mins, i++))
          mins += 10
        }
      } else {
        if (this.waypoints.trim().length > 0) {
          this.waypoints.push(new Waypoint(this.user, this.waypoints.trim(), mins, i++))
          mins += 10
        }
      }
      this.waypoints.push(new Waypoint(this.user, 'UCC', mins, i++))
      console.log('Waypoints', this.waypoints)
      // this.user.DriverProfile.DriverWaypoints = this.waypoints
    }
  }
  // computed: {
  //   waypoints: {
  //     get () {
  //       if (this.user && this.user.DriverProfile && this.user.DriverProfile.DriverWaypoints && this.user.DriverProfile.DriverWaypoints.length > 0) {
  //         console.log('DriverWaypoints', this.user.DriverProfile.DriverWaypoints)
  //         let waypoints = this.user
  //           .DriverProfile.DriverWaypoints
  //           .reduce((acc, val) => {
  //             const loc = val.location.trim()
  //             if (loc !== 'UCC' && loc !== 'Home' && loc !== '') {
  //               console.log('Location', loc)
  //               return acc + loc + (acc.trim().length > 0) ? ', ' : ''
  //             }
  //           }, '')
  //         return waypoints
  //       } else {

  //         console.log('No driver waypoints')
  //         return ''
  //       }
  //     },
  //     set (val) {
  //       console.log('loc', val)
  //     }
  //   }
  // },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
