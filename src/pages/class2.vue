<template>
  <div class="min-h-full">
    <!--header-->
    <DefaultHeader :user="user" :navigation="navigation" :userNavigation="userNavigation" />

    <!--título da página-->
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Aulas</h1>
      </div>
    </header>

    <main class="flex mx-auto h-screen">
      <!--menu lateral-->
      <aside class="w-64 bg-white p-4">
        <h2 class="text-gray-800 text-lg font-semibold mb-4">Aulas</h2>
        <ul class="space-y-2">
          <li v-for="lesson in lessons" :key="lesson.id" @click="selectedLesson = lesson" class="cursor-pointer font-medium p-2 hover:text-green-600 text-gray-800">
            {{ lesson.title }}
          </li>
        </ul>
      </aside>

      <!--conteúdo das aulas-->
      <section class="flex-1 p-6 overflow-y-auto">
        <h2 v-if="selectedLesson" class="text-xl font-bold mb-2">{{ selectedLesson.title }}</h2>
        <p v-if="selectedLesson">{{ selectedLesson.content }}</p>
        <div v-if="selectedLesson" class="mt-4">
          <h3 class="text-lg font-semibold">Comentários</h3>
          <textarea v-model="newComment" class="w-full border p-2" placeholder="Adicione um comentário..."></textarea>
          <button @click="addComment" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">Enviar</button>
          <ul class="mt-4">
            <li v-for="(comment, index) in selectedLesson.comments" :key="index" class="border-b py-2">
              {{ comment }}
            </li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import DefaultHeader from '../components/HeaderDefault.vue';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Menu Principal', href: '#', current: false },
  { name: 'Reports', href: '#', current: false }
];

const userNavigation = [
  { name: 'Seu Perfil', href: '#' },
  { name: 'Sair', href: '#' }
];

const lessons = ref([
  { id: 1, title: 'Aula 1', content: 'Conteúdo da Aula 1', comments: [] },
  { id: 2, title: 'Aula 2', content: 'Conteúdo da Aula 2', comments: [] }
]);
const selectedLesson = ref(null);
const newComment = ref('');

const addComment = () => {
  if (selectedLesson.value && newComment.value) {
    selectedLesson.value.comments.push(newComment.value);
    newComment.value = '';
  }
};
</script>

<style scoped></style>