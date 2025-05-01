<template>
  <button
    :class="[
      'inline-block px-4 py-2 font-semibold rounded-t-lg transition-colors duration-200',
      isActive
        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
});

defineEmits(['click']);
</script> 