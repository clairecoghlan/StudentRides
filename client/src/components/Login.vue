<template lang="pug">
  v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title Login
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
          .error(v-html="error")
          .success(v-html="success")
          br
          v-btn(@click="login" dark).cyan Login

</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      msg: 'This is the Login Component',
      error: null,
      success: null
    }
  },
  methods: {
    async login () {
      try {
        this.error = this.success = null // reset the feedback
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log('success response', response.data)
        this.$root.currUser = this.user = response.data.user
        this.success = response.data.success
        this.routeTo('profile')
      } catch (err) {
        console.log('error response', err.response.data)
        this.error = err.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
