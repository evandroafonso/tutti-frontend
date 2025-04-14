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
    console.error('Erro ao registrar aula:', error);
    throw new Error('Erro ao registrar aula');
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
    console.error('Erro ao buscar aulas:', error);
    throw new Error('Erro ao buscar aulas');
  }
}

export default {
  registerClass,
  fetchClasses,
}
