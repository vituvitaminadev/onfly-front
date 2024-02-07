<template>

  <div class="q-pa-mid">
    <q-table
      :rows="rows"
      row-key="name"
      flat
      bordered
      :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
      v-model:pagination="pagination"
      no-data-label="You haven't created a expense yet"
    />
  </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const columns = [
  {name: 'id', align: 'left', required: true, label: '#', field: 'id', sortable: true},
  {name: 'description', align: 'left', required: true, label: 'Description', field: 'description',},
  {name: 'date', align: 'left', required: true, label: 'Date', field: 'date', sortable: true},
  {name: 'value', align: 'left', required: true, label: 'Value', field: 'value', sortable: true},
];

const rows = [
  {
    id: 1,
    description: 'Expense 1',
    date: '2024-02-06',
    value: 150.00
  },
  {
    id: 2,
    description: 'Expense 1',
    date: '2024-02-06',
    value: 150.00
  },
  {
    id: 3,
    description: 'Expense 1',
    date: '2024-02-06',
    value: 150.00
  },
  {
    id: 4,
    description: 'Expense 1',
    date: '2024-02-06',
    value: 150.00
  },
];

</script>
