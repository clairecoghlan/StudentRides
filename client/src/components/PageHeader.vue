<template lang="pug">
    v-toolbar(fixed dark).cyan
      v-toolbar-title
        span(@click="routeTo ('/')").clickable Student Rides
      v-toolbar-items

      v-spacer
      v-toolbar-items
        v-btn(v-if="isAdmin()"  flat dark @click="daysOfWeek") WeekDays
        v-btn(v-if="isLoggedIn()" flat dark @click="routeTo ('profile')") Profile
        v-btn(v-if="isLoggedIn()" flat dark @click="logout") Logout
        v-btn(v-if="isLoggedOut()" flat dark @click="routeTo ('login')") Login
        v-btn(v-if="isLoggedOut()" flat dark @click="routeTo ('register')") Sign Up

</template>

<script>
import UtilServices from '@/services/UtilServices'
export default {
  name: 'PageHeader',
  methods: {
    logout () {
      this.$root.currUser = null
      this.routeTo('home')
    },
    daysOfWeek () {
      console.log('creating days of week')
      UtilServices.setDaysOfWeek()
    }
  }

}
</script>

<style scoped>
.clickable {
  cursor: pointer
}
.clickable:hover {
  color: black;
}
</style>
