<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import QuizCentral from "./components/QuizCentral.vue";
const store = useStore();
onMounted(() => {
  store.dispatch("fetchQuizes");
});

const quizList = computed(() => store.state.quizes);

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
            <div class="quiz-details">
              <h3>{{ quiz.quizName }}</h3>
              <p>Total Questions: {{ quiz.totalQuestions }}</p>
            </div>
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

    <QuizCentral v-else />
  </main>
</template>

<style scoped>
article {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
}
.quizes-container {
  margin-top: 1rem;
}

.quiz-box {
  padding: 1.25rem;
  border: 1px solid #fff;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
.quiz-box .quiz-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
