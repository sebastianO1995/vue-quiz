<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import QuestionOption from "./components/QuestionOption.vue";

const store = useStore();

const quizName = computed(() => store.state.quizName);
const questions = ref([
  {
    question: "What is 2+2",
    answer: 2,
    options: ["2", "5", "4"],
    selected: null,
  },
  {
    question: "What is 5+5",
    answer: 0,
    options: ["10", "1", "-5"],
    selected: null,
  },
]);

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

<style>
h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}
.quiz {
  background-color: #382a4b;
  padding: 1rem;
  width: 100%;
  max-width: 640px;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
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
.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}
.option:hover {
  background-color: #2d213f;
}
.option.correct {
  background-color: #2cce7d;
}
.option.wrong {
  background-color: #ff5a5f;
}
.option:last-of-type {
  margin-bottom: 0;
}
.option.disabled {
  opacity: 0.5;
}
.option input {
  display: none;
}
button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}
button:disabled {
  opacity: 0.5;
}
h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
p {
  color: #8f8f8f;
  font-size: 1.5rem;
  text-align: center;
}
</style>
