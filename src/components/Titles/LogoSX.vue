<template>
  <div class="area-logo" :class="{ isVisible: isVisible }">
    <h1>Xiloteca</h1>
    <span>Centro de Estudos Superiores de Itacoatiara - CESIT</span>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LogoXilotecaSX",
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
});
</script>
  
  <style scoped>
.area-logo {
  display: none;
}

.area-logo.isVisible {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.area-logo h1 {
  font-weight: 700;
  font-size: 28px;
  color: #213140;
  margin: 0;
  display: inline;
}

.area-logo span {
  font-weight: 400;
  font-size: 12px;
  text-align: center;
  margin: 0;
  color: #213140;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .area-logo h1 {
    font-size: 40px;
  }

  .area-logo span {
    font-size: 14px;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {

  .area-logo h1 {
    font-size: 52px;
  }

  .area-logo span {
    font-size: 16px;
  }
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 1024px) {
  .area-logo h1 {
    font-size: 60px;
  }
}
</style>