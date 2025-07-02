<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-dark-backgroundTab">
      <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Nova Categoria</h3>
      <input
        type="text"
        v-model="categoryName"
        placeholder="Nome da Categoria"
        class="w-full px-3 py-2 mb-4 border rounded focus:outline-none dark:bg-dark-backgroundTabWriteSection dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-200"
      />
      <div class="flex justify-end gap-2">
        <button type="button" @click="closeModal" class="px-4 py-2 font-bold text-gray-200 bg-red-600 rounded hover:bg-red-800 focus:outline-none">Cancelar</button>
        <button type="button" @click="createCategory" class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">Criar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import toastService from '../services/toastService';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'create']);

const categoryName = ref('');

const closeModal = () => {
  categoryName.value = '';
  emit('close');
};

const validateCategoryName = () => {
  if (!categoryName.value.trim()) {
    toastService.show('Por favor, digite o nome da categoria', 'warning');
    return false;
  }
  if (categoryName.value.trim().length < 3) {
    toastService.show('O nome da categoria deve ter pelo menos 3 caracteres', 'warning');
    return false;
  }
  return true;
};

const createCategory = () => {
  if (!validateCategoryName()) {
    return;
  }
  emit('create', categoryName.value.trim());
  categoryName.value = '';
};
</script>
