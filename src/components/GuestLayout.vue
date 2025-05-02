<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <MusicalNoteIcon class="mx-auto size-14 text-emerald-500" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';
</script>

<style scoped></style>
