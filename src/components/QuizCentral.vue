<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import QuestionOption from "./QuestionOption.vue";
const store = useStore();
const quizCompleted = ref(false);
const currentQuestion = ref(0);
const currentQuiz = computed(() => {
  return store.getters.getCurrentQuiz;
});

const questions = computed(() => ({
  ...currentQuiz.value.questions,
  selected: null,
}));

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});
</script>
<template>
  <article>
    <h1>{{ currentQuiz.quizName }}</h1>
    <section v-if="!quizCompleted" class="quiz">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score">Score / {{ currentQuiz.totalQuestions }} </span>
      </div>
      <div class="options">
        <QuestionOption
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          :optionText="option"
          :name="getCurrentQuestion.index"
          :value="index"
          v-model="getCurrentQuestion.selected"
        />
      </div>
    </section>
    <section v-else></section>
  </article>
</template>
<style scoped>
.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  gap: 1rem;
}
p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
}
.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}
.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}

.options {
  margin-bottom: 1rem;
}
</style>
