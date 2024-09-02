<script setup lang="ts">
import { ref, watch } from "vue";
import Dropdown from "@/components/ui/Dropdown.vue";

const currencies = ["RUB", "USD", "EUR"];
const fromCurrency = ref("RUB");
const toCurrency = ref("USD");
const fromAmount = ref(0);
const toAmount = ref(0);

const exchangeRates = {
  RUB: { USD: 0.01094, EUR: 0.00984 },
  USD: { RUB: 91.45, EUR: 0.91 },
  EUR: { RUB: 101.74, USD: 1.1 },
};

watch([fromAmount, fromCurrency, toCurrency], () => {
  const rate = exchangeRates[fromCurrency.value][toCurrency.value];
  toAmount.value = (fromAmount.value * rate).toFixed(2);
});
</script>

<template>
  <div
    class="min-h-screen justify-center bg-gray-100 flex flex-col items-center p-6"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Конвертация валют
      </h1>
      <form class="flex items-center justify-center flex-col space-y-6">
        <div class="flex items-center space-x-4 border-b pb-4 mb-4">
          <Dropdown
            :options="currencies"
            v-model="fromCurrency"
            class="flex-1"
          />

          <input
            type="number"
            v-model="fromAmount"
            placeholder="Введите сумму"
            class="flex-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div class="flex items-center space-x-4">
          <Dropdown :options="currencies" v-model="toCurrency" class="flex-1" />

          <input
            type="number"
            v-model="toAmount"
            placeholder="Сумма после конвертации"
            class="flex-1 p-2 border border-gray-300 rounded-lg"
            disabled
          />
        </div>
      </form>
    </div>
  </div>
</template>
