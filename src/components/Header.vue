<script setup lang="ts">
import { RouterLink } from "vue-router";
import { navbarItems } from "@/shared/constants/navbar.const";
import { useCurrencyStore } from "@/shared/store/currency.store";
import { onMounted } from "vue";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const currencyStore = useCurrencyStore();

// function onChange(e: Event) {
//   const val = (e.target as HTMLSelectElement).value as Currency;

//   currencyStore.toggle(val);
// }

onMounted(async () => {
  currencyStore.fetchExchangeRates();
});
</script>

<template>
  <header
    class="flex h-[var(--header-height)] justify-between items-center py-4 bg-blue-600 text-white shadow-md"
  >
    <div class="container">
      <div class="flex justify-between items-center gap-2">
        <nav class="flex space-x-4">
          <RouterLink
            v-for="item in navbarItems"
            :key="item.path"
            :to="item.path"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <div class="max-w-[350px] w-full">
          <Select v-model="currencyStore.currentCurrency">
            <SelectTrigger class="text-black">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Выберите базовую валюту:</SelectLabel>

                <SelectItem
                  v-for="currency in currencyStore.currency"
                  :key="currency"
                  :value="currency"
                >
                  {{ currency }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  </header>
</template>
