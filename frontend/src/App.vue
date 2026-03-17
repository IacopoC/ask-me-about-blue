<script setup>
import { RouterView } from 'vue-router'
import HeaderMain from './components/HeaderMain.vue'
import FooterMain from './components/FooterMain.vue'
</script>

<template>
  <div class="left-sidebar-grid">
<HeaderMain/>
  <RouterView />
    <FooterMain/>
  </div>
</template>

<style scoped>
</style>
