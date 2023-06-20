<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentLogin",
  components: {},
});
</script>
  
<style scoped>

.content {
  width: 100%;
  height: calc(100vh - 60px);
  background: #f3f3f3;
  padding-top: 96px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .content {
    padding-top: 50px;
    gap: 30px;
  }
}

/* -------------------------------- DESKTOP -------------------------------- */
@media screen and (min-width: 1024px) {
  .content {
    flex-direction: row;
    justify-content: center;
    gap: 300px;
  }
}
</style>