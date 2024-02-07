<template>

  <div class="q-pa-mid">
    <q-table
      title="Expenses"
      :rows="rows"
      row-key="name"
      flat
      bordered
      v-model:pagination="pagination"
      hide-pagination
      no-data-label="You haven't created a expense yet"
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>

</template>

<script lang="ts">
import { ref, computed } from 'vue'

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

export default {
  setup () {

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3
    })

    return {
      pagination,
      columns,
      rows,

      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
    }
  }
}

</script>
