import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import classContentService from '../services/classContentService';

marked.setOptions({ gfm: true, breaks: true });

export function useClassContent() {
  const aulas = ref([]);
  const aulaSelecionada = ref(null);
  const activeTab = ref('content');

  const convertedContent = computed(() =>
    aulaSelecionada.value?.texto
      ? DOMPurify.sanitize(marked(aulaSelecionada.value.texto), {
          ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
          ALLOWED_ATTR: ['href', 'target', 'rel'],
        })
      : ''
  );

  const selecionarAula = (aula) => {
    aulaSelecionada.value = aula;
    activeTab.value = 'content';
  };

  const carregarAulas = async () => {
    const aulasData = await classContentService.fetchClasses();
    aulas.value = aulasData
      .map(({ title, content, videoUrl }) => ({
        titulo: title,
        texto: content,
        videoUrl: videoUrl || null,
      }))
      .sort((a, b) => (parseInt(a.titulo.match(/\d+/)?.[0]) || 0) - (parseInt(b.titulo.match(/\d+/)?.[0]) || 0));
    aulaSelecionada.value = aulas.value[0] || null;
  };

  return {
    aulas,
    aulaSelecionada,
    activeTab,
    convertedContent,
    selecionarAula,
    carregarAulas,
  };
}
