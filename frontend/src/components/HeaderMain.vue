<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <h1 class="title-site">Ask me</h1>
  </header>
  <section class="left-sidebar">
    <div class="navigation-wrapper">
      <nav>
        <ul class="nav">
          <li><RouterLink to="/">Home</RouterLink></li>
          <li><RouterLink to="/about">About</RouterLink></li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped>
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
</style>
