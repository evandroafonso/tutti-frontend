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

        <!-- Listagem de todas as aulas -->
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
        <!-- Botão de Cadastro no Topo -->
        <div class="flex items-end justify-end gap-2 mb-6">
          <button @click="toggleRegistrationForm" :disabled="isEditing" :class="{
            'bg-green-600 hover:bg-green-700': !isEditing,
            'bg-gray-400 cursor-not-allowed': isEditing
          }" class="px-4 py-2 font-bold text-white bg-green-600 rounded focus:outline-none">
            Cadastrar
          </button>
          <button @click="openEditWindow(selectedClassComputed.titulo)" :disabled="isEditing" :class="{
            'bg-blue-600 hover:bg-blue-700': !isEditing,
            'bg-gray-400 cursor-not-allowed': isEditing
          }" class="px-4 py-2 font-bold text-white bg-blue-500 rounded focus:outline-none">
            Editar
          </button>
          <button @click="toggleRegistrationForm" :disabled="isEditing" :class="{
            'bg-red-600 hover:bg-red-700': !isEditing,
            'bg-gray-400 cursor-not-allowed': isEditing
          }" class="px-4 py-2 font-bold text-white bg-red-500 rounded focus:outline-none">
            Inativar
          </button>
        </div>

        <!-- Conteúdo Principal -->
        <div v-if="showRegistrationForm">
          <!-- Formulário de Cadastro da Aula -->
          <div class="p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 class="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">
              {{ isEditing ? 'Editar Aula' : 'Cadastrar Nova Aula' }}
            </h2>
            <form @submit.prevent="submitForm">
              <!-- Campo: Título -->
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                  Título:
                </label>
                <input type="text" v-model="newTitle" required placeholder="Título da Aula" class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
              </div>
              <!-- Campo: Conteúdo -->
              <div class="mb-4">
                <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                  Conteúdo (Markdown):
                </label>
                <textarea v-model="newText" required placeholder="Conteúdo da Aula" class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600">
            </textarea>
              </div>
              <!-- Campo: Categoria -->
              <div class="mb-4">
                <div class="flex items-center mb-2">
                  <label class="block mr-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                    Categoria:
                  </label>
                  <button type="button" @click="openCategoryModal" class="px-2 py-1 text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">
                    +
                  </button>
                </div>
                <select v-model="selectedCategory" required class="w-full px-3 py-2 border rounded shadow focus:outline-none focus:ring dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600">
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
        </div>

        <div v-else>
          <!-- Exibição da Aula Selecionada ou Primeira Aula da Lista -->
          <div v-if="selectedClassComputed" class="p-4 bg-white rounded-md dark:bg-gray-800">
            <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
              {{ selectedClassComputed.titulo }}
            </h2>
            <!-- Conteúdo convertido de Markdown para HTML -->
            <div v-html="convertedContent" class="prose dark:prose-invert max-w-none">
            </div>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Categoria: {{ selectedClassComputed.categoria }}
            </p>
          </div>
        </div>
      </main>
    </div>

    <!-- Modal para Criação de Nova Categoria -->
    <div v-if="isCategoryModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h3 class="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">
          Nova Categoria
        </h3>
        <input type="text" v-model="newCategoryModalName" placeholder="Nome da Categoria" class="w-full px-3 py-2 mb-4 border rounded focus:outline-none dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
        <div class="flex justify-end gap-2">
          <button type="button" @click="closeCategoryModal" class="px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none">
            Cancelar
          </button>
          <button type="button" @click="createCategory" class="px-4 py-2 font-bold text-white rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none">
            Criar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import classContentService from '../services/classContentService';
import classCategoryService from '../services/classCategoryService';
import { MusicalNoteIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { useDarkMode } from '../composables/useDarkMode';
import { marked } from 'marked';
import toastService from '../services/toastService'


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
    // Configuração do marked para conversão de Markdown
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    // Estados para controle visual
    const isMobileMenuOpen = ref(false);
    const classes = ref([]);
    const selectedClass = ref(null);
    const categories = ref([]);
    const showRegistrationForm = ref(false);
    const isCategoryModalOpen = ref(false);
    const isEditing = ref(false);
    const editingClassId = ref(null);

    // Campos do formulário
    const newTitle = ref('');
    const newText = ref('');
    const selectedCategory = ref('');
    const newCategoryModalName = ref('');

    // Modo escuro
    const { darkMode, toggleDarkMode } = useDarkMode();

    // Computed para aula selecionada e conversão do conteúdo Markdown
    const selectedClassComputed = computed(() => {
      return selectedClass.value || (classes.value.length ? classes.value[0] : null);
    });

    const convertedContent = computed(() => {
      if (selectedClassComputed.value && selectedClassComputed.value.texto) {
        return marked.parse(selectedClassComputed.value.texto);
      }
      return '';
    });

    // Funções auxiliares
    const toggleRegistrationForm = () => {
      showRegistrationForm.value = true; // Garante que o formulário seja exibido.
    };

    const validateFormFields = () => {
      if (!newTitle.value || !newText.value || !selectedCategory.value) {
        alert('Por favor, preencha todos os campos.');
        return false;
      }
      return true;
    };

    const handleClassSubmission = async (classData, isEditMode) => {
      try {
        if (isEditMode) {
          await classContentService.updateClass(classData);
        } else {
          await classContentService.registerClass(classData);
        }
        await fetchClasses();
        toastService.show('Aula atualizada com sucesso!', 'success');
      } catch (error) {
        toastService.show('Erro ao atualizar aula!', 'danger');
      }
    };

    const submitForm = async () => {
      if (!validateFormFields()) return;

      const classData = {
        id: isEditing.value ? editingClassId.value : undefined,
        title: newTitle.value.trim(),
        content: newText.value.trim(),
        classCategory: selectedCategory.value,
      };

      await handleClassSubmission(classData, isEditing.value);
    };

    const resetForm = () => {
      newTitle.value = '';
      newText.value = '';
      selectedCategory.value = '';
      editingClassId.value = null;
      isEditing.value = false;
      showRegistrationForm.value = false;
    };

    const selectClass = (classe) => {
      resetForm();
      selectedClass.value = classe;
      showRegistrationForm.value = false;
      isMobileMenuOpen.value = false;
    };

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    // Funções para categoria
    const openCategoryModal = () => {
      isCategoryModalOpen.value = true;
    };

    const closeCategoryModal = () => {
      isCategoryModalOpen.value = false;
      newCategoryModalName.value = '';
    };

    const createCategory = async () => {
      if (!newCategoryModalName.value.trim()) {
        alert('Digite o nome da categoria');
        return;
      }
      try {
        const data = await classCategoryService.createCategory(newCategoryModalName.value.trim());
        categories.value.push({
          id: data.id,
          description: data.description,
        });
        closeCategoryModal();
      } catch (error) {
        alert(error.message);
      }
    };

    const fetchCategories = async () => {
      try {
        categories.value = await classCategoryService.fetchCategories();
      } catch (error) {
        alert(error.message);
      }
    };

    // Funções para gerenciamento de aulas
    const fetchClasses = async () => {
      try {
        const data = await classContentService.fetchClasses();
        classes.value = data.map(({ id, title, content, classCategory }) => ({
          id,
          titulo: title,
          texto: content,
          categoria: classCategory,
        }));
      } catch (error) {
        alert(error.message);
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

        if (selectedClass.value) {
          newTitle.value = selectedClass.value.titulo;
          newText.value = selectedClass.value.texto;
          selectedCategory.value = selectedClass.value.categoria;
          editingClassId.value = selectedClass.value.id;
        }

        isEditing.value = true;
        showRegistrationForm.value = true;
      } catch (error) {
        alert(error.message);
      }
    };

    // Montagem do componente
    onMounted(() => {
      fetchCategories();
      fetchClasses();
    });

    return {
      darkMode,
      isMobileMenuOpen,
      classes,
      selectedClass,
      selectedClassComputed,
      convertedContent,
      categories,
      newTitle,
      newText,
      selectedCategory,
      showRegistrationForm,
      toggleRegistrationForm,
      submitForm,
      selectClass,
      toggleDarkMode,
      toggleMenu,
      isCategoryModalOpen,
      newCategoryModalName,
      openCategoryModal,
      closeCategoryModal,
      createCategory,
      openEditWindow,
      isEditing,
    };
  },
};
</script>
