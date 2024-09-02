<script setup lang="ts">
import { fetchExchangeRates } from "@/shared/api";
import { onMounted, ref } from "vue";

const baseCurrency = ref("RUB");

const exchangeRates = ref({
  usdRub: 0,
  eurRub: 0,
  rubEur: 0,
  rubUsd: 0,
});

onMounted(async () => {
  const rates = await fetchExchangeRates();

  try {
    exchangeRates.value = {
      usdRub: rates["usd-rub"],
      eurRub: rates["eur-rub"],
      rubEur: rates["rub-eur"],
      rubUsd: rates["rub-usd"],
    };
  } catch (error) {
    console.error("Ошибка получения обменных курсов:", error);
  }
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
          (Базовая валюта: <b>{{ baseCurrency }}</b
          >)
        </p>
      </div>

      <ul class="space-y-4 flex flex-col justify-center items-center">
        <li class="text-lg">
          1 USD = {{ exchangeRates.usdRub.toFixed(2) }} {{ baseCurrency }}
        </li>
        <li class="text-lg">
          1 EUR = {{ exchangeRates.eurRub.toFixed(2) }} {{ baseCurrency }}
        </li>
        <li class="text-lg">
          1 {{ baseCurrency }} = {{ exchangeRates.rubEur.toFixed(2) }} EUR
        </li>
        <li class="text-lg">
          1 {{ baseCurrency }} = {{ exchangeRates.rubUsd.toFixed(2) }} USD
        </li>
      </ul>
    </div>
  </div>
</template>
