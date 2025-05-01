<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <!-- Header Mobile -->
    <MobileHeader :is-menu-open="isMobileMenuOpen" @toggle-menu="toggleMenu" />

    <div class="flex flex-1 pt-16 lg:pt-0">
      <!-- Sidebar -->
      <SideMenu :aulas="classes" :aula-selecionada="selectedClass" :dark-mode="darkMode" :is-mobile="isMobileMenuOpen" @select="selectClass" @close="toggleMenu" @toggle-dark-mode="toggleDarkMode" />

      <!-- Main Content -->
      <main class="flex-1 min-h-screen p-8 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900">
        <!-- Botões de Ação -->
        <div class="flex items-end justify-end gap-2 mb-6">
          <button @click="toggleRegistrationForm" :disabled="showRegistrationForm" :class="{
            'bg-green-600 hover:bg-green-700': !showRegistrationForm,
            'bg-gray-400 cursor-not-allowed': showRegistrationForm
          }" class="px-4 py-2 font-bold text-white rounded focus:outline-none">
            Cadastrar
          </button>

          <button @click="openEditWindow(selectedClassComputed.titulo)" :disabled="showRegistrationForm" :class="{
            'bg-blue-600 hover:bg-blue-700': !showRegistrationForm,
            'bg-gray-400 cursor-not-allowed': showRegistrationForm
          }" class="px-4 py-2 font-bold text-white rounded focus:outline-none">
            Editar
          </button>

          <button @click="toggleRegistrationForm" :disabled="showRegistrationForm" :class="{
            'bg-red-600 hover:bg-red-700': !showRegistrationForm,
            'bg-gray-400 cursor-not-allowed': showRegistrationForm
          }" class="px-4 py-2 font-bold text-white rounded focus:outline-none">
            Inativar
          </button>
        </div>

        <!-- Conteúdo Principal -->
        <div v-if="showRegistrationForm">
          <ClassForm :is-editing="isEditing" :categories="categories" :initial-data="selectedClass" @submit="handleFormSubmit" @open-category-modal="openCategoryModal" />
        </div>

        <div v-else>
          <!-- Exibição da Aula Selecionada -->
          <div v-if="selectedClassComputed" class="p-4 bg-white rounded-md dark:bg-gray-800">
            <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
              {{ selectedClassComputed.titulo }}
            </h2>
            <div v-html="convertedContent" class="prose dark:prose-invert max-w-none"></div>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Categoria: {{ selectedClassComputed.categoria }}
            </p>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal de Categoria -->
    <CategoryModal :is-open="isCategoryModalOpen" @close="closeCategoryModal" @create="createCategory" />

    <!-- Toast Container -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { marked } from 'marked';
import classContentService from '../services/classContentService';
import classCategoryService from '../services/classCategoryService';
import { useDarkMode } from '../composables/useDarkMode';
import MobileHeader from '../components/MobileHeader.vue';
import SideMenu from '../components/SideMenu.vue';
import ClassForm from '../components/ClassForm.vue';
import CategoryModal from '../components/CategoryModal.vue';
import ToastContainer from '../components/ToastContainer.vue';

// Configuração do marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Estados
const isMobileMenuOpen = ref(false);
const classes = ref([]);
const selectedClass = ref(null);
const categories = ref([]);
const showRegistrationForm = ref(false);
const isCategoryModalOpen = ref(false);
const isEditing = ref(false);
const editingClassId = ref(null);

// Modo escuro
const { darkMode, toggleDarkMode } = useDarkMode();

// Computed
const selectedClassComputed = computed(() => {
  return selectedClass.value || (classes.value.length ? classes.value[0] : null);
});

const convertedContent = computed(() => {
  if (selectedClassComputed.value && selectedClassComputed.value.texto) {
    return marked.parse(selectedClassComputed.value.texto);
  }
  return '';
});

// Funções
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleRegistrationForm = () => {
  showRegistrationForm.value = true;
};

const selectClass = (classe) => {
  selectedClass.value = classe;
  showRegistrationForm.value = false;
  isMobileMenuOpen.value = false;
};

const handleFormSubmit = async (formData) => {
  try {
    const classData = {
      id: isEditing.value ? editingClassId.value : undefined,
      title: formData.title,
      content: formData.content,
      classCategory: formData.category,
    };

    if (isEditing.value) {
      await classContentService.updateClass(classData);
    } else {
      await classContentService.registerClass(classData);
    }

    await fetchClasses();
    showRegistrationForm.value = false;
    isEditing.value = false;
    editingClassId.value = null;
  } catch (error) {
    console.error('Erro ao salvar aula:', error);
  }
};

const openEditWindow = async (title) => {
  try {
    const data = await classContentService.fetchClassesByTitle(decodeURIComponent(title));
    const dataJson = JSON.parse(data);

    selectedClass.value = {
      id: dataJson.id,
      titulo: dataJson.title,
      texto: dataJson.content,
      categoria: dataJson.classCategory,
    };

    isEditing.value = true;
    showRegistrationForm.value = true;
  } catch (error) {
    console.error('Erro ao abrir edição:', error);
  }
};

const openCategoryModal = () => {
  isCategoryModalOpen.value = true;
};

const closeCategoryModal = () => {
  isCategoryModalOpen.value = false;
};

const createCategory = async (name) => {
  try {
    const data = await classCategoryService.createCategory(name);
    categories.value.push({
      id: data.id,
      description: data.description,
    });
    closeCategoryModal();
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
  }
};

const fetchCategories = async () => {
  try {
    categories.value = await classCategoryService.fetchCategories();
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
  }
};

const fetchClasses = async () => {
  try {
    const data = await classContentService.fetchClasses();
    classes.value = data.map(({ id, title, content, classCategory }) => ({
      titulo: title,
      texto: content,
      categoria: classCategory,
    }));
    classes.value.sort((a, b) => {
      const numA = parseInt(a.titulo.match(/\d+/)?.[0]) || 0;
      const numB = parseInt(b.titulo.match(/\d+/)?.[0]) || 0;
      return numA - numB;
    });
  } catch (error) {
    console.error('Erro ao buscar aulas:', error);
  }
};

// Lifecycle
onMounted(() => {
  fetchCategories();
  fetchClasses();
});
</script>
