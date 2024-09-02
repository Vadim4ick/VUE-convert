<script setup lang="ts">
import CoursesForm from "@/components/CoursesForm.vue";
import { useCurrencyStore } from "@/shared/store/currency.store";

const currencyStore = useCurrencyStore();
</script>

<template>
  <section
    class="flex min-h-[calc(100vh_-_var(--header-height))] items-center justify-center p-6"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
      <div class="mb-6 flex flex-col gap-2">
        <h1 class="text-3xl text-center font-extrabold text-gray-800">
          Курсы валют
        </h1>

        <p class="text-center">
          (Базовая валюта: <b>{{ currencyStore.currentCurrency }}</b
          >)
        </p>
      </div>

      <CoursesForm />
    </div>
  </section>
</template>
