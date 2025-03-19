<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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