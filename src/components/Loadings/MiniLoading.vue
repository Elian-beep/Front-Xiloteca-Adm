<template>
  <div class="loading">
    <div class="loading-circle"></div>
    <div class="loading-circle"></div>
    <div class="loading-circle"></div>
    <div class="loading-circle"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "miniLoading",
});
</script>

<style scoped>
.loading {
  width: 100px;
  /* height: 20px; */
  display: flex;
  justify-content: space-between;
}

.loading-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #213140;
  animation: loading-progress 1s ease-in-out infinite;
}

.loading-circle:nth-child(1) {
  animation-delay: 0s;
}

.loading-circle:nth-child(2) {
  animation-delay: 0.25s;
}

.loading-circle:nth-child(3) {
  animation-delay: 0.5s;
}

.loading-circle:nth-child(4) {
  animation-delay: 0.75s;
}

@keyframes loading-progress {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>