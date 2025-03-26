<template>
  <div class="flex flex-col min-h-screen dark:bg-gray-900">
    <!-- Header Mobile -->
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

    <div class="flex flex-1 pt-16 lg:pt-0">
      <!-- Sidebar -->
      <aside :class="[
        isMobileMenuOpen ? 'flex w-full' : 'hidden',
        'lg:flex lg:w-80 lg:pt-0 flex flex-col bg-white text-gray-700 transition-all duration-300',
        'h-[calc(100vh-4rem)] lg:h-screen dark:bg-gray-800 dark:text-gray-300'
      ]">
        <!-- Conteúdo da Sidebar -->
        <div class="flex-col items-center hidden w-full p-2 border-b border-gray-200 lg:flex dark:border-gray-700">
          <div class="relative flex items-center justify-center w-full">
            <MusicalNoteIcon class="hidden w-10 h-10 mx-2 text-green-600 lg:block dark:text-green-400" />
            <h1 class="text-2xl font-semibold text-gray-700 dark:text-gray-300">Tutti</h1>
          </div>
        </div>
        <ul class="flex-1 py-2 overflow-y-auto">
          <li v-for="aula in aulas" :key="aula.id" @click="selecionarAula(aula)" class="px-4 py-2 font-semibold transition duration-300 cursor-pointer" :class="{
            'bg-gray-100 dark:bg-gray-700': aulaSelecionada?.id === aula.id,
            'hover:bg-gray-100 dark:hover:bg-gray-700': true
          }">
            <span :class="aulaSelecionada?.id === aula.id
              ? 'text-green-500 dark:text-green-400'
              : 'text-gray-700 dark:text-gray-300'">
              {{ aula.titulo }}
            </span>
          </li>
        </ul>

        <!-- Footer Sidebar + Botão Dark Mode Desktop -->
        <div class="flex items-center gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
          <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <span class="font-semibold text-gray-700 dark:text-gray-300">User</span>

          <button @click="toggleDarkMode" class="ml-auto focus:outline-none" :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'">
            <SunIcon v-if="darkMode" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main v-if="aulaSelecionada" class="flex-1 h-screen p-8 overflow-y-auto bg-gray-200 border-r dark:bg-gray-900">
        <div class="p-4 mb-2 bg-white rounded-2xl dark:bg-gray-800">
          <h2 class="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-200">{{ aulaSelecionada?.titulo }}</h2>
          <p class="mb-4 text-gray-700 dark:text-gray-300">{{ aulaSelecionada?.texto }}</p>

          <div class="mb-10" v-if="aulaSelecionada?.videoUrl">
            <div class="max-w-4xl mx-auto overflow-hidden rounded-md aspect-video">
              <iframe class="w-full h-full" :src="aulaSelecionada.videoUrl" title="Vídeo da Aula" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>

          <section class="mt-8">
            <h3 class="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">Comentários</h3>
            <div v-for="comentario in comentarios" :key="comentario.id" class="p-4 mb-4 bg-gray-100 rounded-md shadow-sm dark:bg-gray-700">
              <p class="font-semibold text-gray-800 dark:text-gray-200">{{ comentario.nome }}</p>
              <p class="text-gray-600 dark:text-gray-300">{{ comentario.texto }}</p>
            </div>
            <div class="p-6 bg-gray-100 rounded-md shadow-md dark:bg-gray-700">
              <h4 class="mb-3 text-lg font-semibold text-gray-800 dark:text-gray-200">Adicionar Comentário</h4>
              <form @submit.prevent="adicionarComentario">
                <div class="mb-3">
                  <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Nome:</label>
                  <input type="text" v-model="novoComentario.nome" required class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
                </div>
                <div class="mb-4">
                  <label class="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">Comentário:</label>
                  <textarea v-model="novoComentario.texto" required class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600"></textarea>
                </div>
                <button type="submit" class="px-4 py-2 font-bold text-white transition-colors rounded bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:shadow-outline dark:bg-emerald-600 dark:hover:bg-emerald-800">
                  Enviar Comentário
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <main v-else class="flex items-center justify-center flex-1 p-8 dark:bg-gray-900">
        <p class="text-lg text-gray-500 dark:text-gray-400">Selecione uma aula para ver o conteúdo.</p>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { MusicalNoteIcon, UserCircleIcon } from '@heroicons/vue/24/solid';
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline';

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
    const darkMode = ref(false);
    const aulas = ref([
      {
        id: 1,
        titulo: 'Introdução ao Vue 3',
        texto: 'Esta aula apresenta os conceitos básicos do Vue 3.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 2,
        titulo: 'Componentes no Vue 3',
        texto: 'Aprenda a criar e usar componentes no Vue 3.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        id: 3,
        titulo: 'Diretivas e Eventos no Vue 3',
        texto: 'Explore as diretivas e eventos no Vue 3.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ]);

    const comentarios = ref([
      { id: 1, nome: 'João', texto: 'Ótima aula!' },
      { id: 2, nome: 'Maria', texto: 'Gostei muito!' },
    ]);

    const novoComentario = ref({ nome: '', texto: '' });
    const aulaSelecionada = ref(aulas.value[0]);
    const isMobileMenuOpen = ref(false);

    const selecionarAula = (aula) => {
      aulaSelecionada.value = aula;
      // Em mobile, opcionalmente fechar o menu após selecionar a aula
      isMobileMenuOpen.value = false;
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

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
    };
  },
};
</script>