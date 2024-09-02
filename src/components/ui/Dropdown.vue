<script setup lang="ts">
import { Currency } from "@/shared/constants/currency.const";
import { ref, defineProps } from "vue";

const props = defineProps({
  options: Array as () => Currency[],
  modelValue: String,
});

const selected = ref(props.modelValue);

function selectCurrency(e: Event) {
  const target = e.target as HTMLSelectElement;
  selected.value = target.value;
}
</script>

<template>
  <select v-model="selected" @change="selectCurrency($event)">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
