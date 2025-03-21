<template>
  <Disclosure as="nav" class="bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="shrink-0">
          <MusicalNoteIcon class="size-8 text-emerald-500" />
        </div>

        <!-- Botão do menu para dispositivos móveis -->
        <div class="-mr-2 flex md:hidden">
          <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200">
            <span class="sr-only">Open main menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path :class="{ 'hidden': open, 'block': !open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              <path :class="{ 'block': open, 'hidden': !open }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </DisclosureButton>
        </div>

        <div class="hidden md:block">
          <div class="flex items-baseline space-x-4">
            <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-800 hover:bg-green-400 hover:text-white rounded-md px-3 py-1 text-sm font-medium">
              {{ item.name }}
            </a>
          </div>
        </div>

        <div class="hidden md:block">
          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm">
                <span class="sr-only">Open user menu</span>
                <img class="size-8 rounded-full" :src="user.imageUrl" alt="" />
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
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

    <!-- Menu Mobile -->
    <DisclosurePanel class="md:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="block text-gray-800 hover:bg-green-400 hover:text-white rounded-md px-3 py-2 text-base font-medium">
          {{ item.name }}
        </a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { MusicalNoteIcon } from '@heroicons/vue/24/solid';

defineProps({
  user: Object,
  navigation: Array,
  userNavigation: Array
});
</script>