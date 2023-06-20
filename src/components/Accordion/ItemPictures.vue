<template>
  <a class="item-picture" target="blank" :href="linkDrive">
    <span class="title">{{ tituloLink }}</span>
    <i class="fa-solid fa-arrow-up-right-from-square"></i>
  </a>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ItemPictures",
  props: {
    linkDrive: {
      type: String,
      required: true,
    },
    tituloLink: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.item-picture {
  display: flex;
  gap: 1em;
}

.title {
  font-size: 12pt;
  color: #213140;
}
</style>