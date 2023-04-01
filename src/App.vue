<script setup>
  import { onMounted } from 'vue';
  import { RouterView } from 'vue-router';
  import { useStore } from 'vuex';
  const store = useStore();
  onMounted(() => {
    store.dispatch('fetchQuizes');
  });
</script>
<template>
  <main class="quiz-app">
    <RouterView />
  </main>
</template>
<style scoped></style>
