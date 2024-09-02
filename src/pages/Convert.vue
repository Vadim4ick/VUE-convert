<script setup lang="ts">
import { ref, watch } from "vue";
import Dropdown from "@/components/ui/Dropdown.vue";
import { useCurrencyStore } from "@/shared/store/currency.store";
import { convertCurrency } from "@/shared/lib/utils";
import { Currency } from "@/shared/constants/currency.const";

const currencyStore = useCurrencyStore();

const fromCurrency = ref<Currency>(currencyStore.currentCurrency);
const toCurrency = ref<Currency>("USD");

const fromAmount = ref(0);
const toAmount = ref(0);

// Функция для обработки изменений валют
const onCurrencyChange = (type: "from" | "to") => (e: Event) => {
  const value = (e.target as HTMLSelectElement).value as Currency;

  if (type === "from") {
    fromCurrency.value = value;
  } else {
    toCurrency.value = value;
  }
};

watch(
  [fromCurrency, toCurrency, fromAmount, currencyStore.exchangeRates],
  () => {
    const rate = convertCurrency(
      fromAmount.value,
      fromCurrency.value,
      toCurrency.value,
      currencyStore.exchangeRates
    );

    toAmount.value = rate;
  }
);

watch(
  () => currencyStore.currentCurrency,
  (newCurrency) => {
    fromCurrency.value = newCurrency;
  }
);
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
            :options="currencyStore.currency"
            v-model="fromCurrency"
            class="flex-1"
            :onChange="onCurrencyChange('from')"
          />

          <input
            type="number"
            v-model="fromAmount"
            placeholder="Введите сумму"
            class="flex-1 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div class="flex items-center space-x-4">
          <Dropdown
            :options="currencyStore.currency"
            v-model="toCurrency"
            class="flex-1"
            :onChange="onCurrencyChange('to')"
          />

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
