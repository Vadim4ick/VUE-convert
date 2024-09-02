<script setup lang="ts">
import { useCurrencyStore } from "@/shared/store/currency.store";
import { computed } from "vue";

const currencyStore = useCurrencyStore();

const displayRates = computed(() => {
  const base = currencyStore.currentCurrency.toLowerCase() as
    | "usd"
    | "eur"
    | "rub";

  const exchangeRates = currencyStore.exchangeRates;

  return {
    toBaseCurrency: {
      usd: base === "usd" ? 1 : exchangeRates[`usd-${base}`],
      eur: base === "eur" ? 1 : exchangeRates[`eur-${base}`],
      rub: base === "rub" ? 1 : exchangeRates[`rub-${base}`],
    },
    fromBaseCurrency: {
      usd: base === "usd" ? 1 : exchangeRates[`${base}-usd`],
      eur: base === "eur" ? 1 : exchangeRates[`${base}-eur`],
      rub: base === "rub" ? 1 : exchangeRates[`${base}-rub`],
    },
  };
});
</script>

<template>
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
</template>
