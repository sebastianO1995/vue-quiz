<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchQuizes");
});

const quizList = computed(() => store.getters.getQuizes);
</script>
<template>
  <main class="app">
    <h5 v-if="store.state.isLoading">...Loading</h5>
    <div v-else-if="store.getters.hasQuizData">
      <h1>Welcome to Quiz Central</h1>
      <h2>Please select a quiz:</h2>
      <section class="quizes-container">
        <div v-for="(quiz, index) in quizList" class="quiz-box" :key="index">
          <h4>{{ quiz.quizName }}</h4>
          <p>Total Questions: {{ quiz.totalQuestions }}</p>
          <button>Start Quiz</button>
        </div>
      </section>
    </div>
    <div v-else-if="store.getters.failedLoadingData">
      <div v-if="store.state.error.hasError">
        Error: {{ store.state.error.message }}
      </div>
      <div v-else>No Quizes available</div>
    </div>
  </main>
</template>
<style scoped>
.quizes-container {
  margin-top: 1rem;
}

.quiz-box {
  padding: 0.75rem;
  border: 1px solid #fff;
}
</style>
