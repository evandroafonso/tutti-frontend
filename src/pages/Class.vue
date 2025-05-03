<template>
  <div class="min-h-screen dark:bg-gray-900">
    <MobileHeader :is-menu-open="isMobileMenuOpen" @toggle-menu="toggleMenu" />
    <SideMenu
      :aulas="aulas"
      :aula-selecionada="aulaSelecionada"
      :dark-mode="darkMode"
      :is-mobile="true"
      v-if="isMobileMenuOpen"
      @select="selecionarAula"
      @close="toggleMenu"
      @toggle-dark-mode="toggleDarkMode"
    />
    <div class="flex">
      <SideMenu :aulas="aulas" :aula-selecionada="aulaSelecionada" :dark-mode="darkMode" @select="selecionarAula" @toggle-dark-mode="toggleDarkMode" />
      <main class="flex-1 min-h-screen p-8 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900" v-if="aulaSelecionada">
        <div class="p-6 mt-12 mb-2 bg-white rounded-md sm:mt-0 dark:bg-gray-800">
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">
            {{ aulaSelecionada.titulo }}
          </h2>
          <ul class="flex mb-4 border-b border-gray-200 dark:border-gray-700">
            <li class="mr-2">
              <TabButton :is-active="activeTab === 'content'" @click="activeTab = 'content'"> Conteúdo </TabButton>
            </li>
            <li class="mr-2">
              <TabButton :is-active="activeTab === 'comments'" @click="activeTab = 'comments'"> Comentários </TabButton>
            </li>
          </ul>
          <div v-if="activeTab === 'content'" class="prose dark:prose-invert max-w-none">
            <div v-html="convertedContent"></div>
            <div v-if="aulaSelecionada.videoUrl" class="mt-6">
              <div class="max-w-4xl mx-auto overflow-hidden rounded-lg aspect-video">
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
          <CommentsSection v-if="activeTab === 'comments'" :comentarios="comentarios" @add-comment="adicionarComentario" />
        </div>
      </main>
      <main v-else class="flex items-center justify-center flex-1 h-screen p-8 ml-0 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900">
        <p class="text-lg text-gray-500 dark:text-gray-400">Selecione uma aula para ver o conteúdo.</p>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useDarkMode } from '../composables/useDarkMode';
import { useClassContent } from '../composables/useClassContent';
import { useComments } from '../composables/useComments';
import MobileHeader from '../components/MobileHeader.vue';
import SideMenu from '../components/SideMenu.vue';
import TabButton from '../components/TabButton.vue';
import CommentsSection from '../components/CommentsSection.vue';

export default {
  components: { MobileHeader, SideMenu, TabButton, CommentsSection },
  setup() {
    const isMobileMenuOpen = ref(false);
    const toggleMenu = () => (isMobileMenuOpen.value = !isMobileMenuOpen.value);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const { aulas, aulaSelecionada, activeTab, convertedContent, selecionarAula, carregarAulas } = useClassContent();

    const { comentarios, adicionarComentario } = useComments();

    const selecionarAulaComMenuFechado = (aula) => {
      selecionarAula(aula);
      console.log('Aula selecionada:', aula);
      localStorage.setItem('aulaSelecionadaId', aula.titulo);
      toggleMenu();
    };

    onMounted(async () => {
      await carregarAulas();

      const tituloAula = localStorage.getItem('aulaSelecionadaId');
      if (!tituloAula) return;

      const aula = aulas.value.find((aula) => aula.titulo.trim() === tituloAula.trim());
      if (aula) {
        selecionarAula(aula);
      }
    });

    return {
      aulas,
      comentarios,
      aulaSelecionada,
      selecionarAula: selecionarAulaComMenuFechado,
      isMobileMenuOpen,
      toggleMenu,
      darkMode,
      toggleDarkMode,
      convertedContent,
      activeTab,
      adicionarComentario,
    };
  },
};
</script>
