<template lang="pug">
  table
    thead
      tr
        th(v-if="options.removeRow")
        th(v-for="(cell, headerIndex) in table.header")
          template(v-if="options.sort") {{ cell }}
            span(class="icon-up" @click="sort(headerIndex, 'Descinding')") ↑
            span(class="icon-down" @click="sort(headerIndex, 'Ascending')") ↓
          template(v-else) {{ cell }}
    tbody
      tr(v-for="(row, rowIndex) in table.body")
        td(v-if="options.removeRow")
          span(class="icon-cross" @click="deleteRow(rowIndex)") ×
        td(v-for="(cell, colIndex) in row" @click="edit(rowIndex, colIndex)")
          template(v-if="!options.edit") {{ cell }}
          template(v-else-if="(selected[0] === rowIndex && selected[1] === colIndex)")
            input(v-model="table.body[rowIndex][colIndex]" :ref="`input-${rowIndex}-${colIndex}`" @change="updateData(rowIndex, colIndex)")
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

function deepCopy (object) {
  return JSON.parse(JSON.stringify(object))
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
    form () {
      if (Array.isArray(this.data)) {
          return 'array'
        }
      return 'object'
    },
    table: {
      get () {
        if (this.form === 'array') {
          return dataToObject(this.data)
        }
        return deepCopy(this.data)
      }
    }
  },
  methods: {
    edit (row, col) {
      this.selected = [row, col]
      this.$nextTick(() => {
        const el = this.$refs[`input-${row}-${col}`][0]
        el.focus()
        el.addEventListener('focusout', () => {
          this.selected = []
        })
        el.removeEventListener('focusout', null)
      })
    },
    sort(headerIndex, whichSort) {
      let temp
      for(let i= 0; i < this.table.body.length-1; i++) {
        for(let j =0; j < this.table.body.length-1-i; j++) {
          if(whichSort === 'Ascending') {
            if(this.table.body[j][headerIndex] > this.table.body[j+1][headerIndex]) {
              temp = this.table.body[j]
              this.table.body[j] = this.table.body[j+1]
              this.table.body[j+1] = temp
            }
          }
          else {
            if(this.table.body[j][headerIndex] < this.table.body[j+1][headerIndex]) {
              temp = this.table.body[j]
              this.table.body[j] = this.table.body[j+1]
              this.table.body[j+1] = temp
            }
          }
        }
      }
      this.selected = []
    },
    deleteRow(row) {
      let slicedArray = this.table.body.slice(row+1, this.table.body.length)
      this.table.body = this.table.body.slice(0, row)

      for (let i = 0; i < slicedArray.length; i++) {
        this.table.body.push(slicedArray[i])
      }
      this.selected = []
    },
    updateData(row, col) {
      if (this.form === 'array') {
        const property = this.table.header[col]
        this.data[row][property] = this.table.body[row][col]
      } else if (this.form === 'object') {
        this.data.body[row][col] = this.table.body[row][col]
      }
      this.selected = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
</style>
