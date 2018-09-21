# Data Table

## Data

### Array Form

```html
<data-table :data="{ header, body }">
```

```js
header = ['name', 'age', 'job']
body = [
  ['debdut', 21, 'NA'],
  ['saikat', 20, 'NA'],
]
```
```ts
header: Array<String>
header: Array<Array>
data: { Array<String>, Array<String> }
```

| name   | age | job |
|--------|-----|-----|
| debdut | 21  | NA  |
| saikat | 20  | NA  |


### Object Form

```html
<data-table :data="data" :options="{ form: 'object' }">
```
```js
data = [
  {name: 'debdut', age: 21, job: 'NA'}
  {name: 'saikat', age: 20, job: 'NA'}
]
```


```ts
data: Array<Object>
```


| name   | age | job |
|--------|-----|-----|
| debdut | 21  | NA  |
| saikat | 20  | NA  |

## Options

```ts
options: {
  form: String
  edit: Boolean
  
  sort: Boolean
  compare: <T>(a : T, b : T) => T

  removeRow: Boolean
  removeColumn: Boolean
  addRow: Boolean
  addColumn: Boolean

  filter: Boolean
  filterStrategy: <T>(search: String, a : T, list: <T>) => Boolean

  tableStyle: String | Object
  tableClass: String
  headerStyle: String | Object
  headerClass: String

  column: Array<{
    edit: Boolean
  
    sort: Boolean
    compare: <T>(a: T, b: T) => T

    remove: Boolean
    textSize: Number
    type: String

    filter: Boolean
    filterStrategy: <T>(search: String, a : T, list: <T>) => Boolean

    colStyle: String | Object
    colClass: String
  }>

  row: Array<{
    edit: Boolean
    remove: Boolean

    rowStyle: String | Object
    rowClass: String
  }>

  cell: Array<Array<{
    edit: Boolean

    cellStyle: String | Object
    cellClass: String
  }>>
}
```

### Table Options

| Option         | Type                | Default | Choices           | Description                                                                                                                                                                                                                                                           |
|----------------|---------------------|---------|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| form           | String              | 'array' | 'array'  'object' | Type of **data** prop passed in                                                                                                                                                                                                                                       |
| edit           | Boolean             | false   | false  true       | If True, the table cells are editable, on click turns the cell into a input with present value                                                                                                                                                                        |
| sort           | Boolean             | false   | false  true       | If True,all the table columns are sortable according to their values                                                                                                                                                                                                  |
| compare        | function            |         |                   | The columns are sortable according to their values using the provided compare algorithm                                                                                                                                                                               |
| removeRow      | Boolean             | false   | false   true      | If True,all rows are romovable.Specific rows can be removed,and will not be shown anymore                                                                                                                                                                                                    |
| removeColumn   | Boolean             | false   | false  true       | If True,,all columns are removable.Specific columns can be removed,and will not be shown anymore                                                                                                                                                                                                 |
| addRow         | Boolean             | false   | false  true       | If True,rows can be added,and will be shown along with the previous rows                                                                                                                                                                                              |
| addColumn      | Boolean             | false   | false  true       | If True,columns can be added,and will be shown along with the previous columns                                                                                                                                                                                        |
| filter         | Boolean             | false   | false  true       | If true, a row will be added in the top with input feilds of the same numbers as of the number of  cells in header.Each input feilds will take a value and will match it with all the values in the  column and will finally show the values or value that matches it |
| filterStrategy | function            |         |                   | Each input feilds will take a value and will be matched with the values in the column using the  specific strategy and will finally show the values or value that matches it                                                                                          |
| tableStyle     | String  Object(JSS) |         |                   | The passed css will be binded to the whole table itself                                                                                                                                                                                                               |
| tableClass     | String              |         |                   | The passed class will get binded to the whole table itself                                                                                                                                                                                                            |
| headerStyle    | String  Object(JSS) |         |                   | The passed css will be binded to the whole header itself                                                                                                                                                                                                              |
| headerClass    | String              |         |                   | The passed class will get binded to the whole header itself                                               z                                                                                                                                                            |



### Row Options

| Option   | Type               | Default | Choices     | Description                                                                                                          |
|----------|--------------------|---------|-------------|----------------------------------------------------------------------------------------------------------------------|
| edit     | Boolean            | inherit | false  true | If True, the table cells in the specific rows are editable, on click turns  the cell into a input with present value |
| remove   | Boolean            | false   | false  true | If True,the row can be removed,and will not be shown anymore                                                         |
| rowStyle | String Object(JSS) |         |             | The passed css will be binded to the whole row itself                                                                |
| rowClass | String             |         |             | The passed class will be binded to the whole row itself                                                              |

### Column Options

| Option         | Type               | Default  | Choices           | Description                                                                                                                                                                                                                   |
|----------------|--------------------|----------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| edit           | Boolean            | inherit  | false  true       | If True, the table cells in the specific columns are editable, on click turns  the cell into a input with present value                                                                                                       |
| sort           | Boolean            | false    | false  true       | If True,the specific columns are sortable according to their values                                                                                                                                                           |
| compare        | function           |          |                   | The specific columns are sortable according to their values using the provided  compare algorithm                                                                                                                             |
| remove         | Boolean            | false    | false  true       | If True,the column can be removed,and will not be shown anymore                                                                                                                                                               |
| textSize       | Number             | Infinity |                   | This specifies the maximum text size allowed in every cells of the column                                                                                                                                                     |
| type           | String             | 'string' | 'string' 'number' | This specifies the data type of the values in every cell of the column                                                                                                                                                        |
| filter         | Boolean            | false    | false  true       | If true, a cell will be added in the top of the column with an input feild. The input feilds will take a value and will match it with all the values  in the column and will finally show the values or value that matches it |
| filterStrategy | function           |          |                   | The input feild will take a value and will be matched with the values  in the column using the specific strategy and will finally show the  values or value that matches it                                                   |
| colStyle       | String Object(JSS) |          |                   | The passed css will be binded to the whole column itself                                                                                                                                                                      |
| colClass       | String             |          |                   | The passed class will be binded to the whole column itself                                                                                                                                                                    |

### Cell Options

| Option    | Type               | Default | Choices     | Description                                                                                        |
|-----------|--------------------|---------|-------------|----------------------------------------------------------------------------------------------------|
| edit      | Boolean            | inherit | false  true | If True, the particular cell is editable, on click turns the  cell into a input with present value |
| cellStyle | String Object(JSS) |         |             | The passed css will be binded to the particular cell itself                                        |
| cellClass | String             |         |             | The passed class will be binded to the particular cell itself                                      |

## Events

| Event | Triggered Event | Generating Position                                            | Description                                                                                                                                                                                                                                                                                               |
|-------|-----------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| click |                 | cell                                                           | On click the cell turns into a input with present value and focus                                                                                                                                                                                                                                         |
| click |                 | sort icons beside header  cell                                 | The table's rows get sorted according to the values of  the respective column                                                                                                                                                                                                                             |
| wheel |                 | scroll on any position on  the body of the table except header | On scrolling upwards, the rows on the present table will  shift downward and new datas will appear coming from  the top untill the first row appear. On scrolling downwards, the rows on the present table will  shift upward and new datas will appear coming from  the down untill the last row appear. |
| hover |                 | cell                                                           | A floating box will appear at the top and side of the  respective column and row with the icons of delete,add  before and add after                                                                                                                                                                       |
| click |                 | delete icon beside header cell                                 | The specific column will get deleated from the present table                                                                                                                                                                                                                                              |
| click |                 | delete icon at the end of each row                             | The specific row will get deleated from the present table                                                                                                                                                                                                                                                 |
| click |                 | add icons beside header cell                                   | A column will get added before or after the present column                                                                                                                                                                                                                                                |
| click |                 | add icons at the end of each row                               | A row will get added before or after the present row                                                                                                                                                                                                                                                      |