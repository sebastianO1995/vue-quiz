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

<style scoped></style>
