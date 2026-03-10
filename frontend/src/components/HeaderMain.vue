<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <header>
    <img alt="Askme logo" class="logo" src="@/assets/askme-logo.png" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.logo {
  width: 50px;
}
</style>
