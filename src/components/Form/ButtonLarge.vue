<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
      
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BtnLarge",
});
</script>
      
<style scoped>
.btn {
  background: #213140;
  border-radius: 2px;
  padding: 1em;
  font-size: 11pt;
  color: #fafafa;
  font-weight: 600;
  border: none;
  outline: none;
  width: 100%;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .btn {
    padding: 12px 32px;
    font-size: 12pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .btn {
    transition: background 0.2s ease-in-out;
  }
  .btn:hover {
    background: rgba(33, 49, 64, 0.75);
    cursor: pointer;
  }
}
</style>