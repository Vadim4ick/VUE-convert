<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <div>
    <Header />

    <main class="bg-gray-100">
      <router-view />
    </main>
  </div>
</template>
