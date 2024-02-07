<template>

  <q-page class="m-auto">
    <q-card class="no-shadow">
      <q-card-section>
        <div class="q-gutter-sm row justify-between text-h6 items-end">
          Expenses
          <q-btn label="Add new expense" color="blue" no-caps unelevated icon="add"/>
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section>
        <table-component></table-component>
        <!-- <table-component v-if="paginatedData && !loading" :paginatedData="paginatedData" :fetchData="fetchData" />
        <table-skeleton :rows="rowsPerPage" v-else /> -->
      </q-card-section>
    </q-card>
  </q-page>

</template>


<script setup lang="ts">
import { ref } from 'vue';
import TableComponent from 'src/components/TableComponent.vue';
import { ExpensePaginatedResponse } from 'src/types';
import { getExpenses } from 'src/api/expense';
import { useQuasar } from 'quasar';

const paginatedData = ref<ExpensePaginatedResponse | null>(null);
const loading = ref<boolean>(false);
const rowsPerPage = ref<number>(10);

const $q = useQuasar();

const fetchData = async (page = 1, limit = 10) => {
  rowsPerPage.value = limit
  loading.value = true
  await getExpenses(page, limit)
    .then((res) => {
      paginatedData.value = res
      loading.value = false
      console.log(res);
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
