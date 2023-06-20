<template>
  <div class="header">
    <div class="partHeader">
      <Logo />
    </div>
    <div class="partHeader mainTitle">
      <h1 class="title">Administrador</h1>
    </div>
    <div class="partHeader-icon">
      <ButtonBackup />
      |
      <BtnOff @openConfirm="receivedOpenConfirm" />
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./Logo.vue";
import BtnOff from "./BtnOff.vue";
import ButtonBackup from "./ButtonBackup.vue";

export default defineComponent({
  name: "HeaderComponent",
  components: { Logo, BtnOff, ButtonBackup },
  emits: ["openConfirm"],
  props: {
    tokenKey: {
      type: Object,
      require: true
    }
  },
  methods: {
    receivedOpenConfirm(received: boolean){
      this.$emit("openConfirm", true);
    }
  }
});
</script>
  
<style scoped>
.title {
  display: none;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 0.5px solid rgba(33, 49, 64, 0.25);
}

.partHeader-icon{
  display: flex;
  align-items: center;
  gap: 10px;
  color: #213140;
  border: .5px solid #213140;
  border-radius: 3px;
  padding: 5px;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .partHeader {
    width: 30%;
  }

  .partHeader-icon {
    /* justify-content: flex-end; */
  }

  .partHeader.mainTitle {
    display: flex;
    justify-content: center;
  }
  .title {
    display: block;
    font-size: 16pt;
    color: #213140;
  }
}
/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .header {
    padding: 24px 64px;
  }

  .title {
    font-size: 19pt;
  }
}
</style>