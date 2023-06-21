<template>
  <ModalContainer
    @closedModal="closedModal"
    :mainTitle="dataSample.nomeVulgar"
    :showModal="openModal"
  >
    <div class="modal-subHe">
      <img
        src="@/assets/sampleDefault.svg"
        alt="Imagem ilustrativa de amostras cadastradas"
      />
      <div class="area-mainTitles">
        <p><span>Nome científico: </span>{{ sample.nomeCientifico }}</p>
        <p><span>Família: </span>{{ sample.familia }}</p>
        <p><span>Data de coleta: </span>{{ sample.dataColeta }}</p>
      </div>
    </div>
    <div class="area-info">
      <p><span>Descrição: </span>{{ sample.desc }}</p>
      <p><span>Código: </span>{{ sample.cod }}</p>
      <p><span>Lâmina: </span>{{ sample.lamina }}</p>
      <p><span>Herbrário: </span>{{ sample.herb }}</p>
      <p><span>Coletor: </span>{{ sample.coletor }}</p>
      <p><span>Procedência: </span>{{ sample.procedencia }}</p>
      <p><span>Determinador: </span>{{ sample.determinador }}</p>
      <p><span>Remetente: </span>{{ sample.remetente }}</p>
      <p><span>Obs: </span>{{ sample.obs }}</p>
      <p>
        <!-- <AccordionModel>
          <div v-for="picture of pictures.data" :key="picture._id">
            <img width="30" height="30" :src="picture.linkDrive" :alt="picture.tituloLink">
          </div>
        </AccordionModel> -->
        <AccordionModel>
          <div v-for="picture of dataSample.imagens" :key="picture._id">
            <ItemPictures :linkDrive="picture.linkDrive" :tituloLink="picture.tituloLink" />
          </div>
        </AccordionModel>
      </p> 
    </div>
  </ModalContainer>
</template>

<script>
import { defineComponent } from "vue";
import AccordionModel from "../Accordion/AccordionModel.vue";
import ModalContainer from "./ModalContainer.vue";
import Pictures from '../../services/pictures.js';
import ItemPictures from "../Accordion/ItemPictures.vue";

export default defineComponent({
  name: "modalSamples",
  components: { ModalContainer, AccordionModel, ItemPictures },
  emits: ["closeModal"],
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
    sample: {
      type: Object,
      required: false,
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
        imagens: []
      },
      pictures: [],
      dataOpenModal: false,
    };
  },
  methods: {
    async findPictures() {
        this.pictures = await Pictures.getPictures(this.sample._id);
        return this.pictures.data;
    },
    closedModal(closedModal) {
      this.dataOpenModal = closedModal;
      this.$emit("closeModal", false);
    },
  },
  watch: {
    openModal(newOpenModal) {
      this.dataOpenModal = newOpenModal;
    },
    sample(newSample) {
      this.dataSample = newSample;
      this.findPictures();
    },
  },
});
</script>

<style scoped>
.modal-subHe {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-top: 16px;
}

.modal-subHe img {
  width: 90px;
  height: 90px;
  border-radius: 2px;
}

.area-mainTitles p,
.area-info {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.area-info p {
  font-weight: 400;
  color: #213140;
}

.area-mainTitles p {
  font-size: 15px;
}

.area-mainTitles span,
.area-info span {
  font-weight: 600;
}


.area-info p {
  font-size: 14px;
}

.area-buttons {
  margin-top: 1em;
  display: flex;
  justify-content: end;
  gap: 1em;
}

.area-buttons button {
  font-size: 11pt;
  padding: 8px 28px;
  font-weight: 500;
  border-radius: 2px;
}

.btn-del {
  background: #e33737;
  border: 1px solid #e33737;
  color: #FAFAFA;
}

.btn-edit {
  background: #319842;
  border: 1px solid #319842;
  color: #FAFAFA;
}

@media screen and (min-width: 481px) {
  /* TABLET */
  .modal-subHe {
    margin-top: 32px;
  }

  .modal-subHe img {
    width: 100px;
    height: 100px;
  }

  .area-mainTitles p {
    font-size: 18px;
  }

  .area-info {
    margin-top: 32px;
    gap: 8px;
  }

  .area-info p {
    font-size: 15px;
  }
}

@media screen and (min-width: 769px) {
  /* LAPTOP */
  .modal-subHe img {
    width: 120px;
    height: 120px;
  }

  .area-mainTitles p {
    font-size: 20px;
  }

  .area-info p {
    font-size: 17px;
  }
}

@media screen and (min-width: 1024px) {
  /* DESKTOP */
  .modal-subHe img {
    width: 140px;
    height: 140px;
  }

  .area-mainTitles {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .area-info p {
    font-size: 16px;
  }
}
</style>