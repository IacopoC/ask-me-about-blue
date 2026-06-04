<script setup>
import ChatMessageClear from "@/components/ChatMessageClear.vue";
import { ref, watch, onMounted, nextTick } from "vue";

const messages = ref([]);
const messagesInput = ref("");
const loading = ref(false);
const inputRef = ref(null);
const chatWrapper = ref(null);

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

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const response = await fetch(`${API_URL}/api/chat`, {
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
}, { deep: true });

watch(messages, async () => {
  await nextTick();
  if (chatWrapper.value) {
    chatWrapper.value.scrollTop = chatWrapper.value.scrollHeight;
  }
}, { deep: true });

function handleClearChat() {
  messages.value = [];
  localStorage.removeItem("chatMessages");
}
</script>

<template>
  <div class="chat-container">
  <h2 v-if="messages.length === 0" class="title-page">How can I help you? I know everything about blue... </h2>
  <div class="chat-wrapper" ref="chatWrapper">
  <div v-for="(message, index) in messages" :key="index" :class="[ 'message', message.role ]">
    <div class="bubble">
      {{ message.content }}
    </div>
  </div>
  <p v-if="loading">I'm thinking...(it may take a while, cold start!)</p>
  </div>
  <form class="chat-input" @submit.prevent="handleSubmit">
  <input type="text" id="chat-message" ref="inputRef" v-model="messagesInput" name="message" placeholder="Write something about blue...">
  <button type="submit" class="submit-button" :disabled="loading">Send</button>
  </form>
    <ChatMessageClear @clearChat="handleClearChat" />
  </div>
</template>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.chat-wrapper {
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

.message {
  display: flex;
  margin: 6px 0;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.user .bubble {
  background-color: #00336d;
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .bubble {
  background-color: #2c3e50;
  color: white;
  border-bottom-left-radius: 4px;
}
</style>
