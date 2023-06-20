<template>
  <h2>{{ text }}</h2>
</template>
    
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainTitle",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>
    
  <style scoped>
h2 {
  font-weight: 600;
  font-size: 20px;
  color: #213140;
  text-align: center;
}

@media screen and (min-width: 481px) {
  /*TABLET*/
  h2 {
    font-size: 32px;
  }
}

@media screen and (min-width: 1024px) {
  /* DESKTOP */
  h2 {
    font-size: 40px;
  }
}
</style>