import { ref } from 'vue';

export function useComments() {
  const comentarios = ref([
    { id: 1, nome: 'João', texto: 'Ótima aula!' },
    { id: 2, nome: 'Maria', texto: 'Gostei muito!' },
  ]);
  const novoComentario = ref({ nome: '', texto: '' });

  const adicionarComentario = () => {
    if (!novoComentario.value.nome?.trim() || !novoComentario.value.texto?.trim()) {
      throw new Error('Nome e comentário são obrigatórios');
    }

    // Sanitizar inputs
    const nome = novoComentario.value.nome.trim().slice(0, 100);
    const texto = novoComentario.value.texto.trim().slice(0, 1000);

    comentarios.value.push({
      id: Date.now(), // Usar timestamp como ID
      nome,
      texto,
    });

    novoComentario.value = { nome: '', texto: '' };
  };

  return {
    comentarios,
    novoComentario,
    adicionarComentario
  };
} 