<template>
  <div class="area-logo">
    <h2 class="title">Xiloteca</h2>
    <p class="subtitle">Centro de Estudos Superiores de Itacoatiara - CESIT</p>
  </div>
</template>
    
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoDefault"
});
</script>
    
<style scoped>
.area-logo {
  max-width: 9rem;
  padding: 0;
  text-align: center;
  color: #213140;
}
.title {
  font-weight: 700;
  font-size: 13pt;
}

.subtitle {
  font-weight: 400;
  font-size: 7pt;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .title {
    font-size: 13pt;
  }

  .subtitle {
    font-size: 7pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .area-logo {
    max-width: 12rem;
  }
  .title {
    font-size: 15pt;
  }

  .subtitle {
    font-size: 9pt;
  }
}
</style>