<template>
  <div></div>
  <div class="container" :class="{ openFormPictures: dataOpenFormPictures }">
    <div class="header-formPicture">
      <SubTitle text="Deseja adicionar fotos a esta amostra?" />
      <button class="btn-newInpts" @click="newInpts">Nova imagem</button>
    </div>
    <form @submit.prevent="" class="form-newPictures">
      <div
        v-for="(picture, index) in pictures"
        :key="index"
        class="form-inptsPictures"
      >
        <div class="inpt-duo">
          <div class="inpt-duo-item">
            <div class="form-group">
              <input
                v-model="picture.tituloLink"
                class="form-inpt"
                type="text"
                id="coletor"
              />
              <label for="coletor" class="form-label">Titulo</label>
            </div>
          </div>
          <div class="inpt-duo-item">
            <div class="form-group">
              <input
                v-model="picture.linkDrive"
                class="form-inpt"
                type="text"
                id="dataColeta"
              />
              <label for="dataColeta" class="form-label">Link</label>
            </div>
          </div>
          <div class="icon-deleteInpt">
            <button @click="delInpt(index)">
              <i class="fa-solid fa-x"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="btns-groups">
        <button class="btn-finish" @click="closeFormPictures">Finalizar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import SubTitle from "../Titles/SubTitle.vue";
import Pictures from "../../services/pictures.js";

export default defineComponent({
  name: "formPictures",
  components: { SubTitle },
  emits: ["openFormSamples"],
  props: {
    idSample: {
      type: String,
      required: true,
    },
    openFormPictures: {
      type: Boolean,
      required: true,
    },
    isEdit: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      dataOpenFormPictures: false,
      dataBlockInputs: false,
      pictureModel: { linkDrive: "", tituloLink: "", idAmostra: "" },
      pictures: [
        { linkDrive: "", tituloLink: "", idAmostra: "" }
      ],
    };
  },
  methods: {
    closeFormPictures() {
      if (this.pictures.length == 1 && this.pictures[0].linkDrive == "" && this.pictures[0].tituloLink == "") {
        this.$emit("openFormSamples", true);
        this.dataOpenFormPictures = false;
        return;
      }
      this.pictures.forEach((picture) => {
        picture.idAmostra = this.idSample;
      });
      if (Pictures.savePictures(this.pictures)) {
        this.pictures = [
          { linkDrive: "", tituloLink: "", idAmostra: this.idSample },
        ];
      }
      this.$emit("openFormSamples", this.dataOpenFormPictures);
      this.dataOpenFormPictures = false;
    },
    async editingPictures() {
      if (this.isEdit) {
        let receivedPictures = await Pictures.getPictures(this.idSample);
        if (receivedPictures.data.length >= 1) {
          this.pictures = receivedPictures.data;
          Pictures.deletePictures(this.pictures);
        }
      }
    },
    newInpts() {
      if (this.pictures.length >= 6) {
        return;
      }
      let lastElement = this.pictures.length - 1;
      if (this.pictures[lastElement].linkDrive !== "") {
        this.pictures.push(JSON.parse(JSON.stringify(this.pictureModel)));
      }
    },
    delInpt(index) {
      if (this.pictures.length > 1) {
        this.pictures.splice(index, 1);
      } else if (index != 0 && this.pictures.length === 1) {
        return;
      }
    }
  },
  watch: {
    openFormPictures(newOpenFormPictures) {
      this.dataBlockInputs = newOpenFormPictures;
      this.dataOpenFormPictures = newOpenFormPictures;
      this.editingPictures();
    },
  },
});
</script>

<style scoped>
.container {
  display: none;
  height: 100%;
  width: 100%;
}

.container.openFormPictures {
  display: block;
}

.form-newPictures {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* -------------------- CAMPOS DUPLOS DO FORMULÁRIO */
.inpt-duo {
  display: flex;
  gap: 20px;
}

.form-group {
  position: relative;
}

.form-inpt {
  height: 36px;
  width: 100%;
  /* background: #f3f3f3; */
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 10pt;
  font-weight: 400;
  outline: none;
  transition: all 0.2s ease-out;
}

.form-inpt:focus + .form-label,
.form-inpt:valid + .form-label {
  top: -10px;
  left: 1rem;
  font-size: 10.5pt;
  color: #666;
  background-color: #fff;
  border-radius: 0.25rem;
  transform: translateY(0%);
  padding: 0 0.5px;
}

.form-label {
  position: absolute;
  top: 50%;
  font-size: 10pt;
  left: 1.3rem;
  transform: translateY(-50%);
  transition: all 0.2s ease-out;
  color: #999;
  pointer-events: none;
}

.icon-deleteInpt {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-deleteInpt button {
  background: none;
  border: none;
}

/* -------------------- GRUPO DE BOTÕES DO FORMULÁRIO */
.btn-newInpts {
  background: #fafafa;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
}

.btn-finish {
  width: 100%;
  background: #213140;
  color: #fafafa;
  border-radius: 4px;
  padding: 8px;
  font-size: 12pt;
  font-weight: 500;
  outline: none;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  /* -------------------- CAMPOS DUPLOS DO FORMULÁRIO */
  .inpt-duo {
    justify-content: center;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .inpt-duo-item {
    width: 70%;
  }
}

/* -------------------------------- DESKTOP  -------------------------------- */
@media screen and (min-width: 1700px) {
  /* .content-pictures {
    display: none;
  }

  .content-pictures.dataBlockInputs {
    display: block;
  } */
}
</style>