<script setup>
import ChatMessageClear from "@/components/ChatMessageClear.vue";
import { sendMessage } from "@/services/chatApi.js";
import { ref, watch, onMounted, nextTick } from "vue";
import { WavesHorizontal } from "@lucide/vue";
import { Send } from "@lucide/vue";

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
  const content = messagesInput.value.trim();

  if (!content || loading.value) return;

  messages.value.push({
    id: crypto.randomUUID(),
    role: "user",
    content,
  });

  messagesInput.value = '';
  loading.value = true;

  try {
    const reply = await sendMessage(messages.value);
    messages.value.push(reply);

  } catch (error) {
    console.error("Error sending message:", error);

    messages.value.push({
      role: "assistant",
      content: "Sorry, something went wrong.",
      colors: [],
    });

   } finally {
     loading.value = false;
     inputRef.value?.focus();
  }
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
  <h2 v-if="messages.length === 0" class="title-page">How can I help you? I know everything about blue... <WavesHorizontal /> </h2>
  <div class="chat-wrapper" ref="chatWrapper">
  <div v-for="message in messages" :key="message.id" :class="[ 'message', message.role ]">
    <div class="bubble">
      {{ message.content }}
    </div>
    <div class="color-palette">
    <div v-for="color in message.colors" :key="color.hex" class="color-item">
      <div class="color-swatch" :style="{ backgroundColor: color.hex }"></div>
      <span>{{ color.name }}</span>
      <code>{{ color.hex }}</code>
    </div>
      </div>
  </div>
  <p v-if="loading" class="thinking">I'm thinking...(it may take a while, cold start!)</p>
  </div>
  <form class="chat-input" @submit.prevent="handleSubmit">
  <input type="text" id="chat-message" ref="inputRef" v-model="messagesInput" name="message" placeholder="Write something about blue...">
  <button type="submit" class="submit-button" :disabled="loading">Send <Send :size="22"/></button>
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

.thinking {
  animation: thinking-pulse 1.8s ease-in-out infinite;
}

@keyframes thinking-pulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

.color-palette {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 10px;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.color-item code {
  font-size: 12px;
  color: blue;
  padding: 8px;
  background-color: white;
  border-radius: 25px;
}
</style>
