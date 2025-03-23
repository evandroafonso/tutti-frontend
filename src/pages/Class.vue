<template>
  <div class="bg-white min-h-screen flex flex-col">
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar: visível no desktop (lg) e controlada via botão fixo no mobile -->
      <aside :class="[isMobileMenuOpen ? 'flex' : 'hidden lg:flex', 'w-80 bg-white text-gray-700 flex-col h-screen transition-all duration-300']">
        <!-- Header (Menu) -->
        <div class="p-4 flex flex-col items-center w-full">
          <div class="flex items-center w-full relative">
            <MusicalNoteIcon class="size-10 text-green-600 mx-auto" />
          </div>
          <h1 class="text-2xl font-bold text-green-400 self-start mt-2">Aulas</h1>
        </div>

        <!-- Menu de Aulas -->
        <ul class="py-2 flex-1 overflow-y-auto">
          <li v-for="aula in aulas" :key="aula.id" @click="selecionarAula(aula)" class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-300 font-semibold">
            <span :class="aulaSelecionada?.id === aula.id ? 'text-green-500' : 'text-gray-700'">
              {{ aula.titulo }}
            </span>
          </li>
        </ul>

        <!-- Footer (Informações do Usuário) -->
        <div class="p-4 border-t border-gray-200 flex items-center gap-3">
          <UserCircleIcon class="size-8 text-gray-600 mb-2" />
          <span class="text-gray-700 font-semibold">User</span>
        </div>
      </aside>

      <!-- Botão de toggle fixo na lateral esquerda para mobile (mesmo posicionamento em ambos os estados) -->
      <div class="lg:hidden fixed left-0 top-1/2 transform -translate-y-1/2 z-10">
        <button @click="toggleMenu" class="p-2 rounded-full shadow-md bg-white bg-opacity-75">
          <template v-if="isMobileMenuOpen">
            <!-- Quando a aba está aberta, seta apontando para a esquerda -->
            <ArrowLeftIcon class="w-5 h-5 text-gray-500 opacity-75" />
          </template>
          <template v-else>
            <!-- Quando a aba está fechada, seta apontando para a direita -->
            <ArrowRightIcon class="w-5 h-5 text-gray-500 opacity-75" />
          </template>
        </button>
      </div>

      <!-- Conteúdo Principal -->
      <main v-if="aulaSelecionada" class="bg-gray-100 border-r flex-1 p-8 overflow-y-auto h-screen">
        <div class="bg-white p-4 mb-2 rounded-2xl">
          <h2 class="text-3xl font-bold mb-4 text-gray-800">{{ aulaSelecionada?.titulo }}</h2>
          <p class="text-gray-700 mb-4">{{ aulaSelecionada?.texto }}</p>

          <div class="mb-10" v-if="aulaSelecionada?.videoUrl">
            <div class="max-w-4xl mx-auto aspect-video rounded-md overflow-hidden">
              <iframe class="w-full h-full" :src="aulaSelecionada.videoUrl" title="Vídeo da Aula" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
          </div>

          <section class="mt-8">
            <h3 class="text-2xl font-semibold mb-4 text-gray-800">Comentários</h3>
            <div v-for="comentario in comentarios" :key="comentario.id" class="mb-4 p-4 bg-white rounded-md shadow-sm">
              <p class="font-semibold text-gray-800">{{ comentario.nome }}</p>
              <p class="text-gray-600">{{ comentario.texto }}</p>
            </div>
            <div class="bg-white p-6 rounded-md shadow-md">
              <h4 class="text-lg font-semibold mb-3 text-gray-800">Adicionar Comentário</h4>
              <form @submit.prevent="adicionarComentario">
                <div class="mb-3">
                  <label for="nome" class="block text-gray-700 text-sm font-bold mb-2">Nome:</label>
                  <input type="text" id="nome" v-model="novoComentario.nome" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div class="mb-4">
                  <label for="comentario" class="block text-gray-700 text-sm font-bold mb-2">Comentário:</label>
                  <textarea id="comentario" v-model="novoComentario.texto" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
                </div>
                <button type="submit" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">
                  Enviar Comentário
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>

      <main v-else class="flex-1 p-8 flex items-center justify-center">
        <p class="text-gray-500 text-lg">Selecione uma aula para ver o conteúdo.</p>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { Disclosure } from '@headlessui/vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';
import { UserCircleIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/outline';

export default {
  components: {
    Disclosure,
    MusicalNoteIcon,
    UserCircleIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  setup() {
    const user = ref({
      name: 'Usuário',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });

    const navigation = ref([
      { name: 'Início', href: '#' },
      { name: 'Aulas', href: '#' },
      { name: 'Exercícios', href: '#' },
      { name: 'Progresso', href: '#' },
    ]);

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
      // Opcional: fecha o menu em mobile após selecionar uma aula
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

    const toggleMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value;
    };

    return {
      user,
      navigation,
      aulas,
      comentarios,
      novoComentario,
      aulaSelecionada,
      selecionarAula,
      adicionarComentario,
      isMobileMenuOpen,
      toggleMenu,
    };
  },
};
</script>
