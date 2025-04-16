<template>
  <div v-if="visible" :class="[
    'flex items-center w-full max-w-xs p-4 text-gray-800 rounded-lg shadow-sm ms-2 dark:text-gray-400',
    backgroundClass
  ]" role="alert">
    <div :class="[
      'inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg',
      typeClasses.iconContainer
    ]">
      <img :src="typeClasses.iconSrc" class="w-10 h-8" alt="Icon" />
      <span class="sr-only">{{ type }} icon</span>
    </div>

    <div class="text-sm font-normal ms-3">{{ message }}</div>

    <button type="button" @click="closeToast" class="ms-auto -mx-1 -my-1 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" aria-label="Close">
      <span class="sr-only">Close</span>
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" class="w-3 h-3">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: value => ['success', 'danger', 'warning'].includes(value),
  },
  message: {
    type: String,
    required: true,
  },
})

const visible = ref(true)
function closeToast() {
  visible.value = false
}

const message = computed(() => {
  return typeof props.message === 'string' ? props.message : ''
})

const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return {
        iconSrc: 'https://img.icons8.com/color/48/000000/good-quality--v1.png',
        iconContainer: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
      }
    case 'danger':
      return {
        iconSrc: 'https://img.icons8.com/color/48/000000/error--v1.png',
        iconContainer: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
      }
    case 'warning':
      return {
        iconSrc: 'https://img.icons8.com/color/48/000000/dislike--v1.png',
        iconContainer: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-700 dark:text-yellow-200',
      }
    default:
      return {
        iconSrc: '',
        iconContainer: '',
      }
  }
})

const backgroundClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-500'
    case 'danger':
      return 'bg-yellow-200'
    case 'warning':
      return 'bg-red-300'
    default:
      return 'bg-gray-200'
  }
})
</script>
