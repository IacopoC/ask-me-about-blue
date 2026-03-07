<script setup>
import { ref, watch, onMounted } from "vue";

const messages = ref([]);
const messagesInput = ref("");
const loading = ref(false);

onMounted(() => {
  const chatSaved = localStorage.getItem("chatMessages");
  if (chatSaved) {
    messages.value = JSON.parse(chatSaved);
  }
});

async function handleSubmit() {
  if (!messagesInput.value) return;

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
}

watch(messages, (newMessages) => {
  localStorage.setItem("chatMessages", JSON.stringify(newMessages));
}, { deep:true });
</script>

<template>
  <h3>Chat Message</h3>
  <div v-for="(message, index) in messages" :key="index">
    <p>{{ message.role }}: {{ message.content }}</p>
  </div>
  <p v-if="loading">I'm thinking...</p>
  <form @submit.prevent="handleSubmit">
  <input type="text" id="chat-message" v-model="messagesInput" name="message" placeholder="Write a message...">
  <button type="submit" :disabled="loading">Send</button>
  </form>
</template>
