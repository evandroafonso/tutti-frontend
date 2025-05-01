import axiosClient from '../axios.js';

/**
 * Cria uma nova categoria.
 * @param {string} categoryName - Nome da nova categoria.
 * @returns {Promise<Object>} Categoria criada.
 */
async function createCategory(categoryName) {
  try {
    const response = await axiosClient.post('/class-category', {
      description: categoryName,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar categoria');
  }
}

/**
 * Busca a lista de todas as categorias.
 * @returns {Promise<Array>} Lista de categorias.
 */
async function fetchCategories() {
  try {
    const response = await axiosClient.get('/class-category/list-all');
    return response.data.map((category) => ({
      id: category.id,
      description: category.description,
    }));
  } catch (error) {
    throw new Error('Erro ao buscar categorias');
  }
}

export default {
  createCategory,
  fetchCategories,
};