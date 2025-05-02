<template>
  <aside
    :class="[
      'flex-col h-screen text-gray-700 bg-white border-r border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
      isMobile
        ? 'fixed inset-0 z-30 flex lg:hidden'
        : 'fixed top-0 left-0 hidden lg:flex w-80',
    ]"
  >
    <div
      class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700"
    >
      <MusicalNoteIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
      <h1 class="ml-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Tutti
      </h1>
      <button
        v-if="isMobile"
        @click="$emit('close')"
        class="ml-auto focus:outline-none"
        aria-label="Fechar menu"
      >
        <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
    <ul class="flex-1 py-2 overflow-y-auto">
      <li
        v-for="aula in aulas"
        :key="aula.titulo"
        @click="$emit('select', aula)"
        class="px-4 py-2 font-semibold transition duration-300 cursor-pointer"
        :class="{
          'bg-gray-100 dark:bg-gray-700':
            aulaSelecionada?.titulo === aula.titulo,
          'hover:bg-gray-100 dark:hover:bg-gray-700': true,
        }"
      >
        <span
          :class="
            aulaSelecionada?.titulo === aula.titulo
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'
          "
        >
          {{ aula.titulo }}
        </span>
      </li>
    </ul>
    <div
      class="flex items-center p-4 border-t border-gray-200 dark:border-gray-700"
    >
      <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
      <span class="ml-2 font-semibold text-gray-700 dark:text-gray-300"
        >User</span
      >
      <button
        @click="$emit('toggle-dark-mode')"
        class="ml-auto focus:outline-none"
        :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'"
      >
        <SunIcon
          v-if="darkMode"
          class="w-6 h-6 text-gray-600 dark:text-gray-300"
        />
        <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  </aside>
</template>

<script>
import { MusicalNoteIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

export default {
  name: 'SideMenu',
  components: {
    MusicalNoteIcon,
    UserCircleIcon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
  },
  props: {
    aulas: {
      type: Array,
      required: true,
    },
    aulaSelecionada: {
      type: Object,
      default: null,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select', 'close', 'toggle-dark-mode'],
};
</script>
