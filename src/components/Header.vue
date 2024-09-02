<script setup lang="ts">
import { RouterLink } from "vue-router";
import Dropdown from "./ui/Dropdown.vue";

import { navbarItems } from "@/shared/constants/navbar.const";
import { useCurrencyStore } from "@/shared/store/currency.store";
import { Currency } from "@/shared/constants/currency.const";
import { onMounted } from "vue";

const currencyStore = useCurrencyStore();

function onChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value as Currency;

  currencyStore.toggle(val);
}

onMounted(async () => {
  currencyStore.fetchExchangeRates();
});
</script>

<template>
  <header
    class="flex justify-between items-center py-4 bg-blue-600 text-white shadow-md"
  >
    <div class="container">
      <div class="flex justify-between gap-2">
        <nav class="flex space-x-4">
          <RouterLink
            v-for="item in navbarItems"
            :key="item.path"
            :to="item.path"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <Dropdown
          :options="currencyStore.currency"
          :onChange="onChange"
          v-model="currencyStore.currentCurrency"
        />
      </div>
    </div>
  </header>
</template>
