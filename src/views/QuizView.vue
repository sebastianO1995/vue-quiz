<script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import QuizHeader from '../components/Quiz/QuizHeader.vue';
  import QuestionOption from '../components/QuestionOption.vue';
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  const quizCompleted = ref(false);
  const currentQuestionIndex = ref(0);
  const currentQuestionAnswer = ref(null);
  const score = ref(0);

  const quizIdParam = computed(() => route.params.id);

  const quiz = computed(() => {
    return store.getters.getQuiz(quizIdParam.value);
  });

  const questions = computed(() => ({ ...quiz.value.questions }));

  const currentQuestion = computed(() => {
    const question = questions.value[currentQuestionIndex.value];
    question.index = currentQuestionIndex.value;
    return question;
  });

  const outputScore = computed(
    () => `${score.value}/${quiz.value.questions.length}`
  );

  const SetAnswer = (evt) => {
    currentQuestionAnswer.value = evt.target.value;

    if (evt.target.value === currentQuestion.value.answer) {
      score.value++;
    }
    evt.target.value = null;
  };
  const SetOptionClass = (option) => {
    const questionToSee = currentQuestion.value;

    const validClass =
      currentQuestionAnswer.value === option
        ? option === questionToSee.answer
          ? 'correct'
          : 'wrong'
        : '';

    const disabledClass =
      currentQuestionAnswer.value !== null && option !== questionToSee.answer
        ? 'disabled'
        : '';
    return `${validClass} ${disabledClass}`;
  };
  const optionClass = computed(() => {
    return (index) => {
      return SetOptionClass(index);
    };
  });

  const buttonText = computed(() => {
    return currentQuestion.value.index === quiz.value.totalQuestions - 1
      ? 'Finish'
      : currentQuestionAnswer === null
      ? 'Select an option'
      : 'Next Question';
  });

  const NextQuestion = () => {
    if (currentQuestionIndex.value < quiz.value.totalQuestions - 1) {
      currentQuestionIndex.value++;
      currentQuestionAnswer.value = null;
    } else {
      quizCompleted.value = true;
    }
  };

  const restartQuiz = () => {
    quizCompleted.value = false;
    currentQuestionIndex.value = 0;
    currentQuestionAnswer.value = null;
    score.value = 0;
  };

  const goHome = () => {
    router.push('/');
  };
</script>
<template>
  <article>
    <div v-if="store.state.isLoading">Loading quiz....</div>
    <div class="quiz-page" v-else>
      <QuizHeader
        :quizName="quiz.quizName"
        :showBtn="!quizCompleted"
        @btnClick="goHome"
      />
      <section class="quiz-body" v-if="!quizCompleted">
        <div class="question-header">
          <span class="question">{{ currentQuestion.question }}</span>
          <span class="score"
            >Score
            <span>{{ outputScore }}</span>
          </span>
        </div>
        <div class="question-options" v-if="!quizCompleted">
          <QuestionOption
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :optionText="option"
            :name="currentQuestion.index"
            :value="option"
            v-model="currentQuestionAnswer"
            @onChangeHandler="SetAnswer"
            :class="optionClass(option)"
          />
        </div>
        <button
          :disabled="currentQuestionAnswer === null"
          @click="NextQuestion"
        >
          {{ buttonText }}
        </button>
      </section>
      <section v-else class="quiz-completed">
        <h2>You have finished the quiz!</h2>
        <p>Your Score is {{ outputScore }}</p>
        <div class="quiz-end-btns">
          <button @click="restartQuiz">Restart Quiz</button>
          <button @click="goHome">Select a new Quiz</button>
        </div>
      </section>
    </div>
  </article>
</template>
<style scoped>
  .quiz-body {
    background-color: #382a4b;
    padding: 1rem;
    width: 100%;

    gap: 1rem;
  }
  .question-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
    gap: 1.25rem;
  }
  .question-header .question {
    color: #8f8f8f;
    font-size: 1rem;
  }
  .question-header .score {
    color: #fff;
    font-size: 1rem;
  }
  .score span {
    display: block;
  }

  .question-options {
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

  .quiz-completed {
    margin-top: 1.25rem;
  }

  p {
    color: #8f8f8f;
    font-size: 1.5rem;
    text-align: center;
  }
</style>
