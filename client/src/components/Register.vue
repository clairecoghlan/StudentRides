<template lang="pug">
  v-layout(column)
      v-flex(xs6 offset-xs3)
        .white.elevation-2
          v-toolbar(flat dense dark).cyan
            v-toolbar-title Register
          .container.pl-4.pr-4.pt-2.pb-2
            // name="email" - stop autocomplete
            v-text-field(
              type="email"
              v-model="email"
              label="Email"
            )
            br
            // name="password" - stop autocomplete
            v-text-field(
              type="password"
              v-model="password"
              label="Password"
            )
            br
            //- v-container(fluid)
            //-   v-layout(row wrap dark).dark--text
            //-     v-switch(
            //-       v-model="_isDriver"
            //-       label="Driver Profile")
            //-     v-switch(
            //-       v-model="IsPassenger"
            //-       label="Passenger Profile")
            br
            .error(v-html="error")
            .success(v-html="success")
            br
            v-btn(@click="register" dark).cyan Register

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      IsPassenger: true,
      error: null,
      success: null
    }
  },
  methods: {
    async register () {
      try {
        this.error = this.success = null // reset the feedback
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        // isPassenger: this.IsPassenger
        console.log('success response', response.data)
        this.success = response.data.success
      } catch (err) {
        this.error = err.response.data.error
      }
    }
  },
  computed: {
    _isDriver: {
      get () {
        return !this.IsPassenger
      },
      set (val) {
        this.IsPassenger = !this.IsPassenger
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
