<template>
  <section class="container">
    <slot></slot>
  </section>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContainerComponent",
});
</script>
    
<style scoped>
.container{
    padding: 24px;
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .container{
    padding: 32px 64px;
  }
}
</style>