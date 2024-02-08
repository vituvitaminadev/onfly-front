<template>

  <div class="q-pa-mid">
    <q-table
      @request="onTableRequest"
      :rows="$props.paginatedData.data"
      :columns="columns"
      row-key="name"
      flat
      bordered
      :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
      v-model:pagination="pagination"
      no-data-label="You haven't created a expense yet"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Value" :props="props">
            <q-badge color="primary" class="cursor-pointer" @click="props.row.__edit = true">
              {{ props.row.value }}
            </q-badge>
            <q-popup-edit v-model="props.row.value" @hide="handleEdit(props.row)">
              <q-input v-model="props.row.value" autofocus type="number" step="0.01" />
            </q-popup-edit>
          </q-td>
          <q-td key="Date" :props="props">
            <q-badge color="primary" class="cursor-pointer" @click="props.row.__edit = true">
              {{ props.row.date }}
            </q-badge>
            <q-popup-edit v-model="props.row.date" @hide="handleEdit(props.row)">
              <q-date v-model="props.row.date" autofocus mask="YYYY-MM-DD" today-btn :options="dateOptions" />
            </q-popup-edit>
          </q-td>
          <q-td key="Description" :props="props">
            <q-badge color="primary" class="cursor-pointer" @click="props.row.__edit = true">
              {{ props.row.description }}
            </q-badge>
            <q-popup-edit class="display-none" v-model="props.row.description" @hide="handleEdit(props.row)">
              <q-input v-model="props.row.description" autofocus counter maxlength="191" />
            </q-popup-edit>
          </q-td>
          <q-td key="Actions" :props="props">
            <q-btn @click="handleDelete(props.row.id)" size="sm" name="delete" icon='delete' />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>

</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { ExpensePaginatedResponse } from 'src/types';
import { QTableProps, useQuasar } from 'quasar';
import { Expense } from './models';
import { updateExpense, deleteExpense } from 'src/api/expense';

const $q = useQuasar();

const today = new Date().toISOString().split('T')[0].replaceAll('-', '/');
const dateOptions = (date: string) => {
  return date <= today
}

const props = defineProps({
  paginatedData: {
    type: Object as PropType<ExpensePaginatedResponse>,
    required: true,
  },
  fetchData: {
    type: Function as PropType<(page?: number, limit?: number) => Promise<void>>,
    required: true,
  }
});

const pagination = ref<QTableProps['pagination']>({
  page: props.paginatedData.meta.current_page,
  rowsPerPage: props.paginatedData.meta.per_page,
  rowsNumber: props.paginatedData.meta.total,
});

const columns = [
  { name: 'Value', label: 'Value', field: 'value' },
  { name: 'Date', label: 'Date', field: 'date' },
  { name: 'Description', label: 'Description', field: 'description' },
  { name: 'Actions', label: 'Actions', field: 'actions' },
];

const onTableRequest = (tableProps: QTableProps) => {
  if (tableProps.pagination) {
    pagination.value = tableProps.pagination
    props.fetchData(tableProps.pagination.page, tableProps.pagination.rowsPerPage)
  }
}

const handleDelete = async (expenseId: number) => {
  await deleteExpense(expenseId)
    .then(() => {
      props.fetchData(pagination.value?.page, pagination.value?.rowsPerPage)
      $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Expense deleted successfully',
        icon: 'info',
      });
    })
    .catch((error) => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error deleted expense:',
        icon: 'error',
      });
      console.log(error);
    });
};

const handleEdit = async (expense: Expense) => {
  expense.value = Math.round(expense.value * 100);
  await updateExpense(expense)
    .then(() => {
      props.fetchData(pagination.value?.page, pagination.value?.rowsPerPage)
      $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Expense edited successfully',
        icon: 'error',
      });
    })
    .catch((error) => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error editing expense:',
        icon: 'error',
      });
      console.log(error);
    });
};

</script>
