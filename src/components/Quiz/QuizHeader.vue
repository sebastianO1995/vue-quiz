<template>
  <div class="quiz-header">
    <h1>{{ props.quizName }}</h1>
    <div class="btn-wrapper" v-show="showBtn">
      <button class="quit-btn" @click="handleQuit">Quit Quiz</button>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['quizName', 'showBtn']);
  const emit = defineEmits(['btnClick']);

  const handleQuit = () => {
    emit('btnClick');
  };
</script>
<style scoped>
  .btn-wrapper {
    width: 100%;
    display: flex;
    justify-content: end;
    margin-top: 1rem;
  }
  .quit-btn {
    background: #8a8a55;
    color: black;
    margin-bottom: 1.25rem;
    text-align: right;
  }
</style>
