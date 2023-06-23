<template>
  <ModalContainer
    @closedModal="closedModal"
    :mainTitle="dataSample.nomeVulgar"
    :showModal="openModal"
  >
    <div class="modal-body">
      <SubTitle text="Tem certeza que deseja excluir?" />
    </div>
    <div class="modal-footer">
      <button @click="removeSample(sample)" class="modal-btn btn-confirm">
        Confirmar
      </button>
      <button @click="closedModal" class="modal-btn btn-cancel">
        Cancelar
      </button>
    </div>
  </ModalContainer>
</template>
  
<script>
import { defineComponent } from "vue";
import ModalContainer from "./ModalContainer.vue";
import SubTitle from "../Titles/SubTitle.vue";
import Sample from "../../services/samples.js";
import Pictures from "../../services/pictures.js";

export default defineComponent({
  name: "modalSamples",
  components: { ModalContainer, SubTitle },
  emits: ["closeModal", "refreshTable"],
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
    sample: {
      type: Object,
      required: false,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dataSample: {
        id: "",
        cod: "",
        lamina: "",
        herb: "",
        familia: "",
        nomeCientifico: "",
        nomeVulgar: "",
        procedencia: "",
        coletor: "",
        dataColeta: "",
        determinador: "",
        remetente: "",
        desc: "",
        obs: "",
        linkDrive: "",
      },
      dataOpenModal: false,
    };
  },
  methods: {
    closedModal(closedModal) {
      this.dataOpenModal = closedModal;
      this.$emit("closeModal", false);
    },
    async removeSample(sample) {
      this.removePictures(sample._id);
      console.log(this.token);
      await Sample.deleteSample(sample, this.token)
        .then((response) => {
          console.log(response.data);
          this.$emit("refreshTable", this.dataSample._id);
          this.closedModal();
        })
        .catch(e => {
          // console.log(e.response.status)
          if(e.response.status === 400){
            console.log('Sessão expirada, por favor, faça login novamente');
            localStorage.setItem('token', '');
            this.$router.push({ path: "/" });
          }
        });
      // try{
      // }catch(error){
      //   console.log(error);
      // }
    },
    async removePictures(idSample) {
      let pictures = await Pictures.getPictures(idSample);
      await Pictures.deletePictures(pictures.data);
    },
  },
  watch: {
    openModal(newOpenModal) {
      this.dataOpenModal = newOpenModal;
    },
    sample(newSample) {
      this.dataSample = newSample;
    },
  },
});
</script>
<style scoped>
.modal-body {
  margin-top: 1.5em;
}

.modal-footer {
  margin-top: 1.5em;
  display: flex;
  justify-content: space-between;
}
.modal-btn {
  border: none;
  background: none;
  font-size: 11pt;
  padding: 8px 28px;
  font-weight: 500;
  border-radius: 2px;
}

.btn-confirm {
  color: #fafafa;
  background: #e33737;
  border: 1px solid #e33737;
}

.btn-cancel {
  color: #213140;
  border: 1px solid #213140;
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .btn-confirm,
  .btn-cancel {
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
  .btn-confirm:hover {
    background: #6a1616;
  }

  .btn-cancel:hover {
    color: #fafafa;
    background: #213140;
  }
}
</style>