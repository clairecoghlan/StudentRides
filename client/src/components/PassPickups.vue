<template lang="pug">

  .container.pl-4.pr-4.pt-2.pb-2
    .slot
      //- v-text-field(
      //-   list="pickups"
      //-   v-model="pickups"
      //-   v-on:keyup="pickupsKeyup"
      //-   v-on:keyup.enter="processPickups"
      //-   label="Way Point Locations"
      //- )
      datalist#locations
        option(v-for="location in locations") {{location.toponymName}}
      br
      v-btn(@click="refresh" dark).cyan Load.
      v-btn(@click="wpAdd()" dark).cyan add
      .text-xs-center
        table
          thead
            tr
              th Location
          tbody
            tr(v-for="pickup in pickups")
              td()
                v-text-field(
                  v-model="pickup.location"
                  v-bind:list="pickup.location"
                  append-icon="search"
                  v-on:keyup="geonames(pickup.location)"
                )
                datalist(v-bind:id="pickup.location")
                  option(v-for="location in locations") {{location.toponymName}}
              td
                v-btn(@click="wpDel()" icon)
                  v-icon remove_circle
</template>

<script>
import Panel from './Panel'
class Pickup {
  constructor (user, location) {
    this.id = null
    this.location = location
    console.log('Pickup User', user)
    if (!user.PassProfile) {
      console.log('Error : no PassProfile! ', user)
    } else {
      this.PassProfileId = user.PassProfile.id
    }
  }
}
export default {
  name: 'PassPickups',
  data () {
    return {
      locations: []
      // pickups: '',
      // pickups: []
    }
  },
  components: {
    Panel
  },
  mounted () {
    console.log('Pass Pickups Mounted')
    if (!this.user.PassProfile) {
      console.log('Pass Pickups, No profile!!')
    }
    this.initPickups()
  },
  props: [
    'user',
    'pickups'
  ],
  methods: {
    refresh () {
      console.log('PassPickups.vue:pickups', this.pickups)
      this.initPickups()
    },
    fixPickups () {
      console.log('Fixing Pickups')
      // for (var i = 0; i < this.pickups.length; i++) {
      //   let wp = this.pickups[i]
      // }
      this.user.PassProfile.PassPickups = this.pickups
    },
    initPickups () {
      this.pickups = this.user.PassProfile.PassPickupPoints
      if (this.pickups.length > 0) {
        console.log('PassPickups.vue:pickups', this.pickups)
      } else {
        console.log('PassPickups.vue:no PassPickups - set defaults')
        this.pickups = [] // clear
        // let mins = 10
        // let i = 1
        this.pickups.push(new Pickup(this.user, this.user.home))
        console.log('Default Pickups', this.pickups)
        this.user.PassProfile.PassPickupPoints = this.pickups
      }
    },
    wpAdd (index) {
      console.log('add:click', index)
      this.pickups.push(new Pickup(this.user, '', 0, index))
      this.fixPickups()
    },
    wpDel (index) {
      console.log('del:click', index)
      this.pickups.splice(index - 1, 1)
      this.fixPickups()
    },
    pickupsKeyup (event) {
      // console.log(event.key)
      if (event.key === ',') {
        console.log('new word')
        this.processPickups()
      }
    },
    processPickups () {
      let mins = 0
      let i = 1
      this.pickups = [] // clear
      this.pickups.push(new Pickup(this.user, 'Home', mins, i++))
      mins += 10
      console.log('this.pickups', this.pickups)
      if (this.pickups.includes(',')) {
        let pickups = this.pickups.split(',')
        for (var x in pickups) {
          let pickup = pickups[x]
          console.log('pickup', pickup)
          // see if in pickups
          this.pickups.push(new Pickup(this.user, pickup, mins, i++))
          mins += 10
        }
      } else {
        if (this.pickups.trim().length > 0) {
          this.pickups.push(new Pickup(this.user, this.pickups.trim(), mins, i++))
          mins += 10
        }
      }
      this.pickups.push(new Pickup(this.user, 'UCC', mins, i++))
      console.log('Pickups', this.pickups)
      // this.user.PassProfile.PassPickups = this.pickups
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
