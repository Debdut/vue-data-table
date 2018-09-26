<template lang="pug">
  #app
    data-table(:data="data1" :options="{ edit: true , sort: true, removeRow: true, removeColumn: true, addRow: true, addCol: true}")

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
