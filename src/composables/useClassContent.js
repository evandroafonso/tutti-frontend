import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import classContentService from '../services/classContentService';

export function useClassContent() {
  const aulas = ref([]);
  const aulaSelecionada = ref(null);
  const activeTab = ref('content');

  // Configuração do marked
  marked.setOptions({
    gfm: true,
    breaks: true
  });

  const convertedContent = computed(() => {
    if (aulaSelecionada.value?.texto) {
      const html = marked(aulaSelecionada.value.texto);
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
    }
    return '';
  });

  const selecionarAula = (aula) => {
    aulaSelecionada.value = aula;
    activeTab.value = 'content';
  };

  const carregarAulas = async () => {
    try {
      const aulasData = await classContentService.fetchClasses();
      aulas.value = aulasData.map(aula => ({
        titulo: aula.title,
        texto: aula.content,
        videoUrl: aula.videoUrl || null
      }));

      // Ordenar pelo número no título
      aulas.value.sort((a, b) => {
        const numA = parseInt(a.titulo.match(/\d+/)?.[0]) || 0;
        const numB = parseInt(b.titulo.match(/\d+/)?.[0]) || 0;
        return numA - numB;
      });

      if (aulas.value.length > 0) {
        aulaSelecionada.value = aulas.value[0];
      }
    } catch (error) {
      console.error('Erro ao carregar aulas:', error);
      throw error;
    }
  };

  return {
    aulas,
    aulaSelecionada,
    activeTab,
    convertedContent,
    selecionarAula,
    carregarAulas
  };
} 