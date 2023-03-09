<script setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import QuestionOption from "./QuestionOption.vue";
const store = useStore();
const quizCompleted = ref(false);
const currentQuestion = ref(0);
const currentQuestionAnswer = ref(null);
const score = ref(0);
const currentQuiz = computed(() => {
  return store.getters.getCurrentQuiz;
});

const questions = computed(() => ({
  ...currentQuiz.value.questions,
}));

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const SetAnswer = (evt) => {
  currentQuestionAnswer.value = evt.target.value;

  if (evt.target.value === getCurrentQuestion.value.answer) {
    score.value++;
  }
  evt.target.value = null;
};
const buttonText = computed(() => {
  return getCurrentQuestion.value.index === currentQuiz.value.totalQuestions - 1
    ? "Finish"
    : currentQuestionAnswer === null
    ? "Select an option"
    : "Next Question";
});

const NextQuestion = () => {
  if (currentQuestion.value < currentQuiz.value.totalQuestions - 1) {
    currentQuestion.value++;
    currentQuestionAnswer.value = null;
  } else {
    quizCompleted.value = true;
  }
};

const SetOptionClass = (option) => {
  const questionToSee = getCurrentQuestion.value;

  const validClass =
    currentQuestionAnswer.value === option
      ? option === questionToSee.answer
        ? "correct"
        : "wrong"
      : "";

  const disabledClass =
    currentQuestionAnswer.value !== null && option !== questionToSee.answer
      ? "disabled"
      : "";
  return `${validClass} ${disabledClass}`;
};
const optionClass = computed(() => {
  return (index) => {
    return SetOptionClass(index);
  };
});

const restartQuiz = () => {
  quizCompleted.value = false;
  currentQuestion.value = 0;
  currentQuestionAnswer.value = null;
  score.value = 0;
};

const goHome = () => {
  restartQuiz();
  store.dispatch("selectQuiz", null);
};
</script>
<template>
  <article>
    <h1>{{ currentQuiz.quizName }}</h1>
    <section v-if="!quizCompleted" class="quiz">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score"
          >Score: {{ score }} / {{ currentQuiz.totalQuestions }}
        </span>
      </div>
      <div class="options">
        <QuestionOption
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          :optionText="option"
          :name="getCurrentQuestion.index"
          :value="option"
          v-model="currentQuestionAnswer"
          @onChangeHandler="SetAnswer"
          :class="optionClass(option)"
        />
      </div>
      <button :disabled="currentQuestionAnswer === null" @click="NextQuestion">
        {{ buttonText }}
      </button>
    </section>
    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your Score is {{ score }} / {{ currentQuiz.totalQuestions }}</p>
      <div class="quiz-end-btns">
        <button @click="restartQuiz">Restart Quiz</button>
        <button @click="goHome">Select a new Quiz</button>
      </div>
    </section>
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

button {
  margin-top: 1rem;
}

.quiz-end-btns {
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  gap: 0.5rem;
}
</style>
