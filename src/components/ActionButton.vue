<template>
  <button
    :disabled="disabled"
    :class="['px-4 py-2 font-bold text-white rounded focus:outline-none', disabled ? 'bg-gray-400 cursor-not-allowed' : `bg-${color}-600 hover:bg-${color}-700`]"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: String,
  color: String,
  disabled: Boolean,
});
</script>
