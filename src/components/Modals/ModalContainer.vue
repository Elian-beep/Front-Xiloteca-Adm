<template>
  <section class="container" :class="{ showModal: dataShowModal }">
    <div class="content-between">
      <div class="content">
        <div class="modal-header">
          <div></div>
          <MainTitle :text="mainTitle" />
          <button class="modal-btnClose">
            <i @click="closeModal" class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </section>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";
import MainTitle from "../Titles/MainTitle.vue";

export default defineComponent({
  name: "ModalContainer",
  emits: ["closedModal"],
  components: { MainTitle },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    mainTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataShowModal: false,
      dataMainTitle: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("closedModal", false);
      this.dataShowModal = false;
    },
  },
  mounted() {
    this.dataShowModal = this.showModal;
  },
  watch: {
    showModal(newShowModal) {
      this.dataShowModal = newShowModal;
    },
    mainTitle(newMainTitle) {
      this.dataMainTitle = newMainTitle;
    },
  },
});
</script>
  
  <style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 99;

  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);

  display: none;
}

.container.showModal {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
}

.content {
  overflow-y: auto;
  background: #fafafa;
  padding: 24px 16px;
  max-width: 600px;
  max-height: 100vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
}

.modal-btnClose {
  background: none;
  padding: none;
  border: none;
  color: #213140;
  font-size: 15px;
}

.modal-btnClose:hover {
  cursor: pointer;
}

@media screen and (min-width: 481px) {
  .content {
    padding: 32px 24px;
  }

  .modal-btnClose {
    font-size: 20px;
  }
}

@media screen and (min-width: 769px) {
  /* LAPTOP */
  .content {
    padding: 32px 28px;
    max-width: 65vw;
  }

  .modal-btnClose {
    font-size: 24px;
  }
}

@media screen and (min-width: 1024px) {
  /* DESKTOP */

  .container {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .content {
    max-width: 800px;
  }
}
</style>
  