import axiosClient from '../axios.js';

/**
 * Registra uma nova aula.
 * @param {Object} newClass - Objeto contendo title, content e classCategory.
 * @returns {Promise<Object>} Aula registrada.
 */
async function registerClass(newClass) {
  try {
    const response = await axiosClient.post('/class-content', newClass);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao registrar aula');
  }
}

/**
 * Registra uma nova aula.
 * @param {Object} newClass - Objeto contendo title, content e classCategory.
 * @returns {Promise<Object>} Aula atualizada.
 */
async function updateClass(newClass) {
  try {
    const response = await axiosClient.put(`/class-content/${newClass.id}`, newClass);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao atualizar aula');
  }
}

/**
 * Busca a lista de todas as aulas.
 * @returns {Promise<Array>} Lista de aulas.
 */
async function fetchClasses() {
  try {
    const response = await axiosClient.get('/class-content/classes');
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao buscar aulas');
  }
}

async function fetchClassesByTitle(title) {
  try {
    const response = await axiosClient.get(`/class-content?title=${title}`);
    return await JSON.stringify(response.data);
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao buscar aula por título');
  }
}

export default {
  registerClass,
  updateClass,
  fetchClasses,
  fetchClassesByTitle
}
