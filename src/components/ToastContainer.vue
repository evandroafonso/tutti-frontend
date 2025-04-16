<template>
  <!-- Posiciona o container de toasts no canto superior direito -->
  <div class="fixed z-50 flex flex-col items-center space-y-2 transform -translate-x-1/2 bottom-4 left-1/2">
    <BaseToast v-for="(toast, index) in toasts" :key="index" :type="toast.type" :message="toast.message" @close="removeToast(index)" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import toastService from '../services/toastService'
import BaseToast from './BaseToast.vue'

export default {
  name: 'ToastContainer',
  components: { BaseToast },
  setup() {
    const toasts = ref([])

    const addToast = (toast) => {
      console.log('Toast recebido:', toast) // Debug
      toasts.value.push(toast)
      // Remove o toast após 3 segundos
      setTimeout(() => {
        toasts.value.shift()
      }, 3000)
    }

    // Registrar o evento ao montar o componente
    onMounted(() => {
      toastService.on('toast', addToast)
    })

    // Cancelar inscrição ao desmontar para evitar vazamento de memória
    onUnmounted(() => {
      toastService.off('toast', addToast)
    })

    const removeToast = (index) => {
      toasts.value.splice(index, 1)
    }

    return { toasts, removeToast }
  },
}
</script>
