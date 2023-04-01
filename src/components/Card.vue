<script setup>
const props = defineProps(["quiz"]);
const emit = defineEmits(["onQuizClick"]);

const handleClick = () => {
  emit("onQuizClick", props.quiz.id);
};
</script>

<template>
  <div class="card">
    <div class="card-details">
      <h3>{{ quiz.quizName }}</h3>
      <p>Total Questions: {{ quiz.totalQuestions }}</p>
    </div>
    <button @click="handleClick">Start Quiz</button>
  </div>
</template>

<style scoped>
.card {
  padding: 1.25rem;
  border: 1px solid #fff;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
}
.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
