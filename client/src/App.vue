<template lang="pug">
  #app.container
    v-app
      page-header
      main
        v-container(fluid)
          router-view
</template>

<script>
import PageHeader from '@/components/PageHeader'
export default {
  name: 'App',
  components: {
    PageHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
