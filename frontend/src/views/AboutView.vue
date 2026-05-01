<script setup>
import AskmeBalloonImage from '@/assets/img/ask-me-blue-balloon.jpg';
</script>
<template>
  <main class="main-content">
  <div class="about">
    <h2 class="title-page">About this project</h2>
    <p>A poem about Blue:</p>
    <p class="p-top"><em>"Blue is the vast, quiet expanse of the sky,
    A deep ocean mirror where the lazy clouds lie.
    From cerulean serenity to navy’s deep dream,
    It’s the calm of the brook and the rush of the stream.
    It is tranquil, a sapphire, a soft evening shade,
    Where memories rest and peaceful thoughts are made."</em></p>
    <p class="p-top">The answers will be about blue color and all there is about blue...</p>
    <img :src="AskmeBalloonImage" alt="AskmeBalloon" class="askme-balloon" />
  </div>
  </main>
</template>

<style>
.p-top {
  padding: 10px 0 0 0;
}

.askme-balloon {
  border: 4px solid white;
  margin: 20px 0;
  width: 100%;
}
</style>
