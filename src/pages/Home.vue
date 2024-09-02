<script setup lang="ts">
import { fetchExchangeRates } from "@/shared/api";
import { ExchangeRates } from "@/shared/constants/currency.const";
import { useCurrencyStore } from "@/shared/store/currency.store";
import { computed, onMounted, ref } from "vue";

const currencyStore = useCurrencyStore();

const exchangeRates = ref<Partial<ExchangeRates>>({});

onMounted(async () => {
  const rates = await fetchExchangeRates();

  try {
    exchangeRates.value = rates;
  } catch (error) {
    console.error("Ошибка получения обменных курсов:", error);
  }
});

const displayRates = computed(() => {
  const base = currencyStore.currentCurrency.toLowerCase() as
    | "usd"
    | "eur"
    | "rub";

  return {
    toBaseCurrency: {
      usd: base === "usd" ? 1 : exchangeRates.value[`usd-${base}`],
      eur: base === "eur" ? 1 : exchangeRates.value[`eur-${base}`],
      rub: base === "rub" ? 1 : exchangeRates.value[`rub-${base}`],
    },
    fromBaseCurrency: {
      usd: base === "usd" ? 1 : exchangeRates.value[`${base}-usd`],
      eur: base === "eur" ? 1 : exchangeRates.value[`${base}-eur`],
      rub: base === "rub" ? 1 : exchangeRates.value[`${base}-rub`],
    },
  };
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
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

      <div class="flex flex-col gap-5">
        <div>
          <h2 class="text-xl font-semibold mb-2 text-center">Курсы покупки</h2>

          <ul class="space-y-4 flex flex-col justify-center items-center">
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'USD'">
              1 USD = {{ displayRates.toBaseCurrency.usd }}
              {{ currencyStore.currentCurrency }}
            </li>
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'EUR'">
              1 EUR = {{ displayRates.toBaseCurrency.eur }}
              {{ currencyStore.currentCurrency }}
            </li>
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'RUB'">
              1 RUB = {{ displayRates.fromBaseCurrency.rub }}
              {{ currencyStore.currentCurrency }}
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-2 text-center">Курсы продажи</h2>

          <ul class="space-y-4 flex flex-col justify-center items-center">
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'USD'">
              1 {{ currencyStore.currentCurrency }} =
              {{ displayRates.fromBaseCurrency.usd }} USD
            </li>
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'EUR'">
              1 {{ currencyStore.currentCurrency }} =
              {{ displayRates.fromBaseCurrency.eur }} EUR
            </li>
            <li class="text-lg" v-if="currencyStore.currentCurrency !== 'RUB'">
              1 {{ currencyStore.currentCurrency }} =
              {{ displayRates.fromBaseCurrency.rub }} RUB
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
