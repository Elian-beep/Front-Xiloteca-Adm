<template>
  <button @click="openConfirm" class="btnOff">
    <LogOut />
    <i class="fa-solid fa-power-off"></i>
  </button>
</template>
    
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BtnOff",
  emits: ["openConfirm"],
  methods: {
    openConfirm(){
      this.$emit("openConfirm", true);
    }
  },
});
</script>
    
<style scoped>
.btnOff {
  background: none;
  padding: 0;
  border: none;
}

.btnOff > i {
  transition: color 0.2s ease-in-out;
}

.btnOff:hover i {
    cursor: pointer;
    color: #6a1616;
  }

.btnOff i {
  color: #be3737;
  font-size: 20pt;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .btnOff i {
    font-size: 22pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .btnOff i {
    font-size: 25pt;
  }

}
</style>