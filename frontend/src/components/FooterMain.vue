<script setup>
import { ref } from 'vue';
const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <footer class="footer">
    <p>{{ currentYear }} | Ask me about Blue - Created using <a class="white-link" href="https://openai.com/it-IT/api/">Openai API</a></p>
  </footer>
</template>

<style scoped>
.white-link {
  color: white;
}

.footer {
  padding: 1% 3%
}
</style>
