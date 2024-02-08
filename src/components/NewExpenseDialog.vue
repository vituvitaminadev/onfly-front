<template>

  <q-dialog v-model="dialogOpen" persistent>
    <q-card style="min-width: 350px">
      <q-form @submit="handleSubmit">
        <q-card-section>
          <div class="text-h6">Add new expense</div>
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="col-md-12 q-pt-none q-gutter-md">
            <q-input type="number" step="0.01" min="0" v-model="expenseValue" outlined autofocus label="Value" />
            <q-input type="text" v-model="expenseDescription" outlined autofocus label="Description" counter maxlength="191" />
            <q-date minimal v-model="expenseDate" autofocus mask="YYYY-MM-DD" today-btn :options="dateOptions" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat type="submit" label="Add expense" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { createExpense } from 'src/api/expense';
import { useQuasar } from 'quasar';

const emit = defineEmits(['expenseAdded'])

const $q = useQuasar();

const dialogOpen = ref(false);

const openModalDialog = () => {
  dialogOpen.value = true;
}

const expenseValue = ref('');
const expenseDescription = ref('');
const expenseDate = ref('');

const today = new Date().toISOString().split('T')[0].replaceAll('-', '/');
const dateOptions = (date: string) => {
  return date <= today
}

const handleSubmit = async () => {
  const finalValue = Math.round(parseFloat(expenseValue.value) * 100);

  const newExpense = {
    description: expenseDescription.value,
    date: expenseDate.value,
    value: finalValue
  }

  await createExpense(newExpense)
  .then(() => {
    $q.notify({
        color: 'positive',
        position: 'top',
        message: 'Expense added successfully',
        icon: 'info',
      });
    emit('expenseAdded');
  })
  .catch((err) => {
    $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Expense adding expense',
        icon: 'error',
      });
    console.log(err);
  });
}

defineExpose({openModalDialog});
</script>
