<template>
  <h3>{{ text }}</h3>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SubTitle",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
});
</script>
    
<style scoped>
h3 {
  font-weight: 600;
  font-size: 17px;
  color: #213140;
}

@media screen and (min-width: 481px) {
  /*TABLET*/
  h3 {
    font-size: 24px;
  }
}

@media screen and (min-width: 769px) {
  /*LAPTOP*/
}

@media screen and (min-width: 1024px) {
  /* DESKTOP */
  /* h2 {
    font-size: 42px;
  } */
}
</style>