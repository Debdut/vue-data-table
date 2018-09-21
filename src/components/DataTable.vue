<template lang="pug">
  table
    thead
      tr
        th(v-for="(cell, headerIndex) in table.header") {{ cell }}
    tbody
      tr(v-for="(row, rowIndex) in table.body")
        td(v-for="(cell, colIndex) in row") {{ cell }}
</template>

<script>
const validators = {
  object: (val) => {
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
  },
  array: (val) => {
    return val
      .map(e => typeof(e) === 'object')
      .reduce((a, c) => a && c)
  }
}

function dataToObject  (data) {
  let header = Object.keys(data[0])
  let body = data.map((e) => Object.values(e))
  return { header, body }
}

export default {
  props: {
    data: {
      type: [Object, Array],
      required: true,
      validator (val) {
        if (Array.isArray(val)) {
          return validators['array'](val)
        }
        return validators['object'](val)
      }
    }
  },
  computed: {
    table: { 
      get () {
        if (Array.isArray(this.data)) {
          return dataToObject (this.data)
        }
        return this.data
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
