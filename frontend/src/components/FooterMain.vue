<script setup>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="footer">
    <p>{{ currentYear }} - Ask me about Blue</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2% 3%
}
</style>
