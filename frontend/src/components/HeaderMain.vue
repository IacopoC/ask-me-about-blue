<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <img alt="Askme logo" class="logo" src="@/assets/askme-logo.png" />
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
.logo {
  width: 50px;
}

.nav li {
  list-style-type: none;
}

.nav li a {
  text-decoration: none;
  font-size: 2em;
  color: #fff;
}
</style>
