import { ref, computed } from 'vue';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import classContentService from '../services/classContentService';
import toastService from '../services/toastService';

marked.setOptions({ gfm: true, breaks: true });

export function useClassContent() {
  const aulas = ref([]);
  const aulaSelecionada = ref(null);
  const activeTab = ref('content');
  const isEditing = ref(false);
  const showRegistrationForm = ref(false);

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
      .map(({ id, title, content, classCategory }) => ({
        id,
        titulo: title,
        texto: content,
        categoria: classCategory,
      }))
      .sort((a, b) => (parseInt(a.titulo.match(/\d+/)?.[0]) || 0) - (parseInt(b.titulo.match(/\d+/)?.[0]) || 0));
    aulaSelecionada.value = aulas.value[0] || null;
  };

  const abrirJanelaEdicao = async (title) => {
    try {
      const dataJson = JSON.parse(await classContentService.fetchClassesByTitle(decodeURIComponent(title)));
      aulaSelecionada.value = {
        id: dataJson.id,
        titulo: dataJson.title,
        texto: dataJson.content,
        categoria: dataJson.classCategory,
      };
      isEditing.value = true;
      showRegistrationForm.value = true;
    } catch (error) {
      toastService.show(error.message, 'danger');
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const classData = {
        id: formData.id,
        title: formData.title,
        content: formData.content,
        classCategory: formData.category,
      };
      const action = isEditing.value ? classContentService.updateClass : classContentService.registerClass;
      await action(classData);
      toastService.show(isEditing.value ? 'Aula atualizada com sucesso!' : 'Aula cadastrada com sucesso!', 'success');

      showRegistrationForm.value = false;
      isEditing.value = false;

      return true;
    } catch (error) {
      toastService.show(error.message, 'danger');
      return false;
    }
  };

  const toggleRegistrationForm = () => {
    if (!isEditing.value) aulaSelecionada.value = null;
    showRegistrationForm.value = true;
  };

  const resetForm = () => {
    showRegistrationForm.value = false;
    isEditing.value = false;
  };

  return {
    aulas,
    aulaSelecionada,
    activeTab,
    convertedContent,
    isEditing,
    showRegistrationForm,
    selecionarAula,
    carregarAulas,
    abrirJanelaEdicao,
    handleFormSubmit,
    toggleRegistrationForm,
    resetForm,
  };
}
