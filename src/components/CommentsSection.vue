<template>
  <div>
    <div v-for="comentario in comentarios" :key="comentario.id" class="p-4 mb-4 bg-gray-100 rounded-md shadow-sm dark:bg-dark-backgroundTabSection">
      <p class="font-semibold text-gray-800 dark:text-dark-textTabSection">
        {{ comentario.nome }}
      </p>
      <p class="text-gray-600 dark:text-dark-textTabSection">{{ comentario.texto }}</p>
    </div>
    <div class="p-6 bg-gray-100 rounded-md shadow-md dark:bg-dark-backgroundTabSection">
      <h4 class="mb-3 text-lg font-semibold text-gray-800 dark:text-dark-textH4">Adicionar Comentário</h4>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-dark-textTabSection"> Nome: </label>
          <input
            type="text"
            v-model="novoComentario.nome"
            required
            maxlength="100"
            class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-dark-backgroundTabWriteSection dark:text-gray-100 dark:border-dark-border"
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-dark-textTabSection"> Comentário: </label>
          <textarea
            v-model="novoComentario.texto"
            required
            maxlength="1000"
            class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-dark-backgroundTabWriteSection dark:text-gray-100 dark:border-dark-border"
          ></textarea>
        </div>
        <button
          type="submit"
          class="px-4 py-2 font-bold text-white transition-colors rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline dark:bg-emerald-600 dark:hover:bg-emerald-800"
        >
          Enviar Comentário
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  comentarios: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['add-comment']);

const novoComentario = ref({
  nome: '',
  texto: '',
});

const handleSubmit = async () => {
  try {
    await emit('add-comment', { ...novoComentario.value });
    novoComentario.value = {
      nome: '',
      texto: '',
    };
  } catch (error) {
    alert(error.message);
  }
};
</script>
