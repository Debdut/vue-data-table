<template lang="pug">
  #app
    data-table(:data="data1" :column="column" :options="{ edit: true , sort: true, removeRow: true, removeColumn: true, addRow: true, addCol: true, filter: true, tableStyle: { backgroundColor : '#e3e4e5', fontColor : '#4286f4'}, headerStyle: { backgroundColor : '#c6c3c2', fontColor : '#ef6976'}}")

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
          remove: true
        },
        {
          edit: false,
          sort: false,
          remove: false
        },
        {
          edit: true,
          sort: true,
          remove: true
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

  .table-red {
    color: red;
    background: blue;
    border-radius: 2px
  }
  .header-red {
    color: red;
    background: blue
  }

}
</style>
