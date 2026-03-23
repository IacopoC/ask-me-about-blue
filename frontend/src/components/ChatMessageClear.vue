<script setup>
const emit = defineEmits(['clearChat'])

function clearChat() {
  if (!confirm("Are you sure?")) return;
  emit('clearChat')
}
</script>

<template>
  <button type="button" class="clear-button" @click="clearChat">Clear Chat</button>
</template>

<style scoped>
</style>
