<template>
  <button
    :disabled="disabled"
    :class="[
      'px-4 py-2 font-bold text-white rounded focus:outline-none',
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : {
            'bg-green-600 hover:bg-green-700': color === 'green',
            'bg-blue-600 hover:bg-blue-700': color === 'blue',
            'bg-red-600 hover:bg-red-700': color === 'red',
          },
    ]"
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
