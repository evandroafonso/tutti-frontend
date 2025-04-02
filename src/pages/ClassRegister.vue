<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <!-- Header Mobile -->
    <header class="fixed top-0 left-0 right-0 z-20 p-4 bg-white shadow lg:hidden dark:bg-gray-800">
      <div class="relative flex items-center justify-center gap-2">
        <button @click="toggleMenu" class="absolute left-4 focus:outline-none" :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'">
          <template v-if="isMobileMenuOpen">
            <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
          <template v-else>
            <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
        </button>
        <MusicalNoteIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti Admin</h1>
      </div>
    </header>

    <div class="flex flex-1 pt-16 lg:pt-0">
      <!-- Sidebar -->
      <aside :class="[
        isMobileMenuOpen ? 'flex w-full' : 'hidden',
        'lg:flex lg:w-80 lg:pt-0 flex flex-col bg-white text-gray-700 transition-all duration-300',
        'h-[calc(100vh-4rem)] lg:h-screen dark:bg-gray-800 dark:text-gray-300'
      ]">
        <!-- Sidebar Header -->
        <div class="flex-col items-center hidden w-full p-2 border-b border-gray-200 lg:flex dark:border-gray-700">
          <div class="relative flex items-center justify-center w-full">
            <MusicalNoteIcon class="hidden w-10 h-10 mx-2 text-green-600 lg:block dark:text-green-400" />
            <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti Admin</h1>
          </div>
        </div>
        <!-- List of Registered Classes -->
        <ul class="flex-1 py-2 overflow-y-auto">
          <li v-for="classe in classes" :key="classe.id" @click="selectClass(classe)" class="px-4 py-2 font-semibold transition duration-300 cursor-pointer" :class="{
            'bg-gray-100 dark:bg-gray-700': selectedClass?.id === classe.id,
            'hover:bg-gray-100 dark:hover:bg-gray-700': true
          }">
            <span :class="selectedClass?.id === classe.id
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'">
              {{ classe.titulo }}
            </span>
          </li>
        </ul>

        <!-- Sidebar Footer -->
        <div class="flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <span class="font-semibold text-gray-700 dark:text-gray-300">Admin</span>
          <button @click="toggleDarkMode" class="ml-auto focus:outline-none" :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <SunIcon v-if="darkMode" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 h-screen p-8 overflow-y-auto bg-gray-200 dark:bg-gray-900">
        <!-- Display selected class details -->

        <!-- Admin Form: New Class Registration -->
        <div class="p-6 bg-white shadow-md rounded-2xl dark:bg-gray-800">
          <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">Registrar Nova Aula</h2>
          <form @submit.prevent="registerClass">
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Título:</label>
              <input type="text" v-model="newTitle" required placeholder="Título da Aula" class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
            </div>
            <div class="mb-4">
              <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Conteúdo:</label>
              <textarea v-model="newText" required placeholder="Conteúdo da Aula" class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600"></textarea>
            </div>
            <div class="mb-4">
              <div class="flex items-center mb-2">
                <label class="block mr-2 text-sm font-bold text-gray-700 dark:text-gray-300">Categoria:</label>
                <button type="button" @click="openCategoryModal" class="px-2 py-1 text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">+</button>
              </div>
              <select v-model="selectedCategory" required class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600">
                <option value="" disabled>Selecione uma categoria</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.description }}</option>
              </select>
            </div>
            <button type="submit" class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-800">Registrar Aula</button>
          </form>
        </div>

        <div v-if="selectedClass" class="p-4 mb-4 bg-white rounded-2xl dark:bg-gray-800">
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">{{ selectedClass.titulo }}</h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">{{ selectedClass.texto }}</p>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Categoria: {{ selectedClass.categoria }}</p>
        </div>
      </main>
    </div>

    <!-- Modal para criação de nova categoria -->
    <div v-if="isCategoryModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Nova Categoria</h3>
        <input type="text" v-model="newCategoryModalName" placeholder="Nome da Categoria" class="w-full px-3 py-2 mb-4 border rounded focus:outline-none dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
        <div class="flex justify-end gap-2">
          <button type="button" @click="closeCategoryModal" class="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">Cancelar</button>
          <button type="button" @click="createCategory" class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">Criar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axiosClient from "../axios.js"; // Certifique-se de que o axiosClient está exportado corretamente.
import { MusicalNoteIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { useDarkMode } from '../composables/useDarkMode';

export default {
  components: {
    MusicalNoteIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
  },
  setup() {
    // Estados para dark mode e menu mobile
    const isMobileMenuOpen = ref(false);

    // Lista de aulas e aula selecionada
    const classes = ref([]);
    const selectedClass = ref(null);

    // Lista de categorias para o select
    const categories = ref([]);

    // Campos para cadastro de nova aula
    const newTitle = ref('');
    const newText = ref('');
    const selectedCategory = ref('');

    // Estados para o modal de nova categoria
    const isCategoryModalOpen = ref(false);
    const newCategoryModalName = ref('');
    const { darkMode, toggleDarkMode } = useDarkMode();


    // Função para registrar nova aula
    const registerClass = () => {
      if (!newTitle.value.trim() || !newText.value.trim() || !selectedCategory.value) {
        alert('Por favor, preencha todos os campos.');
        return;
      }
      const newClass = {
        id: classes.value.length + 1,
        titulo: newTitle.value.trim(),
        texto: newText.value.trim(),
        categoria: selectedCategory.value,
      };
      console.log('Registrando nova aula:', newClass);
      classes.value.push(newClass);
      newTitle.value = '';
      newText.value = '';
      selectedCategory.value = '';
      selectedClass.value = newClass;
    };

    // Selecionar aula
    const selectClass = (classe) => {
      selectedClass.value = classe;
      isMobileMenuOpen.value = false;
    };

    // Alternar menu mobile
    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    // Abrir modal de nova categoria
    const openCategoryModal = () => {
      console.log('Abrindo modal de nova categoria');
      isCategoryModalOpen.value = true;
    };

    // Fechar modal de nova categoria
    const closeCategoryModal = () => {
      console.log('Fechando modal de nova categoria');
      isCategoryModalOpen.value = false;
      newCategoryModalName.value = '';
    };

    // Função para criar nova categoria via POST usando axiosClient
    const createCategory = async () => {
      if (!newCategoryModalName.value.trim()) {
        alert('Digite o nome da categoria');
        return;
      }
      const categoryName = newCategoryModalName.value.trim();
      const token = localStorage.getItem('token');
      console.log('Token obtido do localStorage:', token);
      console.log('Criando categoria com nome:', categoryName);
      try {
        const response = await axiosClient.post('/class-category', {
          description: categoryName,
        });
        console.log('Resposta da criação de categoria:', response.data);
        // Adiciona a nova categoria à lista
        categories.value.push(response.data.description || categoryName);
        closeCategoryModal();
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        alert('Erro ao criar categoria');
      }
    };

    // Função para buscar as categorias do backend
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/class-category/list');
        categories.value = response.data.map(cat => ({
          id: cat.id,
          description: cat.description
        }));
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        alert('Erro ao carregar categorias');
      }
    };

    // Carrega o dark mode e as categorias ao montar o componente
    onMounted(() => {
      fetchCategories();
    });

    return {
      darkMode,
      isMobileMenuOpen,
      classes,
      selectedClass,
      categories,
      newTitle,
      newText,
      selectedCategory,
      registerClass,
      selectClass,
      toggleDarkMode,
      toggleMenu,
      isCategoryModalOpen,
      newCategoryModalName,
      openCategoryModal,
      closeCategoryModal,
      createCategory,
    };
  },
};
</script>
