<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="shrink-0">
            <MusicalNoteIcon class="size-8 text-emerald-500" />
          </div>
          <div class="flex items-center ml-auto">
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[
                  'text-gray-800 hover:bg-green-400 hover:text-white',
                  'active:bg-green-600',
                  'rounded-md px-3 py-1 text-sm font-medium'
                ]" :aria-current="item.current ? 'page' : undefined">
                  {{ item.name }}
                </a>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                    <span class="absolute -inset-1.5" />
                    <span class="sr-only">Open user menu</span>
                    <img class="size-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                  <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                      {{ item.name }}
                    </a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Aulas</h1>
      </div>
    </header>
    <main class="flex max-w-2xl">
      <aside class="w-1/4  bg-gray-200 p-4">
        <ul>
          <li v-for="lesson in lessons" :key="lesson.id" @click="selectedLesson = lesson" class="cursor-pointer p-2 hover:bg-gray-300">
            {{ lesson.title }}
          </li>
        </ul>
      </aside>
      <section class="w-3/4 p-4">
        <h2 v-if="selectedLesson" class="text-xl font-bold">{{ selectedLesson.title }}</h2>
        <p v-if="selectedLesson">{{ selectedLesson.content }}</p>
        <div v-if="selectedLesson" class="mt-4">
          <h3 class="text-lg font-semibold">Comentários</h3>
          <textarea v-model="newComment" class="w-full border p-2" placeholder="Adicione um comentário..."></textarea>
          <button @click="addComment" class="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
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
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';

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