<template lang="pug">
  #app
    data-table(:data="data1" :column="column" :row="row" :options="{ edit: true , sort: true, removeRow: true, removeColumn: true, addRow: true, addCol: true, filter: true, tableStyle: { backgroundColor : '#e3e4e5', fontColor : '#4286f4'}, headerStyle: { backgroundColor : '#c6c3c2', fontColor : '#ef6976'}, tabeClass: true, colClass: true}")

</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  name: 'app',
  components: {
    DataTable
  },
  data () {
    return {
      data1: {
        header: ['name', 'age', 'job'],
        body: [
          ['debdut', 23, 'NA'],
          ['saikat', 20, 'NA'],
          ['babu', 11, 'NA']
        ]
      },
      data2: [
        { name: 'debdut', age: 21, job: 'NA' },
        { name: 'saikat', age: 20, job: 'NA' },
        { name: 'babu', age: 37, job: 'NA' }
      ],
      column: [
        {
          edit: true,
          sort: true,
          remove: true,
          type: 'text',
          maxTextSize: 10,
          colStyle: { backgroundColor: 'red', fontColor: 'green' }
        },
        {
          edit: false,
          sort: false,
          remove: false,
          type: 'number',
          maxTextSize: 10,
          colStyle: { backgroundColor: 'blue', fontColor: 'yellow' }
        },
        {
          edit: true,
          sort: true,
          remove: true,
          type: 'text',
          maxTextSize: 10,
          colStyle: { backgroundColor: 'grey', fontColor: 'black' }
        }
      ],
      row: [
        {
          edit: false,
          remove: true,
          rowStyle: { backgroundColor: 'green', fontColor: 'red' }
        },
        {
          edit: false,
          remove: false,
          rowStyle: { backgroundColor: 'yellow', fontColor: 'blue' }
        },
        {
          edit: true,
          remove: true,
          rowStyle: { backgroundColor: 'black', fontColor: 'grey' }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
