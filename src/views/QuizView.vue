<script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import QuizCentral from '../components/QuizCentral.vue';
  import { createClient } from 'contentful';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const client = createClient({
    space: store.state.contentfulSettings.space,
    accessToken: store.state.contentfulSettings.token
  });

  const isLoading = ref(false);
  const quiz = ref(null);
  const quizIdParam = computed(() => route.params.id);

  onMounted(() => {
    if (quizIdParam) {
      isLoading.value = true;
      client
        .getEntry(quizIdParam.value)
        .then((entry) => {
          isLoading.value = false;
          quiz.value = {
            questions: entry.fields.questions.map((question) => ({
              ...question.fields,
              id: question.sys.id
            })),
            quizName: entry.fields.quizName,
            totalQuestions: entry.fields.questions.length,
            id: quizIdParam
          };
        })
        .catch((error) => {
          console.log(error);
          router.push('/');
        });
    } else {
      router.push('/');
    }
  });
</script>
<template>
  <article>
    <div v-if="isLoading">Loading quiz....</div>
    <div class="quiz-page" v-if="!isLoading && quiz !== null">
      <QuizCentral :quiz="quiz" />
    </div>
  </article>
</template>
<style scoped></style>
