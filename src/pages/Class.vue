<template>
  <div class="min-h-screen flex flex-col dark:bg-gray-900">
    <!-- Header Mobile -->
    <header class="fixed top-0 left-0 right-0 z-20 bg-white shadow p-4 lg:hidden dark:bg-gray-800">
      <div class="gap-2 relative flex items-center justify-center">
        <button @click="toggleMenu" class="absolute left-4 focus:outline-none">
          <template v-if="isMobileMenuOpen">
            <XMarkIcon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
          <template v-else>
            <Bars3Icon class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </template>
        </button>
        <MusicalNoteIcon class="w-8 h-8 text-green-600 dark:text-green-400" />
        <h1 class="text-2xl text-gray-700 font-semibold dark:text-gray-300">Tutti</h1>
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
        <div class="hidden lg:flex p-2 flex-col items-center w-full border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-center w-full relative">
            <MusicalNoteIcon class="w-10 h-10 text-green-600 mx-2 hidden lg:block dark:text-green-400" />
            <h1 class="text-2xl text-gray-700 font-semibold dark:text-gray-300">Tutti</h1>
          </div>
        </div>
        <ul class="py-2 flex-1 overflow-y-auto">
          <li v-for="aula in aulas" :key="aula.id" @click="selecionarAula(aula)" class="px-4 py-2 cursor-pointer transition duration-300 font-semibold" :class="{
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
        <div class="p-4 border-t border-gray-200 flex items-center gap-3 dark:border-gray-700">
          <UserCircleIcon class="w-8 h-8 text-gray-600 dark:text-gray-300" />
          <span class="text-gray-700 font-semibold dark:text-gray-300">User</span>
          <button @click="toggleDarkMode" class="ml-auto focus:outline-none">
            <SunIcon v-if="darkMode" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <MoonIcon v-else class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </aside>

      <!-- Conteúdo Principal -->
      <main v-if="aulaSelecionada" class="bg-gray-200 border-r flex-1 p-8 overflow-y-auto h-screen dark:bg-gray-900">
        <div class="bg-white p-4 mb-2 rounded-2xl dark:bg-gray-800">
          <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{{ aulaSelecionada?.titulo }}</h2>
          <p class="text-gray-700 mb-4 dark:text-gray-300">{{ aulaSelecionada?.texto }}</p>

          <div class="mb-10" v-if="aulaSelecionada?.videoUrl">
            <div class="max-w-4xl mx-auto aspect-video rounded-md overflow-hidden">
              <iframe class="w-full h-full" :src="aulaSelecionada.videoUrl" title="Vídeo da Aula" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>

          <section class="mt-8">
            <h3 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Comentários</h3>
            <div v-for="comentario in comentarios" :key="comentario.id" class="mb-4 p-4 bg-gray-100 rounded-md shadow-sm dark:bg-gray-700">
              <p class="font-semibold text-gray-800 dark:text-gray-200">{{ comentario.nome }}</p>
              <p class="text-gray-600 dark:text-gray-300">{{ comentario.texto }}</p>
            </div>
            <div class="bg-gray-100 p-6 rounded-md shadow-md dark:bg-gray-700">
              <h4 class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Adicionar Comentário</h4>
              <form @submit.prevent="adicionarComentario">
                <div class="mb-3">
                  <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Nome:</label>
                  <input type="text" v-model="novoComentario.nome" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600" />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Comentário:</label>
                  <textarea v-model="novoComentario.texto" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600"></textarea>
                </div>
                <button type="submit" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors dark:bg-emerald-600 dark:hover:bg-emerald-800">
                  Enviar Comentário
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <main v-else class="flex-1 p-8 flex items-center justify-center dark:bg-gray-900">
        <p class="text-gray-500 text-lg dark:text-gray-400">Selecione uma aula para ver o conteúdo.</p>
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
    const aulaSelecionada = ref(null);
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