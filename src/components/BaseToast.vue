<template>
  <div v-if="visible" :class="[
    'flex items-center w-full max-w-xs p-4 rounded-lg shadow-sm ms-2', // Removido text-gray-800 e dark:text-gray-400 daqui
    'text-gray-700 dark:text-gray-200', // Adicionado cores de texto aqui
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

// A mensagem computada parece ok, mas garantir que sempre retorne string é bom.
const message = computed(() => {
  return String(props.message || '') // Garante que seja sempre string
})

// As classes do ícone já tinham dark mode, estão boas.
const typeClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return {
        iconSrc: 'https://img.icons8.com/color/48/000000/good-quality--v1.png',
        // Usar tons mais claros no light mode e mais escuros/contrastantes no dark
        iconContainer: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
      }
    case 'danger': // Corrigido: Danger deve ter ícone de erro
      return {
        iconSrc: 'https://img.icons8.com/color/48/000000/error--v1.png',
        // Usar tons mais claros no light mode e mais escuros/contrastantes no dark
        iconContainer: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
      }
    case 'warning': // Corrigido: Warning deve ter ícone de aviso (o dislike pode confundir)
      return {
        // Sugestão de ícone de warning (pode usar o seu se preferir)
        iconSrc: 'https://img.icons8.com/color/48/warning-shield.png', //'https://img.icons8.com/color/48/000000/dislike--v1.png',
        // Usar tons mais claros no light mode e mais escuros/contrastantes no dark
        iconContainer: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200', // Ajustado para amarelo
      }
    default:
      return {
        iconSrc: '', // Um ícone padrão de informação poderia ir aqui
        iconContainer: 'text-gray-500 bg-gray-100 dark:bg-gray-700 dark:text-gray-200',
      }
  }
})

// **Principal Modificação:** Adicionar dark variants e corrigir mapeamento
const backgroundClass = computed(() => {
  switch (props.type) {
    case 'success':
      // Fundo verde um pouco mais escuro (light) / verde escuro (dark)
      return 'bg-green-500 dark:bg-green-800' // Alterado de 100 para 200
    case 'danger':
      // Fundo vermelho um pouco mais escuro (light) / vermelho escuro (dark)
      return 'bg-red-400 dark:bg-red-900' // Alterado de 100 para 200
    case 'warning':
      // Fundo amarelo um pouco mais escuro (light) / amarelo escuro (dark)
      return 'bg-yellow-200 dark:bg-yellow-900' // Alterado de 100 para 200
    default:
      // Fundo cinza padrão (manter 100 ou mudar para 200 se preferir)
      return 'bg-gray-100 dark:bg-gray-700' // Mantido 100 por enquanto
  }
})
</script>