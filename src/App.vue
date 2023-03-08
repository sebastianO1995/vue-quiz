<script setup>
import { useStore } from "vuex";
const store = useStore();
const { hasQuizData } = store.getters;
const { isLoading, error } = store.state;
</script>
<template>
  <main class="app">
    <h5 v-if="isLoading">...Loading</h5>
    <div v-else-if="hasQuizData">
      <h1>Welcome to Quiz Central</h1>
      <h2>Please select a quiz:</h2>
    </div>
  </main>
</template>
<style></style>
