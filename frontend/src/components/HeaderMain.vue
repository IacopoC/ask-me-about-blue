<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <img alt="Askme logo" class="logo" src="@/assets/askme-logo.png" />
  </header>
  <section class="left-sidebar">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </section>
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>
