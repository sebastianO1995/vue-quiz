<script setup>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Card from '../components/Card.vue';
import QuizCentral from '../components/QuizCentral.vue';
const store = useStore();
const router = useRouter();
const searchInput = ref('');
onMounted(() => {
  store.dispatch('fetchQuizes');
});

const quizList = computed(() => {
  return store.state.quizes.filter((quiz) =>
    quiz.quizName.toLowerCase().includes(searchInput.value.toLowerCase())
  );
});

const startQuiz = (id) => {
  // store.dispatch('selectQuiz', id);

  router.push(`/quiz/${id}`);
};
</script>
<template>
  <article v-if="store.state.selectedQuizId === null">
    <h5 v-if="store.state.isLoading">...Loading</h5>
    <section v-else-if="store.getters.hasQuizData">
      <h1>Welcome to Quiz Central</h1>
      <input placeholder="Search..." v-model.trim="searchInput" type="text" />

      <div class="quizes-container">
        <Card
          v-for="(quiz, index) in quizList"
          :key="index"
          :quiz="quiz"
          @onQuizClick="startQuiz"
        />
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
</style>
