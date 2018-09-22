<template lang="pug">
  table
    thead
      tr
        th(v-for="(cell, headerIndex) in table.header")
          template(v-if="options.sort") {{ cell }}
            span(class="icon-arrow-up-circle")
            span(class="icon-arrow-down-circle")
          template(v-else) {{ cell }}
    tbody
      tr(v-for="(row, rowIndex) in table.body")
        td(v-for="(cell, colIndex) in row" @click="edit(rowIndex, colIndex)")
          template(v-if="!options.edit") {{ cell }}
          template(v-else-if="(selected[0] === rowIndex && selected[1] === colIndex)")
            input(v-model="table.body[rowIndex][colIndex]" :ref="`input-${rowIndex}-${colIndex}`")
          template(v-else) {{ cell }}
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
      .map(e => typeof e === 'object')
      .reduce((a, c) => a && c)
  }
}

function dataToObject (data) {
  let header = Object.keys(data[0])
  let body = data.map((e) => Object.values(e))
  return { header, body }
}

export default {
  data () {
    return {
      selected: []
    }
  },
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
    },
    options: Object
  },
  computed: {
    table: {
      get () {
        if (Array.isArray(this.data)) {
          return dataToObject(this.data)
        }
        return this.data
      }
    }
  },
  methods: {
    edit (rowIndex, colIndex) {
      this.selected = [rowIndex, colIndex]
      this.$nextTick(() => {
        const el = this.$refs[`input-${rowIndex}-${colIndex}`][0]
        el.focus()
        el.addEventListener('focusout', () => {
          this.selected = []
        })
        el.removeEventListener('focusout', null)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
