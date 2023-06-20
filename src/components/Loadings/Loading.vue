<template>
  <div class="loading">
    <div class="loading-circle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CircleLoading",
});
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-circle {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 3px solid #e2e2e2;
  border-top-color: #213140;
  animation: loading 1s ease-in-out infinite;
}

@keyframes loading {
  to {
    transform: rotate(360deg);
  }
}
</style>