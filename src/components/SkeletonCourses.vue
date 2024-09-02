<script setup lang="ts">
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <div>
    <Skeleton class="w-full h-[28px] mb-2" />

    <ul class="flex flex-col gap-3 justify-center items-center">
      <Skeleton class="w-full h-[28px]" />
      <Skeleton class="w-full h-[28px]" />
    </ul>
  </div>
</template>
