<script setup>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="footer">
    <p>{{ currentYear }} - Ask me</p>
  </footer>
</template>

<style scoped>

</style>
