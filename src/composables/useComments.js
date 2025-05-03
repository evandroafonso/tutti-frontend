import { ref } from 'vue';

export function useComments() {
  const comentarios = ref([
    {
      id: 1,
      nome: 'João',
      texto: 'Ótima aula!',
    },
    {
      id: 2,
      nome: 'Maria',
      texto: 'Gostei muito!',
    },
  ]);
  const novoComentario = ref({ nome: '', texto: '' });

  const adicionarComentario = () => {
    const nome = novoComentario.value.nome?.trim();
    const texto = novoComentario.value.texto?.trim();
    if (!nome || !texto) throw new Error('Nome e comentário são obrigatórios');
    comentarios.value.push({
      id: Date.now(),
      nome: nome.slice(0, 100),
      texto: texto.slice(0, 1000),
    });
    novoComentario.value = { nome: '', texto: '' };
  };

  return {
    comentarios,
    novoComentario,
    adicionarComentario,
  };
}
