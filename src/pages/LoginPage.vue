<template>
  <q-page class="flex flex-center">
    <q-card v-bind:style="$q.screen.lt.sm ? { 'width': '80%' } : { 'width': '30%' }">
      <q-card-section>
        <q-avatar size="103px" class="absolute-center shadow-10 bg-grey">
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-pt-lg">
          <div class="col text-h6 ellipsis">
            Log in
          </div>
        </div>
      </q-card-section>
      <q-card-section align="center" @submit=handleSubmit>
        <q-form class="q-gutter-md">
          <q-input type="email" filled v-model="email" label="Email" lazy-rules required />

          <q-input type="password" filled v-model="password" label="Password" lazy-rules required />

          <q-btn label="Login" type="submit" color="primary" size="md" />
        </q-form>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Need an account? Register Now!" to="/guest/register" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from 'src/api/auth';
import { useQuasar } from 'quasar';

const email = ref('');
const password = ref('');

const router = useRouter();
const $q = useQuasar();

const handleSubmit = () => {
  login({ email: email.value, password: password.value }).then(() => {
    $q.notify({
      color: 'positive',
      position: 'top',
      message: 'Logged in successfully',
      icon: 'info',
    });
    setTimeout(() => {
      router.push({ name: 'home' });
    }, 500);
  }).catch((err) => {
    $q.notify({
      color: 'negative',
      position: 'top',
      message: 'Invalid credentials',
      icon: 'error',
    });
    console.log(err);
  });
};
</script>
