<template>
  <div class="actionBtns">
    <button @click="openSample" class="actionBtn">Amostras</button>
    <button @click="openForm" class="actionBtn">Formulário</button>
    <button class="moveBtn" :class="{ rightBtn: !tableSample }">
      {{ currentOption }}
    </button>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "viewHome",
  components: {},
  emits: ["showTable", "showForm"],
  props: {
    isEdit: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dataIsEdit: false,
      currentOption: "Amostras",
      tableSample: true,
      formSample: false,
      isWideScreen: window.innerWidth >= 1699
    };
  },
  watch: {
    isEdit(newIsEdit) {
      this.dataIsEdit = newIsEdit;
      this.openForm();
    },
  },
  methods: {
    openSample() {
      this.dataIsEdit = false;
      this.formSample = false;
      this.tableSample = true;
      this.$emit("showTable", this.tableSample);
      this.currentOption = "Amostras";
    },
    openForm() {
      //Apenas se a tela for menor que 1700px
      if (!this.isWideScreen) {
        this.formSample = true;
        this.tableSample = false;
        this.$emit("showForm", this.formSample);
        this.currentOption = "Formulário";
      }
    },
  },
});
</script>
  
<style scoped>
.actionBtns {
  background: #fafafa;
  margin: 0 2em 24px 2em;
  display: flex;
  justify-content: space-between;
  position: relative;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
}

.actionBtn {
  padding: 1em;
  background: transparent;
  border: none;
  color: #213140;
  cursor: pointer;
}

.moveBtn {
  position: absolute;
  height: 90%;
  margin: 2px;
  border: none;
  background: #213140;
  color: #fafafa;
  transform: translateX(0);
  transition: all 0.2s ease-in-out;
}

.actionBtn,
.moveBtn {
  width: 50%;
  font-size: 11pt;
  font-weight: 600;
  border-radius: 3px;
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.rightBtn {
  transform: translateX(97%);
  transition: all 0.2s ease-in-out;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .actionBtns {
    max-width: 350px;
    margin: 0 auto 24px auto;
  }

  .actionBtn,
  .moveBtn {
    font-size: 12pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px){

  .actionBtn{
    transition: color .2s ease-in-out;
  }
  .actionBtn:hover{
    color: #919191;
  }
}

/* -------------------------------- DESKTOP  -------------------------------- */
@media screen and (min-width: 1700px) {
  .actionBtns{
    display: none;
  }
}
</style>