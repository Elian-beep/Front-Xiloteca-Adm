<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>
      
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BtnLight",
});
</script>
      
  <style scoped>
.btn {
  background: #f3f3f3;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .btn {
    padding: 8px 20px;
    font-size: 12pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .btn{
    transition: background-color .2s ease-in-out;
    cursor: pointer;
  }
  .btn:hover {
    color: #fafafa;
    background: #213140;
  }
}
</style>