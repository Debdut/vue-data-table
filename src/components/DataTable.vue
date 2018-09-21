<template lang="pug">
  table
    thead
      tr
        th(v-for="cell in data.header") {{ cell }}
    tbody
      tr(v-for="row in data.body")
        td(v-for="cell in row") {{ cell }}
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
      validator (val) {
        if (!val.hasOwnProperty('header')) { // Validation Fails if data has no property 'header'
          return false
        } else if (!Array.isArray(val.header)) { // Validation fails if data.header is not Array
          return false
        }

        if (!val.hasOwnProperty('body')) { // Validation Fails if data has no property 'body'
          return false
        } else if (!Array.isArray(val.body)) { // Validation fails if data.body is not Array
          return false
        } else if ( // Validation fails if data.header is not Array of Array
          !val.body
            .map(e => Array.isArray(e))
            .reduce((a, c) => a && c)
        ) {
          return false
        }

        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
