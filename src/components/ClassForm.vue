<template>
  <div class="p-6 bg-white rounded-md shadow-md dark:bg-dark-backgroundTab">
    <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
      {{ isEditing ? 'Editar Aula' : 'Cadastrar Nova Aula' }}
    </h2>
    <form @submit.prevent="submitForm">
      <!-- Campo: Título -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300"> Título: </label>
        <input
          type="text"
          v-model="formData.title"
          required
          placeholder="Título da Aula"
          class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-dark-backgroundTabWriteSection dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-200"
        />
      </div>
      <!-- Campo: Conteúdo -->
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-200"> Conteúdo (Markdown): </label>
        <textarea
          v-model="formData.content"
          required
          placeholder="Conteúdo da Aula"
          class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-dark-backgroundTabWriteSection dark:placeholder-gray-200 dark:text-white dark:border-gray-600"
        ></textarea>
      </div>
      <!-- Campo: Categoria -->
      <div class="mb-4">
        <div class="flex items-center mb-2">
          <label class="block mr-2 text-sm font-bold text-gray-700 dark:text-gray-300"> Categoria: </label>
          <button type="button" @click="$emit('open-category-modal')" class="px-2 py-1 text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">+</button>
        </div>
        <select
          v-model="formData.category"
          required
          class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-dark-backgroundTabWriteSection dark:text-gray-100 dark:border-gray-600"
        >
          <option value="" disabled>Selecione uma categoria</option>
          <option v-for="cat in categories" :key="cat.description" :value="cat.description">
            {{ cat.description }}
          </option>
        </select>
      </div>
      <!-- Botão de submit -->
      <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-800">
        {{ isEditing ? 'Salvar Alterações' : 'Cadastrar Aula' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import toastService from '../services/toastService';

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    required: true,
  },
  initialData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['submit', 'open-category-modal']);

const formData = ref({
  id: '',
  title: '',
  content: '',
  category: '',
});

// Atualiza o formulário quando os dados iniciais mudam
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        id: newData.id || '',
        title: newData.titulo || '',
        content: newData.texto || '',
        category: newData.categoria || '',
      };
    }
  },
  { immediate: true }
);

const validateForm = () => {
  if (!formData.value.title.trim()) {
    toastService.show('Por favor, preencha o título da aula', 'warning');
    return false;
  }
  if (!formData.value.content.trim()) {
    toastService.show('Por favor, preencha o conteúdo da aula', 'warning');
    return false;
  }
  if (!formData.value.category) {
    toastService.show('Por favor, selecione uma categoria', 'warning');
    return false;
  }
  return true;
};

const submitForm = () => {
  if (!validateForm()) {
    return;
  }
  emit('submit', {
    id: formData.value.id,
    title: formData.value.title.trim(),
    content: formData.value.content.trim(),
    category: formData.value.category,
  });
};
</script>
