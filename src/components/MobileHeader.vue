<template>
  <header class="fixed top-0 left-0 right-0 z-20 p-4 bg-white shadow lg:hidden dark:bg-dark-backgroundTab">
    <div class="relative flex items-center justify-center gap-2">
      <button @click="$emit('toggle-menu')" class="absolute left-4 focus:outline-none" :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'">
        <XMarkIcon v-if="isMenuOpen" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
        <Bars3Icon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
      <MusicalNoteIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
      <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti</h1>
    </div>
  </header>
</template>

<script>
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'MobileHeader',
  components: {
    MusicalNoteIcon,
    Bars3Icon,
    XMarkIcon,
  },
  props: {
    isMenuOpen: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['toggle-menu'],
};
</script>
