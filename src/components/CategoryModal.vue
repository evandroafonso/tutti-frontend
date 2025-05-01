<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
        Nova Categoria
      </h3>
      <input 
        type="text" 
        v-model="categoryName" 
        placeholder="Nome da Categoria" 
        class="w-full px-3 py-2 mb-4 border rounded focus:outline-none dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" 
      />
      <div class="flex justify-end gap-2">
        <button 
          type="button" 
          @click="closeModal" 
          class="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          @click="createCategory" 
          class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none"
        >
          Criar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close', 'create']);

const categoryName = ref('');

const closeModal = () => {
  categoryName.value = '';
  emit('close');
};

const createCategory = () => {
  if (!categoryName.value.trim()) {
    return;
  }
  emit('create', categoryName.value.trim());
  categoryName.value = '';
};
</script> 