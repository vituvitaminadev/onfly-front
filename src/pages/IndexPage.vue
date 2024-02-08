<template>

  <q-page class="m-auto">
    <q-card class="no-shadow">
      <q-card-section>
        <div class="q-gutter-sm row justify-between text-h6 items-end">
          Expenses
          <q-btn label="Add new expense" color="blue" no-caps unelevated icon="add" @click="openChildDialog"/>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <table-component  v-if="paginatedData && !loading" :paginatedData="paginatedData" :fetchData="fetchData"/>
      </q-card-section>
    </q-card>

    <new-expense-dialog ref="openDialogRef" @expenseAdded="fetchData" />
  </q-page>

</template>


<script setup lang="ts">
import { ref } from 'vue';
import NewExpenseDialog from 'src/components/NewExpenseDialog.vue';
import TableComponent from 'src/components/TableComponent.vue';
import { ExpensePaginatedResponse, OpenDialogMethods } from 'src/types';
import { getExpenses } from 'src/api/expense';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const openDialogRef = ref<OpenDialogMethods | null>(null);

function openChildDialog() {
  (openDialogRef.value as OpenDialogMethods)?.openModalDialog();
}

const paginatedData = ref<ExpensePaginatedResponse | null>(null);
const loading = ref<boolean>(false);
const rowsPerPage = ref<number>(10);

const fetchData = async (page = 1, limit = 10) => {
  rowsPerPage.value = limit
  loading.value = true
  await getExpenses(page, limit)
    .then((res) => {
      paginatedData.value = res
      loading.value = false
    })
    .catch((err) => {
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Error fetching expenses',
        icon: 'error',
      });
      console.log(err);
    });
}

fetchData();
</script>
