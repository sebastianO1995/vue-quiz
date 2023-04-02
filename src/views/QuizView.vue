<script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import QuizCentral from '../components/QuizCentral.vue';
  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const quizIdParam = computed(() => route.params.id);

  const quiz = computed(() => {
    return store.getters.getQuiz(quizIdParam.value);
  });
</script>
<template>
  <article>
    <div v-if="store.state.isLoading">Loading quiz....</div>
    <div class="quiz-page" v-else>
      <QuizCentral :quiz="quiz" />
    </div>
  </article>
</template>
<style scoped></style>
