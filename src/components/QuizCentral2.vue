<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import QuestionOption from "./QuestionOption.vue";

const store = useStore();

const quizCompleted = ref(false);
const currentQuestion = ref(0);

const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected == q.answer) {
      value++;
    }
  });

  return value;
});

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  question.index = currentQuestion.value;
  return question;
});

const SetAnswer = (evt) => {
  questions.value[currentQuestion.value].selected = evt.target.value;
  evt.target.value = null;
};

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
  } else {
    quizCompleted.value = true;
  }
};

const SetOptionClass = (index) => {
  const questionToSee = getCurrentQuestion.value;
  const validClass =
    questionToSee.selected == index
      ? index == questionToSee.answer
        ? "correct"
        : "wrong"
      : "";
  const disabledClass =
    questionToSee.selected != null && index != questionToSee.selected
      ? "disabled"
      : "";
  return `${validClass} ${disabledClass}`;
};

const optionClass = computed(() => {
  return (index) => {
    return SetOptionClass(index);
  };
});

const buttonText = computed(() => {
  return getCurrentQuestion.value.index === questions.length - 1
    ? "Finish"
    : getCurrentQuestion.value.selected == null
    ? "Select an option"
    : "Next Question";
});

const restartQuiz = () => {
  quizCompleted.value = false;
  currentQuestion.value = 0;
  questions.value.forEach((q) => (q.selected = null));
};

const goHome = () => {
  console.log("go Home");
};
</script>

<template>
  <main class="app">
    <h1>{{ quizName }}</h1>
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score">Score {{ score }} / {{ questions.length }}</span>
      </div>
      <div class="options">
        <QuestionOption
          v-for="(option, index) in getCurrentQuestion.options"
          :key="index"
          :optionText="option"
          :name="getCurrentQuestion.index"
          :class="optionClass(index)"
          :value="index"
          v-model="getCurrentQuestion.selected"
          @onChangeHandler="SetAnswer"
        />
      </div>
      <button :disabled="!getCurrentQuestion.selected" @click="NextQuestion">
        {{ buttonText }}
      </button>
    </section>
    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your Score is {{ score }} / {{ questions.length }}</p>
      <button @click="restartQuiz">Restart Quiz</button>
      <button @click="goHome">Select a new Quiz</button>
    </section>
  </main>
</template>

<style scoped></style>
