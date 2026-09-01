<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { House } from "@lucide/vue";
import { MessageCircleQuestionMark } from "@lucide/vue";

const isItalic = ref(false);
let interval;

onMounted(() => {
  setInterval(() => {
    isItalic.value = !isItalic.value;
  }, 1000)
})

onMounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <header class="header">
    <h1 class="title-site">Ask me about <span :class="{ italic: isItalic }">Blue</span></h1>
  </header>
  <section class="left-sidebar">
    <div class="navigation-wrapper">
      <nav>
        <ul class="nav">
          <li><RouterLink to="/">Home <House :size="18" /></RouterLink></li>
          <li><RouterLink to="/about">About <MessageCircleQuestionMark :size="18" /></RouterLink></li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.header {
  background-color: #18435A;
  transition: background-color 2s 500ms;
}

.header:hover {
  background-color: #13293D;
}

.title-site {
  padding: 0 2.5%;
}

.nav li {
  list-style-type: none;
}

.nav li a {
  text-decoration: none;
  font-size: 1.2em;
  color: #fff;
}

.nav li a.router-link-active {
  color: #fff;
  text-decoration: underline;
}

.italic {
  font-style: italic;
  transition: all 0.5s ease-in-out;
}
</style>
