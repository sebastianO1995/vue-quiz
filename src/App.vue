<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchQuizes");
});

const quizList = computed(() => store.getters.getQuizes);

const startQuiz = (id) => {
  store.dispatch("selectQuiz", id);
};
</script>
<template>
  <main class="app">
    <article v-if="store.state.selectedQuizId === null">
      <h5 v-if="store.state.isLoading">...Loading</h5>
      <section v-else-if="store.getters.hasQuizData">
        <h1>Welcome to Quiz Central</h1>
        <h2>Please select a quiz:</h2>
        <div class="quizes-container">
          <div v-for="(quiz, index) in quizList" class="quiz-box" :key="index">
            <h4>{{ quiz.quizName }}</h4>
            <p>Total Questions: {{ quiz.totalQuestions }}</p>
            <button @click="startQuiz(quiz.id)">Start Quiz</button>
          </div>
        </div>
      </section>
      <section v-else-if="store.getters.failedLoadingData">
        <div v-if="store.state.error.hasError">
          Error: {{ store.state.error.message }}
        </div>
        <div v-else>No Quizes available</div>
      </section>
    </article>
    <article v-else></article>
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
