<script setup>
import { ref } from "vue";

const messages = ref([]);
function clearChat() {
  if(!confirm("Are you sure?")) return;

  messages.value = [];
  localStorage.removeItem("chatMessages");
}
</script>

<template>
  <button type="button" class="clear-button" @click="clearChat">Clear Chat</button>
</template>

<style scoped>

</style>
