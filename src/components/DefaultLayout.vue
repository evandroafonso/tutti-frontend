<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-white" v-slot="{ open }">
      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              'text-neutral-700 active:bg-green-600 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="shrink-0">
              <img class="rounded-full size-10" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="font-medium text-white text-base/5">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="px-2 mt-3 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-3 py-2 text-base font-medium rounded-md text-neutral-700 hover:bg-green-500 hover:text-white"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!--header-->
    <header class="bg-white shadow-sm">
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Teste</h1>
      </div>
    </header>
    <main>
      <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, MusicalNoteIcon } from '@heroicons/vue/24/solid';
import { RouterLink, RouterView } from 'vue-router';
import useUserStore from '../store/user';
import { computed } from 'vue';

const userStore = useUserStore();

const user = computed(() => userStore.user);

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Menu Principal', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];
const userNavigation = [
  { name: 'Seu Perfil', href: '#' },
  { name: 'Sair', href: '#' },
];
</script>

<style scoped></style>
