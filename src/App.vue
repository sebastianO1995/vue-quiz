<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchQuizes");
});
</script>
<template>
  <main class="app">
    <h5 v-if="store.state.isLoading">...Loading</h5>
    <div v-else-if="store.state.hasQuizData">
      <h1>Welcome to Quiz Central</h1>
      <h2>Please select a quiz:</h2>
    </div>
    <div v-else>
      <div v-if="store.state.error.hasError">
        {{ store.state.error.message }}
      </div>
    </div>
  </main>
</template>
<style></style>
