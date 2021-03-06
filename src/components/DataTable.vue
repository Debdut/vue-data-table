<template lang="pug">
  table
    thead
      tr
        th(v-if="options.addRow")
        th(v-if="options.removeRow")
        template(v-if="typeof options.headerStyle === 'object'")
          th(v-for="(cell, headerIndex) in table.header" @click="editHead(headerIndex)"  :style="{color : options.headerStyle.fontColor, background : options.headerStyle.backgroundColor}")
            template(v-if="options.addCol")
              span(class="icon-add-col-before" @click="insertCol(headerIndex, 'Before')") ↲
              span(class="icon-add-col-after" @click="insertCol(headerIndex, 'After')") ↳
            template(v-if="options.removeColumn")
              span(class="icon-cross-col" @click="deleteCol(headerIndex)") ×
            template(v-if="options.sort")
              span(class="icon-up" @click="sort(headerIndex, false)") ↑
              span(class="icon-down" @click="sort(headerIndex, true)") ↓
            template(v-if="!options.edit") {{ cell }}
            template(v-else-if="(selectedHead[0] === headerIndex)")
              input(v-model="table.header[headerIndex]" :ref="`input-${headerIndex}`" @change="updateHeadData(headerIndex)")
            template(v-else) {{ cell }}
            template(v-if="options.filter")
              input(v-model="searchedValue" @change="filterTable(headerIndex)")
        template(v-else)
          th(v-for="(cell, headerIndex) in table.header" @click="editHead(headerIndex)"  class="header-red")
            template(v-if="options.addCol")
              span(class="icon-add-col-before" @click="insertCol(headerIndex, 'Before')") ↲
              span(class="icon-add-col-after" @click="insertCol(headerIndex, 'After')") ↳
            template(v-if="options.removeColumn")
              span(class="icon-cross-col" @click="deleteCol(headerIndex)") ×
            template(v-if="options.sort")
              span(class="icon-up" @click="sort(headerIndex, false)") ↑
              span(class="icon-down" @click="sort(headerIndex, true)") ↓
            template(v-if="!options.edit") {{ cell }}
            template(v-else-if="(selectedHead[0] === headerIndex)")
              input(v-model="table.header[headerIndex]" :ref="`input-${headerIndex}`" @change="updateHeadData(headerIndex)")
            template(v-else) {{ cell }}
            template(v-if="options.filter")
              input(v-model="searchedValue" @change="filterTable(headerIndex)")

    tbody
      tr(v-for="(row, rowIndex) in table.body")
        td(v-if="options.addRow")
          span(class="icon-add-row-down" @click="insertRow(rowIndex, 'Down')") ↳
          span(class="icon-add-row-up" @click="insertRow(rowIndex, 'Up')") ↱
        td(v-if="options.removeRow")
          span(class="icon-cross-row" @click="deleteRow(rowIndex)") ×
        template(v-if="typeof options.tableStyle === 'object' || hasColStyleAttribute(virtualColumn) || hasrowStyleAttribute(virtualRow) || hascellStyleAttribute(virtualCell)")
          td(v-for="(cell, colIndex) in row" @click="editBody(rowIndex, colIndex)"  :style="finalStyle(rowIndex, colIndex)")
            template(v-if="!options.edit") {{ cell }}
            template(v-else-if="(selectedBody[0] === rowIndex && selectedBody[1] === colIndex)")
              input(v-model="table.body[rowIndex][colIndex]" :ref="`input-${rowIndex}-${colIndex}`" :type="`${column[colIndex].type}`" :maxlength="`${column[colIndex].maxTextSize}`" @change="updateBodyData(rowIndex, colIndex)")
            template(v-else) {{ cell }}
        template(v-else)
          td(v-for="(cell, colIndex) in row" @click="editBody(rowIndex, colIndex)"  :class="finalClass(rowIndex, colIndex)")
            template(v-if="!options.edit") {{ cell }}
            template(v-else-if="(selectedBody[0] === rowIndex && selectedBody[1] === colIndex)")
              input(v-model="table.body[rowIndex][colIndex]" :ref="`input-${rowIndex}-${colIndex}`" :type="`${column[colIndex].type}`" :maxlength="`${column[colIndex].maxTextSize}`" @change="updateBodyData(rowIndex, colIndex)")
            template(v-else) {{ cell }}
      span(class="icon-reset" @click="reset()") ↻
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

function dataToObject (data) { // converts a array form to object form
  let header = Object.keys(data[0])
  let body = data.map((e) => header.map(h => e[h]))
  return { header, body }
}

function dataToArray (obj) { // converts a object form to array form
  let data = []
  for (let i = 0; i < obj.body.length; i++) {
    data[i] = {}
    for (let j = 0; j < obj.header.length; j++) {
      data[i][obj.header[j]] = obj.body[i][j]
    }
  }
  return data
}

function deepCopy (object) {
  return JSON.parse(JSON.stringify(object))
}

function format (data, form) {
  if (form === 'array') {
    return dataToObject(data)
  }
  return deepCopy(data)
}

export default {
  data () {
    return {
      selectedHead: [],
      selectedBody: [],
      table: format(this.data, this.form),
      searchedValue: '',
      virtualColumn: this.column,
      virtualRow: this.row,
      virtualCell: this.cell
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
    options: Object,
    column: Array,
    row: Array,
    cell: Array
  },
  computed: {
    form () {
      if (Array.isArray(this.data)) {
        return 'array'
      }
      return 'object'
    }
  },
  methods: {
    editBody (row, col) {
      if (this.virtualColumn[col].edit === true && this.virtualRow[row].edit === true && this.virtualCell[row][col].edit === true) {
        this.selectedBody = [row, col]
        this.$nextTick(() => {
          const el = this.$refs[`input-${row}-${col}`][0]
          el.focus()
          el.addEventListener('focusout', () => {
            this.selectedBody = []
          })
          el.removeEventListener('focusout', null)
        })
      }
    },
    editHead (head) {
      this.selectedHead = [head]
      this.$nextTick(() => {
        const el = this.$refs[`input-${head}`][0]
        el.focus()
        el.addEventListener('focusout', () => {
          this.selectedHead = []
        })
        el.removeEventListener('focusout', null)
      })
    },
    sort (headerIndex, up) {
      if (this.virtualColumn[headerIndex].sort === true) {
        const compareUp = (this.options &&
        this.options.column &&
        this.options.column[headerIndex] &&
        this.options.column[headerIndex].sortBy) ||
        (this.options && this.options.sortBy) ||
        ((a, b) => a > b)
        const compare = (a, b) => (up) ? compareUp(a, b) : !compareUp(a, b)

        let temp
        for (let i = 0; i < this.table.body.length - 1; i++) {
          for (let j = 0; j < this.table.body.length - 1 - i; j++) {
            if (compare(this.table.body[j][headerIndex], this.table.body[j + 1][headerIndex])) {
              temp = this.table.body[j]
              this.table.body[j] = this.table.body[j + 1]
              this.table.body[j + 1] = temp
            }
          }
        }
      }
      this.selectedBody = []
    },
    deleteCol (col) {
      if (this.virtualColumn[col].remove === true) {
        let slicedArray = this.table.header.slice(col + 1, this.table.header.length)
        this.table.header = this.table.header.slice(0, col)

        for (let i = 0; i < slicedArray.length; i++) {
          this.table.header.push(slicedArray[i])
        }
        for (let a = 0; a < this.table.body.length; a++) {
          let slicedArray = this.table.body[a].slice(col + 1, this.table.body[a].length)
          this.table.body[a] = this.table.body[a].slice(0, col)

          for (let i = 0; i < slicedArray.length; i++) {
            this.table.body[a].push(slicedArray[i])
          }
        }
        this.virtualColumn.splice(col, 1)
      }
      this.selectedBody = []
    },
    deleteRow (row) {
      if (this.virtualRow[row].remove === true) {
        let slicedArray = this.table.body.slice(row + 1, this.table.body.length)
        this.table.body = this.table.body.slice(0, row)

        for (let i = 0; i < slicedArray.length; i++) {
          this.table.body.push(slicedArray[i])
        }
        this.virtualRow.splice(row, 1)
      }
      this.selectedBody = []
      // console.log(this.table.body)
      // console.log(this.data.body)
    },
    reset () {
      this.table = format(this.data, this.form)
      this.virtualColumn = this.column
      this.virtualRow = this.row
    },
    insertRow (row, where) {
      if (where === 'Down') {
        row = row + 1
      }

      if (this.form === 'object') {
        this.data.body.splice(row, 0, Array(this.table.header.length).fill(''))
      } else this.data.splice(row, 0, {})

      this.table.body.splice(row, 0, Array(this.table.header.length).fill(''))
      this.virtualCell.splice(row, 0, [{ edit: true }, { edit: true }, { edit: true }])
      this.virtualRow.splice(row, 0, { edit: true, remove: true })
      this.selectedBody = []
    },
    insertCol (head, where) {
      if (where === 'After') {
        head = head + 1
      }

      if (this.form === 'object') {
        this.data.header.splice(head, 0, '')
        for (let i = 0; i < this.table.body.length; i++) {
          this.data.body[i].splice(head, 0, '')
        }
        this.table.header.splice(head, 0, '')
        for (let i = 0; i < this.table.body.length; i++) {
          this.table.body[i].splice(head, 0, '')
        }
      } else if (this.form === 'array') {
        this.table.header.splice(head, 0, '')
        for (let i = 0; i < this.table.body.length; i++) {
          this.table.body[i].splice(head, 0, '')
        }
        this.data = dataToArray(this.table)
      }
      for (let i = 0; i < this.virtualCell.length; i++) {
        this.virtualCell[i].splice(1, 0, { edit: true })
      }
      this.virtualColumn.splice(head, 0, { edit: true, sort: true, remove: true, type: 'text' })
      this.selectedBody = []
      this.selectedHead = []
    },
    filterTable (head) {
      // console.log('hello')
      if (this.form === 'object') {
        for (let i = 0; i < this.data.body.length; i++) {
          // console.log(`${this.data.body[i][head]}`)
          // console.log(`${this.searchedValue}`)
          // console.log(head)
          if (`${this.data.body[i][head]}`.includes(`${this.searchedValue}`) === false) {
            // console.log(false)
            for (let j = 0; j < this.data.body.length; j++) {
              for (let k = 0; k < this.data.header.length; k++) {
                if (`${this.data.body[i][head]}` === `${this.data.body[j][k]}`) {
                  this.deleteRow(i)
                }
              }
            }
          }
        }
      }
    },
    updateHeadData (head) {
      if (this.form === 'array') {
        for (let i = 0; i < this.table.header.length; i++) {
          this.data[i][`${this.table.header[head]}`] = this.data[i][`${Object.keys(this.data[i])[head]}`]
          delete this.data[i][`${Object.keys(this.data[i])[head]}`]
          this.data = dataToArray(this.table)
        }
      } else if (this.form === 'object') {
        this.data.header[head] = this.table.header[head]
      }
      this.selectedHead = []
    },
    updateBodyData (row, col) {
      if (this.form === 'array') {
        const property = this.table.header[col]
        this.data[row][property] = this.table.body[row][col]
      } else if (this.form === 'object') {
        this.data.body[row][col] = this.table.body[row][col]
      }
      this.selectedBody = []
    },
    hasColStyleAttribute (array) {
      let hasCol
      let boolean = false
      for (let i = 0; i < array.length; i++) {
        if (array[i].colStyle !== undefined) {
          hasCol = true
        } else {
          hasCol = false
        }
        boolean = boolean || hasCol
      }

      return boolean
    },
    hasrowStyleAttribute (array) {
      let hasRow
      let boolean = false
      for (let i = 0; i < array.length; i++) {
        if (array[i].rowStyle !== undefined) {
          hasRow = true
        } else {
          hasRow = false
        }
        boolean = boolean || hasRow
      }
      return boolean
    },
    hascellStyleAttribute (array) {
      let hasCol
      let boolean = false
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (array[i][j].cellStyle !== undefined) {
            hasCol = true
          } else {
            hasCol = false
          }
          boolean = boolean || hasCol
        }
      }
      return boolean
    },
    finalStyle (rowIndex, colIndex) {
      return this.cell[rowIndex][colIndex].cellStyle !== undefined ? { color: this.cell[rowIndex][colIndex].cellStyle.fontColor, background: this.cell[rowIndex][colIndex].cellStyle.backgroundColor } : (this.row[rowIndex].rowStyle !== undefined ? { color: this.row[rowIndex].rowStyle.fontColor, background: this.row[rowIndex].rowStyle.backgroundColor } : (this.column[colIndex].colStyle === undefined ? { color: this.options.tableStyle.fontColor, background: this.options.tableStyle.backgroundColor } : { color: this.column[colIndex].colStyle.fontColor, background: this.column[colIndex].colStyle.backgroundColor }))
    },
    finalClass (rowIndex, colIndex) {
      return this.options.cellClass === true ? `cell-${rowIndex + 1}-${colIndex + 1}` : (this.options.rowClass === true ? `row-${rowIndex + 1}` : (this.options.colClass === true ? `column-${colIndex + 1}` : 'table-red'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>

.header-red
  color: red
  background: blue

.table-red
  color: red
  background: blue

.column-1
  color: green
  background: red

.column-2
  color: yellow
  background: blue

.column-3
  color: black
  background: grey

.row-1
  color: red
  background: green

.row-2
  color: blue
  background: yellow

.row-3
  color: grey
  background: black

.cell-1-1
    color: white
    background: white

.cell-2-2
    color: black
    background: black

</style>
