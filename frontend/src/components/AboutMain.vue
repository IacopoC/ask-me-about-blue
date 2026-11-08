<script setup>
import AskmeBalloonImage from "@/assets/img/ask-me-blue-balloon.jpg";
import AskmeBeachImage from "@/assets/img/ask-me-beach-abstract.jpg";
</script>

<template>
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
    <div class="img-container">
    <img :src="AskmeBalloonImage" alt="AskmeBalloon" class="askme-balloon" />
    <img :src="AskmeBeachImage" alt="AskmeBeach" class="askme-beach" />
      </div>
  </div>
</template>

<style scoped>
.p-top {
  padding: 10px 0 0 0;
}

.img-container {
  margin: 10px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.img-container img {
  width: 100%;
  max-width: 500px;
  height: auto;
}

.askme-balloon, .askme-beach {
  border: 6px solid white;
}
</style>
