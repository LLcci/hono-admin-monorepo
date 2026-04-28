<script setup lang="ts">
const sessionState = useSession();
const session = computed(() => sessionState.value.data);
const isLoading = computed(() => sessionState.value.isPending);

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleSignIn() {
  error.value = '';
  loading.value = true;
  try {
    const result = await signIn.email({
      email: email.value,
      password: password.value
    });
    if (result?.error) {
      error.value = result.error.message || 'Sign-in failed';
    }
  } catch {
    error.value = 'Sign-in failed';
  } finally {
    loading.value = false;
  }
}

async function handleSignOut() {
  loading.value = true;
  try {
    await signOut();
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div id="auth-view">
    <h1>Auth</h1>

    <div v-if="isLoading">
      <p>Loading session...</p>
    </div>

    <div v-else-if="session">
      <p>Signed in as: {{ session.user?.email }}</p>
      <button type="button" :disabled="loading" @click="handleSignOut">Sign out</button>
    </div>

    <div v-else>
      <form @submit.prevent="handleSignIn">
        <div>
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit" :disabled="loading">Sign in</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
#auth-view {
  padding: 1rem;
  font-family: sans-serif;
}

form > div {
  margin-bottom: 0.5rem;
}

label {
  display: inline-block;
  width: 80px;
}

button {
  margin-top: 0.5rem;
}

.error {
  color: red;
}
</style>

