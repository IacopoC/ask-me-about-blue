<script setup>
import { ref } from 'vue';
import { Trash2 } from "@lucide/vue";
const emit = defineEmits(['clearChat'])

const showModal = ref(false);

function clearChat() {
  showModal.value = true;
}

function confirmClearChat() {
  showModal.value = false;
  emit('clearChat');
}

function cancelClearChat() {
  showModal.value = false;
}
</script>

<template>
  <button type="button" class="clear-button" @click="clearChat">Clear Chat <Trash2 :size="18" /></button>
<Teleport to="body">
  <div v-if="showModal" class="modal-overlay" @click.self="cancelClearChat">
    <div class="modal">
      <p class="bold">Clear chat?</p>
      <p> Are you sure you want to clear the chat? This action cannot be undone. </p>
      <div class="modal-buttons"><button type="button" class="cancel-button" @click="cancelClearChat">Cancel</button>
        <button type="button" class="confirm-button" @click="confirmClearChat">Clear Chat</button>
      </div>
   </div>
    </div>
</Teleport>

</template>

<style scoped>
.clear-button {
  align-items: center;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal {
  width: min(90%, 420px);
  padding: 24px;
  background-color: #18435A;
  transition: background-color 2s 500ms;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.modal:hover {
  background-color: #13293D;
}

.modal p {
  margin: 0 0 24px;
  color: #fff;
  line-height: 1.5;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-button, .confirm-button {
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-button {
  background: #585252;
}

.confirm-button {
  background: #d33;
  color: white;
}

.cancel-button:hover, .confirm-button:hover {
  color: #000;
  background-color: #fff;
}
</style>
