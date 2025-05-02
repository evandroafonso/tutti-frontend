<template>
  <div class="min-h-screen dark:bg-gray-900">
    <MobileHeader :is-menu-open="isMobileMenuOpen" @toggle-menu="toggleMenu" />
    <SideMenu
      v-if="isMobileMenuOpen"
      :aulas="aulas"
      :aula-selecionada="aulaSelecionada"
      :dark-mode="darkMode"
      :is-mobile="true"
      @select="selecionarAula"
      @close="toggleMenu"
      @toggle-dark-mode="toggleDarkMode"
    />
    <div class="flex">
      <SideMenu
        :aulas="aulas"
        :aula-selecionada="aulaSelecionada"
        :dark-mode="darkMode"
        @select="selecionarAula"
        @toggle-dark-mode="toggleDarkMode"
      />
      <SideMenu
        v-if="isMobileMenuOpen"
        :aulas="aulas"
        :aula-selecionada="aulaSelecionada"
        :dark-mode="darkMode"
        :is-mobile="true"
        @select="selecionarAula"
        @close="toggleMenu"
        @toggle-dark-mode="toggleDarkMode"
      />
      <main
        class="flex-1 min-h-screen p-8 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900"
        v-if="aulaSelecionada"
      >
        <div
          class="p-6 mt-12 mb-2 bg-white rounded-md sm:mt-0 dark:bg-gray-800"
        >
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
            {{ aulaSelecionada?.titulo }}
          </h2>

          <div class="mb-8">
            <ul class="flex border-b border-gray-200 dark:border-gray-700">
              <li class="mr-2">
                <TabButton
                  :is-active="activeTab === 'content'"
                  @click="activeTab = 'content'"
                >
                  Conteúdo
                </TabButton>
              </li>
              <li class="mr-2">
                <TabButton
                  :is-active="activeTab === 'comments'"
                  @click="activeTab = 'comments'"
                >
                  Comentários
                </TabButton>
              </li>
            </ul>
            <div class="mt-4">
              <div
                v-if="activeTab === 'content'"
                class="prose dark:prose-invert max-w-none"
              >
                <div v-html="convertedContent"></div>
                <div v-if="aulaSelecionada?.videoUrl" class="mt-6">
                  <div
                    class="max-w-4xl mx-auto overflow-hidden rounded-lg aspect-video"
                  >
                    <iframe
                      class="w-full h-full"
                      :src="aulaSelecionada.videoUrl"
                      title="Vídeo da Aula"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
              <div v-if="activeTab === 'comments'">
                <CommentsSection
                  :comentarios="comentarios"
                  @add-comment="adicionarComentario"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <main
        class="flex items-center justify-center flex-1 h-screen p-8 ml-0 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900"
        v-else
      >
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
import TabButton from '../components/TabButton.vue';
import CommentsSection from '../components/CommentsSection.vue';

export default {
  name: 'ClassPage',
  components: {
    MobileHeader,
    SideMenu,
    TabButton,
    CommentsSection,
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
      carregarAulas,
    } = useClassContent();
    const { comentarios, novoComentario, adicionarComentario } = useComments();

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
      handleSubmit,
    };
  },
};
</script>
