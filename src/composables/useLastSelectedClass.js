import { onMounted } from 'vue';

export function useLastSelectedClass(aulas, selecionarAula) {
  const carregarUltimaAulaSelecionada = () => {
    const tituloAula = localStorage.getItem('aulaSelecionadaId');
    if (!tituloAula) return;

    const aula = aulas.value.find((aula) => aula.titulo.trim() === tituloAula.trim());
    if (aula) {
      selecionarAula(aula);
    }
  };

  const salvarAulaSelecionada = (aula) => {
    localStorage.setItem('aulaSelecionadaId', aula.titulo);
  };

  return {
    salvarAulaSelecionada,
    carregarUltimaAulaSelecionada,
  };
}
