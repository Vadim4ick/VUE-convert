<script setup lang="ts">
import ConvertForm from "@/components/ConvertForm.vue";
</script>

<template>
  <section
    class="justify-center min-h-[calc(100vh_-_var(--header-height))] flex flex-col items-center p-6"
  >
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Конвертация валют
      </h1>

      <ConvertForm />
    </div>
  </section>
</template>
