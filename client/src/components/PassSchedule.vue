<template lang="pug">
  table(striped)
    thead
      tr
        td Day
        td(colspan="2") Outbound
        td(colspan="2") Return
      tr
        td
        td Dep (Home)
        td Arr (UCC)
        td Dep (UCC)
        td Arr (Home)
    tbody

      tr(v-if="index<5" v-for="(item,index) in sorted")
        <!--td {{index}}-->
        td {{schedule[index].DaysOfWeek.day}}
        <!--td {{schedule[index].leg}}-->
        <!--not needed will come from driver/trip-->
        td.time
          v-text-field(v-model="schedule[index].dep" type="time")
        td.time
          v-text-field(v-model="schedule[index].arr" type="time")

        <!--td {{index+5}}-->
        <!--td {{schedule[index + 5].DaysOfWeekId}}-->
        <!--td {{schedule[index + 5].leg}}-->
        td.time
          v-text-field(v-model="schedule[index + 5].dep" type="time")
        td.time
          v-text-field(v-model="schedule[index + 5].arr" type="time")

</template>

<script>
import ProfileService from '@/services/ProfileService'
export default {
  name: 'Schedule',
  data () {
    return {
      arr: [],
      // schedule: {},
      schedule2: [
        {day: 'mon', out: {dep: '08:00', arr: '09:00'}, rtn: {dep: '17:00', arr: '18:00'}},
        {day: 'tue', out: {dep: '08:00', arr: '09:00'}, rtn: {dep: '17:00', arr: '18:00'}},
        {day: 'wed', out: {dep: '08:00', arr: '09:00'}, rtn: {dep: '17:00', arr: '18:00'}},
        {day: 'thu', out: {dep: '08:00', arr: '09:00'}, rtn: {dep: '17:00', arr: '18:00'}},
        {day: 'fri', out: {dep: '08:00', arr: '09:00'}, rtn: {dep: '17:00', arr: '18:00'}}
      ]
    }
  },
  props: {
    schedule: {default: []}// dow, leg, dep, arr
  },
  mounted () {
    console.log('Schedule mounted')
    // this.getPassSchedule()
  },
  methods: {
    async getPassSchedule () {
      try {
        this.error = this.success = null // reset the feedback
        const res = await ProfileService.getPassSchedule(this.user)
        this.schedule = res.data.schedule
        console.log('Schedule', this.schedule)
        this.success = res.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  computed: {
    sorted () {
      const arr = this.schedule.slice().sort((a, b) => (a.leg - b.leg) || (a.DaysOfWeekId - b.DaysOfWeekId))
      // const arr = this.schedule.slice().sort((a, b) => {
      //   if (a.DaysOfTheWeekId > b.DaysOfTheWeekId) return 1
      //   else if (a.DaysOfTheWeekId < b.DaysOfTheWeekId) return -1
      //   else if (a.leg > b.leg) return 1
      //   else if (a.leg > b.leg) return -1
      //   else return 0
      // })
      // console.log('Schedule (sorted)', arr)
      return arr // slice() avoid mutation
    }
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
