<template lang="pug">
   v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title Schedule
        .container.pt-2.pb-2
          .modal-backdrop
            .modal
              //- slot(name='header')
              //-   v-btn.btn-close(@click='close') x
              driver-schedule( v-bind:schedule="driverSchedule")
              slot(name='footer')
                v-btn.btn-close(@click='close') Close
</template>
<script>
import DriverSchedule from './DriverSchedule'
export default {
  name: 'modal',
  data () {
    return {
    }
  },
  components: {
    DriverSchedule
  },
  methods: {
    close () {
      console.log('close the bloody thing!!')
      this.$emit('closeModal')
      this.$parent.isScheduleVisible = false
    }
  },
  props: [
    'driverSchedule'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
