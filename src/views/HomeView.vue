<script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import Card from '../components/Card.vue';

  const store = useStore();
  const router = useRouter();
  const searchInput = ref('');

  const quizList = computed(() => {
    return store.state.quizes.filter((quiz) =>
      quiz.quizName.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  });

  const startQuiz = (id) => {
    router.push(`/quiz/${id}`);
  };

  onMounted(() => {
    store.dispatch('fetchQuizes');
  });
</script>
<template>
  <article>
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
</template>

<style scoped>
  .quizes-container {
    margin-top: 1rem;
  }
</style>
