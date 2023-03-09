<script setup>
import { computed } from "vue";
const emit = defineEmits(["onChangeHandler", "update:modelValue"]);

const props = defineProps({
  optionText: String,
  name: Number,
  value: {
    requred: true,
  },
  modelValue: {
    required: true,
  },
});

const SetAnswer = (event) => {
  emit("onChangeHandler", event);
};

const selected = computed(() => {
  return props.modelValue !== null;
});
</script>

<template>
  <label class="option">
    <input
      type="radio"
      :value="value"
      :name="name"
      :disabled="selected"
      :checked="selected"
      @change="SetAnswer"
    />
    <span>{{ optionText }}</span>
  </label>
</template>

<style scoped>
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
</style>
