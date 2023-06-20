<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BtnDefault",
});
</script>
    
<style scoped>
.btn {
  background: #213140;
  border-radius: 2px;
  padding: 8px 28px;
  font-size: 11pt;
  color: #fafafa;
  font-weight: 500;
  border: none;
  outline: none;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .btn {
    padding: 10px 32px;
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