<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const quizIdParam = computed(() => route.params.id);

  const quiz = computed(() => {
    return store.getters.getQuiz(quizIdParam.value);
  });

  if (!store.getters.hasQuizData || !quiz.value) {
    router.push({ path: '/' });
  }
</script>
<template>
  <div v-if="store.state.isLoading">Loading quiz....</div>
  <div class="quiz-page" v-else>Quiz page {{ quiz }}</div>
</template>
<style scoped></style>
