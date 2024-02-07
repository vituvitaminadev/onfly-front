<template>

  <q-page class="m-auto">
    <q-card class="no-shadow">
      <q-card-section>
        <div class="q-gutter-sm row justify-end">
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
import TableComponent from 'src/components/TableComponent.vue';

</script>
