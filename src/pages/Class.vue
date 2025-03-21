<template>
  <div class="bg-gray-100 min-h-screen flex flex-col">
    <Disclosure as="nav" class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="shrink-0">
            <MusicalNoteIcon class="size-8 text-emerald-500" />
          </div>
          <div class="hidden md:block">
            <div class="flex items-baseline space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-700 hover:bg-emerald-400 hover:text-white rounded-md px-3 py-1 text-sm font-medium transition-colors">
                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <div class="flex flex-1 overflow-hidden">
      <aside class="w-64 bg-white text-gray-700">
        <div class="p-4">
          <h1 class="text-2xl font-bold">Aulas</h1>
        </div>
        <ul class="py-2">
          <li v-for="aula in aulas" :key="aula.id" @click="selecionarAula(aula)" class="px-4 py-2 cursor-pointer hover:bg-gray-100 transition duration-300 font-semibold">
            <span :style="{ color: aulaSelecionada?.id === aula.id ? 'green' : 'black' }">
              {{ aula.titulo }}
            </span>
          </li>
        </ul>
      </aside>

      <!-- Adicionando overflow-y-auto para permitir scroll -->
      <main v-if="aulaSelecionada" class="flex-1 p-8 overflow-y-auto h-screen">
        <h2 class="text-3xl font-bold mb-4 text-gray-800">{{ aulaSelecionada?.titulo }}</h2>
        <p class="text-gray-700 mb-4">{{ aulaSelecionada?.texto }}</p>

        <div class="mb-6" v-if="aulaSelecionada?.videoUrl">
          <iframe width="100%" height="315" :src="aulaSelecionada?.videoUrl" title="Vídeo da Aula" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
                <input type="text" id="nome" v-model="novoComentario.nome" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              </div>
              <div class="mb-4">
                <label for="comentario" class="block text-gray-700 text-sm font-bold mb-2">Comentário:</label>
                <textarea id="comentario" v-model="novoComentario.texto" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
              </div>
              <button type="submit" class="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors">Enviar Comentário</button>
            </form>
          </div>
        </section>
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

export default {
  components: {
    Disclosure,
    MusicalNoteIcon,
  },
  setup() {
    const user = ref({
      name: 'Usuário',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    });

    const navigation = ref([
      { name: 'Início', href: '#' },
      { name: 'Aulas', href: '#' },
      { name: 'Exercícios', href: '#' },
      { name: 'Progresso', href: '#' },
    ]);

    const aulas = ref([
      { id: 1, titulo: 'Introdução ao Vue 3', texto: 'Esta aula apresenta os conceitos básicos do Vue 3.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 2, titulo: 'Componentes no Vue 3', texto: 'Aprenda a criar e usar componentes no Vue 3.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
      { id: 3, titulo: 'Diretivas e Eventos no Vue 3', texto: 'Explore as diretivas e eventos no Vue 3.', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    ]);

    const comentarios = ref([
      { id: 1, nome: 'João', texto: 'Ótima aula!' },
      { id: 2, nome: 'Maria', texto: 'Gostei muito!' },
    ]);

    const novoComentario = ref({ nome: '', texto: '' });
    const aulaSelecionada = ref(null);

    const selecionarAula = (aula) => {
      aulaSelecionada.value = aula;
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

    return {
      user,
      navigation,
      aulas,
      comentarios,
      novoComentario,
      aulaSelecionada,
      selecionarAula,
      adicionarComentario,
    };
  },
};
</script>
