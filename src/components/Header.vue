<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import Dropdown from "./ui/Dropdown.vue";

import { navbarItems } from "@/shared/constants/navbar.const";
import {
  Currency,
  currencies,
  defaultCurrency,
} from "@/shared/constants/currency.const";

const selectedCurrency = ref<Currency>(defaultCurrency);
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

        <Dropdown :options="currencies" v-model="selectedCurrency" />
      </div>
    </div>
  </header>
</template>
