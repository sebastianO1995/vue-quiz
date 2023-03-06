<script setup>
  import {ref, computed} from 'vue';

  const questions = ref([
    {
      question: 'What is 2+2',
      answer: 2,
      options: [
        '2','5','4'
      ],
      selected: null
    },
    {
      question: 'What is 5+5',
      answer: 0,
      options: [
        '10','1','-5'
      ],
      selected: null
    }
  ])

  const quizCompleted = ref(false);
  const currentQuestion = ref(0);

  const score = computed(()=> {
    let value = 0;
    questions.value.map(q=> {
      if(q.selected == q.answer){
        value++;
      }
    })

    return value;
  })

  const getCurrentQuestion = computed(()=> {
    let question = questions.value[currentQuestion.value];
    question.index = currentQuestion.value;
    return question
  })

  const SetAnswer = evt => {
    questions.value[currentQuestion.value].selected = evt.target.value;
    evt.target.value = null;
  }

  const NextQuestion = () => {
    if(currentQuestion.value < questions.value.length -1){
      currentQuestion.value++
    } else {
      quizCompleted.value =true;
    }
  }
</script>

<template>
  <main class="app">
    <h1>The Quiz</h1>
    <section class="quiz" v-if="!quizCompleted">
      <div class="quiz-info">
        <span class="question">{{ getCurrentQuestion.question }}</span>
        <span class="score">Score {{  score }} / {{ questions.length }}</span>
      </div>
      <div class="options">
        <label v-for="(option, index) in getCurrentQuestion.options" 
            :key="index" 
            :class="`option ${getCurrentQuestion.selected === index ? index== getCurrentQuestion.answer ? 'correct': 'wrong': ''}
            ${getCurrentQuestion.selected !== null && index !== getCurrentQuestion.selected ? 'disabled': ''}
            `">
          <input type="radio" :name="getCurrentQuestion.index" :value="index"  v-model="getCurrentQuestion.selected" :disabled="getCurrentQuestion.selected" @change="SetAnswer" />
          <span>{{ option }}</span>
        </label>
      </div>
      <button :disabled="!getCurrentQuestion.selected" @click="NextQuestion">
      {{ getCurrentQuestion.index === questions.length -1? "Finish": getCurrentQuestion.selected == null ? 'Select an option': 'Next Question'}}
      </button>
    </section>
    <section v-else>
      <h2>You have finished the quiz!</h2>
      <p>Your Score is {{  score }} / {{questions.length}}</p>
    </section>
  </main>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
body {
  background-color: #271c36;
  color: #fff;
}
</style>
