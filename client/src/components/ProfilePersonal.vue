<template lang="pug">
  .container.pl-4.pr-4.pt-2.pb-2
    v-text-field(
      type="email"
      v-model="user.email"
      label="Email"
    )
    br
    // name="password" - stop autocomplete
    v-text-field(
      type="password"
      v-model="user.password"
      label="Password"
    )
    br
    v-container(fluid)
      v-layout(row wrap dark).dark--text

        <!--v-on:change="toggleIsPassenger"-->
        <!--v-on:change="toggleIsDriver" -->
        v-switch(
          v-model="_isDriver"
          label="Driver Profile"
        )
        <!--span.v-input__control Driver Profile-->
        <!-- v-on:change="toggleIsPassenger" -->
        v-switch(
          v-model="user.isPassenger"
          label="Passenger Profile"
        )
        //- br
        //- vuetify-google-autocomplete(
        //-   id="map"
        //-   label="Home"
        //-   append-icon="search"
        //-   placeholder="Start typing"
        //-   v-on:placechanged="getAddressData"
        //- )
        br
        v-text-field(
          list="locations"
          label="Home"
          append-icon="search"
          placeholder="Start typing"
          v-on:keyup="geonames(user.home)"
          v-model="user.home"
        )
        datalist#locations
          option(v-for="location in locations") {{location.toponymName}}

      br
      .error(v-html="error")
      .success(v-html="success")
      <!--br-->
      <!--v-btn(@click="" dark).cyan Save-->

</template>

<script>

export default {
  name: 'ProfilePersonal',
  data () {
    return {
      // user: {},
      dataIsDriver: this.isDriver(),
      home: '',
      locations: [],
      success: '',
      error: ''
    }
  },
  mounted () {
    this.dataIsDriver = this.isDriver()
  },
  props: [
    'user'
  ],
  computed: {
    _isDriver: {
      get () {
        return !this.user.isPassenger
      },
      set (val) {
        this.user.isPassenger = !this.user.isPassenger
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
