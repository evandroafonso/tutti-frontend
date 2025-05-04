import { ref } from 'vue';
import classCategoryService from '../services/classCategoryService';
import toastService from '../services/toastService';

export function useCategories() {
  const categories = ref([]);
  const isCategoryModalOpen = ref(false);

  const fetchCategories = async () => {
    try {
      categories.value = await classCategoryService.fetchCategories();
    } catch (error) {
      toastService.show(error.message, 'danger');
    }
  };

  const createCategory = async (name) => {
    try {
      const data = await classCategoryService.createCategory(name);
      categories.value.push({ id: data.id, description: data.description });
      toastService.show('Categoria criada com sucesso!', 'success');
      return true;
    } catch (error) {
      toastService.show(error.message, 'danger');
      return false;
    }
  };

  const openCategoryModal = () => (isCategoryModalOpen.value = true);
  const closeCategoryModal = () => (isCategoryModalOpen.value = false);

  return {
    categories,
    isCategoryModalOpen,
    fetchCategories,
    createCategory,
    openCategoryModal,
    closeCategoryModal,
  };
} 