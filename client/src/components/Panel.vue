<template lang="pug">
  v-layout(column)
    v-flex(xs6 offset-xs3)
      .white.elevation-2
        v-toolbar(flat dense dark).cyan
          v-toolbar-title {{title}}
        .container.pl-4.pr-4.pt-2.pb-2
          slot No slot content defined

</template>

<script>
export default {
  name: 'Panel',
  props: [
    'title'
  ]
}
</script>

<style scoped>

</style>
