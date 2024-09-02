<script setup lang="ts">
import { Currency } from "@/shared/constants/currency.const";
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  options: Array as () => Currency[],
  modelValue: String,
  onChange: {
    type: Function,
    required: true,
  },
});

const selected = ref(props.modelValue);

watch(props, () => {
  selected.value = props.modelValue;
});
</script>

<template>
  <select v-model="selected" @change="onChange($event)">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
