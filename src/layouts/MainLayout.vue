<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn @click="handleLogout" label="Logout" color="secondary" class="q-mr-md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { logout } from 'src/api/auth';
import { useRouter } from 'vue-router';
import { useQuasar, QSpinnerGears } from 'quasar';

const router = useRouter();
const $q = useQuasar();

const handleLogout = () => {
  logout().then(() => {
    localStorage.removeItem('userToken');
    $q.notify({
      spinner: QSpinnerGears,
      position: 'top',
      message: 'Logging out',
      icon: 'info',
      timeout: 500
    });
    setTimeout(() => {
      router.push({ name: 'login' });
    }, 1500);
  })
  .catch((err) => {
    console.log(err.message);
  });
};

</script>
