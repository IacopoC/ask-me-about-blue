<script setup>
import { RouterView } from 'vue-router'
import HeaderMain from './components/HeaderMain.vue'
</script>

<template>
  <div class="left-sidebar-grid">
<HeaderMain/>
  <RouterView />
  </div>
</template>

<style scoped>
</style>
