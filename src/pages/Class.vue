<template>
  <div class="min-h-screen dark:bg-gray-900">
    <header class="fixed top-0 left-0 right-0 z-20 p-4 bg-white shadow lg:hidden dark:bg-gray-800">
      <div class="relative flex items-center justify-center gap-2">
        <button @click="toggleMenu" class="absolute left-4 focus:outline-none" :aria-label="isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'">
          <template v-if="isMobileMenuOpen">
            <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
          <template v-else>
            <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
        </button>
        <MusicalNoteIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti</h1>
      </div>
    </header>

    <div class="flex">
      <aside class="fixed top-0 left-0 flex-col hidden h-screen text-gray-700 bg-white border-r border-gray-200 lg:flex w-80 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
        <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <MusicalNoteIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
          <h1 class="ml-2 text-2xl font-semibold">Tutti</h1>
        </div>
        <ul class="flex-1 py-2 overflow-y-auto">
          <li v-for="aula in aulas" :key="aula.titulo" @click="selecionarAula(aula)" class="px-4 py-2 font-semibold transition duration-300 cursor-pointer" :class="{
            'bg-gray-100 dark:bg-gray-700': aulaSelecionada?.titulo === aula.titulo,
            'hover:bg-gray-100 dark:hover:bg-gray-700': true
          }">
            <span :class="aulaSelecionada?.titulo === aula.titulo
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'">
              {{ aula.titulo }}
            </span>
          </li>
        </ul>
        <div class="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
          <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <span class="ml-2 font-semibold">User</span>
          <button @click="toggleDarkMode" class="ml-auto focus:outline-none" :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <SunIcon v-if="darkMode" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </aside>

      <aside v-if="isMobileMenuOpen" class="fixed inset-0 z-30 flex flex-col bg-white lg:hidden dark:bg-gray-800">
        <div class="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <MusicalNoteIcon class="w-10 h-10 text-green-600 dark:text-green-400" />
          <h1 class="ml-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti</h1>
          <button @click="toggleMenu" class="ml-auto focus:outline-none" aria-label="Fechar menu">
            <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <ul class="flex-1 py-2 overflow-y-auto">
          <li v-for="aula in aulas" :key="aula.titulo" @click="selecionarAula(aula)" class="px-4 py-2 font-semibold transition duration-300 cursor-pointer" :class="{
            'bg-gray-100 dark:bg-gray-700': aulaSelecionada?.titulo === aula.titulo,
            'hover:bg-gray-100 dark:hover:bg-gray-700': true
          }">
            <span :class="aulaSelecionada?.titulo === aula.titulo
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'">
              {{ aula.titulo }}
            </span>
          </li>
        </ul>
        <div class="flex items-center p-4 border-t border-gray-200 dark:border-gray-700">
          <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <span class="ml-2 font-semibold text-gray-700 dark:text-gray-300">User</span>
          <button @click="toggleDarkMode" class="ml-auto focus:outline-none" :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <SunIcon v-if="darkMode" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </aside>

      <main class="flex-1 h-screen p-8 ml-0 overflow-y-auto bg-gray-200 lg:ml-80 dark:bg-gray-900" v-if="aulaSelecionada">
        <div class="p-6 mt-10 mb-2 bg-white rounded-md dark:bg-gray-800">
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
                    <iframe class="w-full h-full" :src="aulaSelecionada.videoUrl" title="Vídeo da Aula" frameborder="0" allowfullscreen></iframe>
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
                  <form @submit.prevent="adicionarComentario">
                    <div class="mb-3">
                      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        Nome:
                      </label>
                      <input type="text" v-model="novoComentario.nome" required class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
                    </div>
                    <div class="mb-4">
                      <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                        Comentário:
                      </label>
                      <textarea v-model="novoComentario.texto" required class="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600"></textarea>
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
import { ref, computed, onMounted } from 'vue';
import { MusicalNoteIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { useDarkMode } from '../composables/useDarkMode';
import classContentService from '../services/classContentService';
import { marked } from 'marked';
import DOMPurify from 'dompurify';


export default {
  components: {
    MusicalNoteIcon,
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    SunIcon,
    MoonIcon,
  },
  setup() {
    // Configuração do marked
    marked.setOptions({
      gfm: true,
      breaks: true,
    });

    const aulas = ref([]);
    const comentarios = ref([
      { id: 1, nome: 'João', texto: 'Ótima aula!' },
      { id: 2, nome: 'Maria', texto: 'Gostei muito!' },
    ]);
    const novoComentario = ref({ nome: '', texto: '' });
    const aulaSelecionada = ref(null);
    const isMobileMenuOpen = ref(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const activeTab = ref('content'); // 'content' ou 'comments'

    // Conteúdo convertido de Markdown
    const convertedContent = computed(() => {
      if (aulaSelecionada.value?.texto) {
        return DOMPurify.sanitize(marked.parse(aulaSelecionada.value.texto));
      }
      return '';
    });

    const selecionarAula = (aula) => {
      aulaSelecionada.value = aula;
      isMobileMenuOpen.value = false;
      activeTab.value = 'content'; // Reset to the 'content' tab when selecting a new class
    };

    const adicionarComentario = () => {
      if (novoComentario.value.nome.trim() && novoComentario.value.texto.trim()) {
        comentarios.value.push({
          id: comentarios.value.length + 1,
          nome: novoComentario.value.nome,
          texto: novoComentario.value.texto,
        });
        novoComentario.value = { nome: '', texto: '' };
      } else {
        alert('Por favor, preencha nome e comentário!');
      }
    };

    onMounted(async () => {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
      }

      try {
        const aulasData = await classContentService.fetchClasses();
        aulas.value = aulasData.map(aula => ({
          titulo: aula.title,
          texto: aula.content,
          videoUrl: aula.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
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
        alert('Erro ao carregar aulas: ' + error.message);
      }
    });

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    // Refatora os estilos do botão da tab para evitar repetição
    const tabButtonClasses = (tabName) => {
      return [
        'inline-block px-4 py-2 font-semibold',
        activeTab === tabName
          ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400 dark:border-green-400'
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
        'hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg',
      ];
    };

    return {
      aulas,
      comentarios,
      novoComentario,
      aulaSelecionada,
      selecionarAula,
      adicionarComentario,
      isMobileMenuOpen,
      toggleMenu,
      darkMode,
      toggleDarkMode,
      convertedContent,
      activeTab,
      tabButtonClasses // Adiciona a função ao objeto retornado
    };
  },
};
</script>
