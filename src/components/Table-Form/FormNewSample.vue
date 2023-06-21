<template>
  <section class="container" :class="{ openForm: dataOpenForm }">
    <div class="form-group alert">
      <SimpleAlert
        @closeActive="activeReceived"
        :isActive="activeAlert"
        :backgroundColor="colorAlert"
        >{{ msgAlert }}</SimpleAlert
      >
    </div>
    <form
      class="form-newSample"
      @submit.prevent="SaveSample"
      :class="{ openFormSamples: dataOpenFormSamples }"
    >
      <div class="form-group">
        <input
          type="text"
          id="nome-vulgar"
          class="form-inpt"
          v-model="sample.nomeVulgar"
        />
        <label for="nome-vulgar" class="form-label">Nome Vulgar</label>
      </div>

      <div class="form-group">
        <input
          type="text"
          id="nome-cientifico"
          class="form-inpt"
          v-model="sample.nomeCientifico"
        />
        <label for="nome-cientifico" class="form-label">Nome Científico</label>
      </div>
      <div class="form-group">
        <input
          class="form-inpt"
          type="text"
          v-model="sample.familia"
          id="familia"
        />
        <label for="familia" class="form-label">Família</label>
      </div>
      <div class="inpt-duo">
        <div class="inpt-duo-item">
          <div class="form-group">
            <input
              class="form-inpt"
              :class="{ warning: errorForm }"
              type="text"
              v-model="sample.cod"
              id="cod"
            />
            <label for="cod" class="form-label" :class="{ warning: errorForm }"
              >Código *</label
            >
          </div>
        </div>
        <div class="inpt-duo-item">
          <div class="form-group">
            <input
              class="form-inpt"
              type="text"
              v-model="sample.lamina"
              id="lamina"
            />
            <label for="lamina" class="form-label">Lâmina</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input
          class="form-inpt"
          type="text"
          v-model="sample.herb"
          id="herbario"
        />
        <label for="herbario" class="form-label">Herbário</label>
      </div>
      <div class="form-group">
        <input
          class="form-inpt"
          type="text"
          v-model="sample.remetente"
          id="remetente"
        />
        <label for="remetente" class="form-label">Remetente</label>
      </div>
      <div class="form-group">
        <input
          class="form-inpt"
          type="text"
          v-model="sample.determinador"
          id="determinador"
        />
        <label for="determinador" class="form-label">Determinador</label>
      </div>
      <div class="inpt-duo">
        <div class="inpt-duo-item">
          <div class="form-group">
            <input
              class="form-inpt"
              type="text"
              v-model="sample.coletor"
              id="coletor"
            />
            <label for="coletor" class="form-label">Coletor</label>
          </div>
        </div>
        <div class="inpt-duo-item">
          <div class="form-group">
            <input
              class="form-inpt"
              type="text"
              v-model="sample.dataColeta"
              id="dataColeta"
            />
            <label for="dataColeta" class="form-label">Data da Coleta</label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <textarea
          class="inptTxtArea"
          v-model="sample.desc"
          id="descricao"
        ></textarea>
        <label for="descricao" class="form-label">Descrição</label>
      </div>
      <div class="form-group">
        <textarea class="inptTxtArea" v-model="sample.obs" id="obs"></textarea>
        <label for="obs" class="form-label">Observação</label>
      </div>

      <div class="container-picture">
        <div class="header-picture">
          <SubTitle text="Deseja adicionar fotos a esta amostra?" />
          <button type="button" class="btn-newInpts" @click="newInpts">
            Nova imagem
          </button>
        </div>
        <div class="form-pictures">
          <div
            v-for="(picture, index) in pictures"
            :key="index"
            class="inpt-form-pictures"
          >
            <div class="inpt-duo">
              <div class="inpt-duo-item">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="picture.tituloLink"
                    class="form-inpt"
                  />
                  <div class="form-label">Titulo</div>
                </div>
              </div>
              <div class="inpt-duo-item">
                <div class="form-group">
                  <input
                    type="text"
                    v-model="picture.linkDrive"
                    class="form-inpt"
                  />
                  <div class="form-label">Link</div>
                </div>
              </div>
              <div class="icon-deleteInpt">
                <button type="button" @click="delInpt(index)">
                  <i class="fa-solid fa-x"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-warning" :class="{ warning: errorForm }">
        Todos os campos em vermelhos devem ser preenchidos
      </p>

      <div class="btnsSubmit">
        <button type="button" class="btn-clear" @click="ClearInpts">
          Limpar tudo
        </button>
        <ButtonLarge>
          <div class="content-btnSave">
            {{ btnText }}
            <div
              class="custom-loader"
              :class="{ closeLoaderSave: closeLoaderSave }"
            ></div>
          </div>
        </ButtonLarge>
      </div>
    </form>
  </section>
</template>
    
<script>
import { defineComponent } from "vue";
import ButtonLarge from "../Form/ButtonLarge.vue";
import Samples from "../../services/samples.js";
import SimpleAlert from "../Alerts/SimpleAlert.vue";
import SubTitle from "../Titles/SubTitle.vue";

export default defineComponent({
  name: "formNewSample",
  components: { ButtonLarge, SimpleAlert, SubTitle },
  props: {
    openForm: {
      type: Boolean,
      required: true,
    },
    sampleReceived: {
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
      sample: {
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
        imagens: [],
      },
      pictureModel: { linkDrive: "", tituloLink: "" },
      pictures: [],
      dataBlockInputs: false,
      dataOpenForm: false,
      closeLoaderSave: true,
      isEdition: false,
      isSave: true,
      errorForm: false,
      btnText: "Salvar amostra",
      activeAlert: false,
      msgAlert: "",
      colorAlert: "",
      isEditPicture: false,
      dataOpenFormSamples: true,
    };
  },
  methods: {
    SaveSample() {
      if (this.sample.cod) {
        this.errorForm = false;
        this.PopulatePictures();
        if (!this.isEdition && this.isSave) {
          this.sample.cod = this.sample.cod.toUpperCase();
          this.closeLoaderSave = false;
          Samples.saveSample(this.sample, this.token)
            .then((response) => {
              this.activeAlert = true;
              this.msgAlert = "Cadastrado com sucesso";
              this.pictures = [];
              this.colorAlert = "#8ad547";
              this.closeLoaderSave = true;
              this.sample = {};
              console.log(`${response.data} cadastrado com sucesso`);
            })
            .catch((e) => {
              this.activeAlert = false;
              this.msgAlert = e.response.data.msg;
              this.activeAlert = true;
              this.colorAlert = "#be3737";
              console.log("cod igual");
              console.log(`${e.response.data}`);
            });
        } else if (this.isEdition) {
          this.closeLoaderSave = false;
          Samples.editSample(this.sample, this.token).then((response) => {
            console.log({ res: response.data });
            this.closeLoaderSave = true;
            this.ClearInpts();
          });
        }
        if (!this.isSave) {
          this.isSave = true;
        }
        // desligar o loading de salvando
      } else {
        this.errorForm = true;
      }
    },
    PopulatePictures() {
      this.sample.imagens = this.pictures.filter(
        (picture) => picture.linkDrive !== ""
      );
    },
    ClearInpts() {
      this.sample = {};
      this.isEdition = false;
      this.isSave = false;
      this.pictures = [];
      this.btnText = "Salvar amostra";
    },
    openFormSampleReceived(received) {
      this.dataOpenFormSamples = received;
    },
    newInpts() {
      if (this.pictures.length >= 10) {
        return;
      }
      if (this.pictures.length === 0) {
        this.pictures.push(JSON.parse(JSON.stringify(this.pictureModel)));
        return;
      }
      let lastElement = this.pictures.length - 1;
      if (this.pictures[lastElement].linkDrive !== "") {
        this.pictures.push(JSON.parse(JSON.stringify(this.pictureModel)));
      }
    },
    delInpt(index) {
      if (this.pictures.length > 0) {
        this.pictures.splice(index, 1);
      } else if (index != 0 && this.pictures.length === 0) {
        return;
      }
    },
  },
  watch: {
    openForm(newOpenForm) {
      this.dataOpenForm = newOpenForm;
    },
    sampleReceived(newSample) {
      this.sample = newSample;
      this.isEdition = true;
      this.pictures = this.sample.imagens;
      this.errorForm = false;
      this.btnText = "Salvar alterações";
    },
    activeReceived(newActive) {
      this.activeAlert = newActive;
    },
  },
});
</script>
    
<style scoped>
.container {
  display: none;
}
.container.openForm {
  display: block;
}

/* ------------------ CAMPOS DE FORMULÁRIO */
.form-group {
  position: relative;
}
.alert {
  width: 80%;
  z-index: 99;
  right: 10%;
  left: 10%;
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
.inptTxtArea {
  height: 85px;
  font-family: "Inter", sans-serif;
  width: 100%;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
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

.form-inpt:focus + .form-label.warning,
.form-inpt:valid + .form-label.warning {
  color: #be3737;
}

.form-inpt.warning {
  border-color: #be3737;
}

.inptTxtArea:focus + .form-label,
.inptTxtArea:valid + .form-label {
  top: -10px;
  left: 1rem;
  font-size: 10.5pt;
  color: #666;
  background-color: #fff;
  border-radius: 0.25rem;
  transform: translateY(0%);
  padding: 0 0.5em;
}

.btn-newInpts {
  background: #fafafa;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
  cursor: pointer;
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

/* ------------------ CAMPOS DE FORMULÁRIO */

.form-newSample {
  margin-top: 2em;
  display: none;
  flex-direction: column;
  gap: 20px;
}

.form-newSample.openFormSamples {
  display: flex;
}
.inpt-duo {
  display: flex;
  gap: 20px;
}

.text-warning {
  display: none;
  color: #be3737;
}

.text-warning.warning {
  display: block;
}

.btnsSubmit {
  margin-top: 1em;
  display: flex;
  gap: 12px;
}

.content-btnSave{
  display: flex;
  justify-content: center;
  gap: 16px;
}

.custom-loader.closeLoaderSave {
  display: none;
}

.custom-loader {
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: conic-gradient(#0000 10%, #fafafa);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

.btn-clear {
  width: 40%;
  background: #fafafa;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
}

/* ------------------ CAMPOS DE FORMULÁRIO DE PICTURES */
.container-picture {
  height: 100%;
  width: 100%;
}

.form-pictures {
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  /* ------------------ CAMPOS DE FORMULÁRIO */

  .form-label {
    font-size: 10pt;
    left: 1.3rem;
  }

  .form-inpt {
    height: 38px;
    padding: 8px 10px;
    font-size: 11.5pt;
  }

  .form-inpt:focus + .form-label,
  .form-inpt:valid + .form-label {
    top: -10px;
    left: 1rem;
    font-size: 10.5pt;
  }

  /* ------------------ CAMPOS DE FORMULÁRIO */
  .inpt-duo {
    gap: 20px;
  }

  .inpt-duo-item {
    width: 100%;
  }

  .inptTxtArea {
    height: 150px;
  }

  .inpt {
    height: 38px;
  }

  .inpt,
  .inptTxtArea {
    padding: 8px 10px;
    font-size: 11.5pt;
  }

  .btnsSubmit {
    margin-top: 1.5em;
    gap: 12px;
  }

  .btn-clear {
    max-width: 30%;
    border-radius: 2px;
    padding: 6px 8px;
    font-size: 11.5pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 16px 24px;
    background: #fafafa;
    box-shadow: 0px 0px 10px 1px rgba(33, 49, 64, 0.25);
  }

  .alert {
    left: auto;
    width: auto;
    right: 10%;
  }

  .inptTxtArea {
    height: 150px;
  }

  .btn-clear {
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
  }
  .btn-clear:hover {
    color: #fafafa;
    background: #213140;
  }
}

/* -------------------------------- DESKTOP  -------------------------------- */
@media screen and (min-width: 1700px) {
  .container {
    display: block;
  }

  .alert {
    right: 50px;
  }
}
</style>