<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
html {
  font-family: "Inter", sans-serif;
  background: #FAFAFA;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /*pode ser transparent também*/
}
</style>
