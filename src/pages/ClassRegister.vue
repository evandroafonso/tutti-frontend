<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <MobileHeader :is-menu-open="isMobileMenuOpen" @toggle-menu="toggleMenu" />
    <SideMenu
      :aulas="aulas"
      :aula-selecionada="aulaSelecionada"
      :dark-mode="darkMode"
      :is-mobile="true"
      v-if="isMobileMenuOpen"
      @select="selecionarAulaComMenuFechado"
      @close="toggleMenu"
      @toggle-dark-mode="toggleDarkMode"
    />
    <div class="flex flex-1 pt-16 lg:pt-0">
      <SideMenu :aulas="aulas" :aula-selecionada="aulaSelecionada" :dark-mode="darkMode" @select="selecionarAulaComMenuFechado" @toggle-dark-mode="toggleDarkMode" />
      <main class="flex-1 min-h-screen p-8 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-dark-background">
        <div class="flex items-end justify-end gap-2 mb-6">
          <ActionButton text="Cadastrar" color="green" :disabled="showRegistrationForm" @click="toggleRegistrationForm" />
          <ActionButton text="Editar" color="blue" :disabled="showRegistrationForm" @click="() => abrirJanelaEdicao(aulaSelecionadaComputed.titulo)" />
          <ActionButton text="Inativar" color="red" :disabled="showRegistrationForm" @click="toggleRegistrationForm" />
        </div>

        <div v-if="showRegistrationForm">
          <ClassForm :is-editing="isEditing" :categories="categories" :initial-data="isEditing ? aulaSelecionada : null" @submit="handleFormSubmit" @open-category-modal="openCategoryModal" />
        </div>
        <div v-else-if="aulaSelecionadaComputed" class="p-4 bg-white rounded-md dark:bg-dark-backgroundTab">
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">{{ aulaSelecionadaComputed.titulo }}</h2>
          <div v-html="convertedContent" class="prose dark:prose-invert max-w-none"></div>
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">Categoria: {{ aulaSelecionadaComputed.categoria }}</p>
        </div>
      </main>
    </div>
    <CategoryModal :is-open="isCategoryModalOpen" @close="closeCategoryModal" @create="createCategory" />
    <ToastContainer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useDarkMode } from '../composables/useDarkMode';
import { useClassContent } from '../composables/useClassContent';
import { useCategories } from '../composables/useCategories';
import { useLastSelectedClass } from '../composables/useLastSelectedClass';
import MobileHeader from '../components/MobileHeader.vue';
import SideMenu from '../components/SideMenu.vue';
import ClassForm from '../components/ClassForm.vue';
import CategoryModal from '../components/CategoryModal.vue';
import ToastContainer from '../components/ToastContainer.vue';
import ActionButton from '../components/ActionButton.vue';

export default {
  components: { MobileHeader, SideMenu, ClassForm, CategoryModal, ToastContainer, ActionButton },
  setup() {
    const isMobileMenuOpen = ref(false);
    const { darkMode, toggleDarkMode } = useDarkMode();

    const { aulas, aulaSelecionada, convertedContent, selecionarAula, carregarAulas, isEditing, showRegistrationForm, abrirJanelaEdicao, handleFormSubmit, toggleRegistrationForm } = useClassContent();

    const { categories, isCategoryModalOpen, fetchCategories, createCategory, openCategoryModal, closeCategoryModal } = useCategories();

    const { salvarAulaSelecionada, carregarUltimaAulaSelecionada } = useLastSelectedClass(aulas, selecionarAula);

    const aulaSelecionadaComputed = computed(() => aulaSelecionada.value || aulas.value[0] || null);

    const toggleMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value);

    const selecionarAulaComMenuFechado = (aula) => {
      selecionarAula(aula);
      salvarAulaSelecionada(aula);
      showRegistrationForm.value = false;
      toggleMenu();
    };

    onMounted(async () => {
      await fetchCategories();
      await carregarAulas();
      carregarUltimaAulaSelecionada();
    });

    return {
      aulas,
      aulaSelecionada,
      aulaSelecionadaComputed,
      convertedContent,
      isEditing,
      showRegistrationForm,
      categories,
      isCategoryModalOpen,
      isMobileMenuOpen,
      darkMode,
      toggleMenu,
      toggleDarkMode,
      selecionarAulaComMenuFechado,
      abrirJanelaEdicao,
      handleFormSubmit,
      toggleRegistrationForm,
      createCategory,
      openCategoryModal,
      closeCategoryModal,
    };
  },
};
</script>
