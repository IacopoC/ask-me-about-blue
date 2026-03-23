<script setup>
import ChatMessageClear from "@/components/ChatMessageClear.vue";
import { ref, watch, onMounted } from "vue";

const messages = ref([]);
const messagesInput = ref("");
const loading = ref(false);
const inputRef = ref(null);

onMounted(() => {
  const chatSaved = localStorage.getItem("chatMessages");
  if (chatSaved) {
    messages.value = JSON.parse(chatSaved);
  }
});

async function handleSubmit() {
  if (!messagesInput.value.trim()) return;

  messages.value.push({
    role: "user",
    content: messagesInput.value,
  });

  loading.value = true;

  const response = await fetch('api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: messages.value,
    }),
  });

  const data = await response.json();

  messages.value.push(data.reply);

  messagesInput.value = '';
  loading.value = false;
  inputRef.value.focus();
}

watch(messages, (newMessages) => {
  localStorage.setItem("chatMessages", JSON.stringify(newMessages));
}, { deep:true });
</script>

<template>
  <div class="chat-container">
  <h1 class="title-page">Chat Message</h1>
  <div class="answer-wrapper">
  <div v-for="(message, index) in messages" :key="index">
    <p>{{ message.role }}: {{ message.content }}</p>
  </div>
  <p v-if="loading">I'm thinking...</p>
  </div>
  <form class="chat-input" @submit.prevent="handleSubmit">
  <input type="text" id="chat-message" ref="inputRef" v-model="messagesInput" name="message" size="50" placeholder="Write a message...">
  <button type="submit" class="submit-button" :disabled="loading">Send</button>
  </form>
  <ChatMessageClear />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.title-page {
  padding: 0 0 10px 0;
}

.answer-wrapper {
  min-height: 0;
  overflow-y: auto;
  flex: 1;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex: 1;
}

#chat-message {
  padding: 4px;
}

.submit-button {
  padding: 10px;
}

</style>
