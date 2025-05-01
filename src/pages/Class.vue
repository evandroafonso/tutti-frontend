<template>
  <div class="min-h-screen dark:bg-gray-900">
    <MobileHeader :is-menu-open="isMobileMenuOpen" @toggle-menu="toggleMenu" />

    <div class="flex">
      <SideMenu :aulas="aulas" :aula-selecionada="aulaSelecionada" :dark-mode="darkMode" @select="selecionarAula" @toggle-dark-mode="toggleDarkMode" />

      <SideMenu v-if="isMobileMenuOpen" :aulas="aulas" :aula-selecionada="aulaSelecionada" :dark-mode="darkMode" :is-mobile="true" @select="selecionarAula" @close="toggleMenu" @toggle-dark-mode="toggleDarkMode" />

      <main class="flex-1 min-h-screen p-8 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900" v-if="aulaSelecionada">
        <div class="p-6 mt-12 mb-2 bg-white rounded-md sm:mt-0 dark:bg-gray-800">
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
            {{ aulaSelecionada?.titulo }}
          </h2>

          <div class="mb-8">
            <ul class="flex border-b border-gray-200 dark:border-gray-700">
              <li class="mr-2">
                <button @click="activeTab = 'content'" :class="tabButtonClasses('content')">
                  Conteúdo
                </button>
              </li>
              <li class="mr-2">
                <button @click="activeTab = 'comments'" :class="tabButtonClasses('comments')">
                  Comentários
                </button>
              </li>
            </ul>
            <div class="mt-4">
              <div v-if="activeTab === 'content'" class="prose dark:prose-invert max-w-none">
                <div v-html="convertedContent"></div>
                <div v-if="aulaSelecionada?.videoUrl" class="mt-6">
                  <div class="max-w-4xl mx-auto overflow-hidden rounded-lg aspect-video">
                    <iframe class="w-full h-full" :src="aulaSelecionada.videoUrl" title="Vídeo da Aula" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
              <div v-if="activeTab === 'comments'">
                <div v-for="comentario in comentarios" :key="comentario.id" class="p-4 mb-4 bg-gray-100 rounded-md shadow-sm dark:bg-gray-700">
                  <p class="font-semibold text-gray-800 dark:text-gray-200">{{ comentario.nome }}</p>
                  <p class="text-gray-600 dark:text-gray-300">{{ comentario.texto }}</p>
                </div>
                <div class="p-6 bg-gray-100 rounded-md shadow-md dark:bg-gray-700">
                  <h4 class="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Adicionar Comentário
                  </h4>
                  <form @submit.prevent="handleSubmit">
                    <div class="mb-3">
                      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        Nome:
                      </label>
                      <input type="text" v-model="novoComentario.nome" required maxlength="100" class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
                    </div>
                    <div class="mb-4">
                      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        Comentário:
                      </label>
                      <textarea v-model="novoComentario.texto" required maxlength="1000" class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600"></textarea>
                    </div>
                    <button type="submit" class="px-4 py-2 font-bold text-white transition-colors rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline dark:bg-emerald-600 dark:hover:bg-emerald-800">
                      Enviar Comentário
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <main class="flex items-center justify-center flex-1 h-screen p-8 ml-0 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900" v-else>
        <p class="text-lg text-gray-500 dark:text-gray-400">
          Selecione uma aula para ver o conteúdo.
        </p>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useDarkMode } from '../composables/useDarkMode';
import { useClassContent } from '../composables/useClassContent';
import { useComments } from '../composables/useComments';
import MobileHeader from '../components/MobileHeader.vue';
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'ClassPage',
  components: {
    MobileHeader,
    SideMenu
  },
  setup() {
    const isMobileMenuOpen = ref(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const {
      aulas,
      aulaSelecionada,
      activeTab,
      convertedContent,
      selecionarAula,
      carregarAulas
    } = useClassContent();
    const {
      comentarios,
      novoComentario,
      adicionarComentario
    } = useComments();

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    const tabButtonClasses = (tabName) => {
      return [
        'inline-block px-4 py-2 font-semibold',
        activeTab.value === tabName
          ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg',
      ];
    };

    const handleSubmit = async () => {
      try {
        await adicionarComentario();
      } catch (error) {
        alert(error.message);
      }
    };

    onMounted(async () => {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
      }

      try {
        await carregarAulas();
      } catch (error) {
        alert('Erro ao carregar aulas: ' + error.message);
      }
    });

    return {
      aulas,
      comentarios,
      novoComentario,
      aulaSelecionada,
      selecionarAula,
      isMobileMenuOpen,
      toggleMenu,
      darkMode,
      toggleDarkMode,
      convertedContent,
      activeTab,
      tabButtonClasses,
      handleSubmit
    };
  },
};
</script>
