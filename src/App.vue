<template>
  <div id="app">
    <router-view />
    <ToastContainer />
  </div>
</template>

<script>
import ToastContainer from './components/ToastContainer.vue'

export default {
  components: { ToastContainer },
}
</script>

<style scoped></style>