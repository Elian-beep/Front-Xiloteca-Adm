<template>
  <form class="areaSearch" @submit.prevent="searchSample">
    <div class="areaInpts">
      <div>
        <div class="radioGroup">
          <input
            type="radio"
            required
            name="opcInput"
            v-model="opcInput"
            value="familia"
            id="família"
            class="radioInpt"
          />
          <label class="radioLabel" for="família">Família</label>
        </div>
        <div class="radioGroup">
          <input
            type="radio"
            required
            name="opcInput"
            v-model="opcInput"
            value="nomeCientifico"
            id="nomeCientifico"
            class="radioInpt"
          />
          <label class="radioLabel" for="nomeCientifico">Nome Cientifico</label>
        </div>
      </div>
      <div>
        <div class="radioGroup">
          <input
            type="radio"
            required
            name="opcInput"
            v-model="opcInput"
            value="cod"
            id="codigo"
            class="radioInpt"
          />
          <label class="radioLabel" for="codigo">Codigo</label>
        </div>
        <div class="radioGroup">
          <input
            type="radio"
            required
            name="opcInput"
            v-model="opcInput"
            value="nomeVulgar"
            id="nomeVulgar"
            class="radioInpt"
          />
          <label class="radioLabel" for="nomeVulgar">Nome Vulgar</label>
        </div>
      </div>
    </div>
    <div class="formGroup">
      <div class="inputWithIcon">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          class="inptSearch"
          type="search"
          placeholder="Pesquise pelo nome Vulgar"
          v-model="searchInput"
        />
      </div>
      <ButtonDefault>Buscar</ButtonDefault>
    </div>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import ButtonDefault from "../Form/ButtonDefault.vue";

export default defineComponent({
  name: "tableSamples",
  components: {
    ButtonDefault,
  },
  emits: ["opcInput", "searchInput"],
  data() {
    return {
      opcInput: "",
      searchInput: "",
    };
  },
  computed: {},
  methods: {
    searchSample() {
      this.$emit("opcInput", this.opcInput);
      this.$emit("searchInput", this.searchInput);
    },
  },
});
</script>

<style scoped>
/* ----------- GRUPO RADIOS-LABEL */
.areaSearch {
}
.areaInpts {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.radioGroup {
  margin-bottom: 0.7em;
}

.radioInpt {
  display: none;
}

.radioInpt:checked + .radioLabel::before {
  background-color: #213140;
  transition: 0.2s;
  background: #213140;
}

.radioLabel {
  cursor: pointer;
  font-size: 14px;
  color: #213140;
}

.radioLabel::before {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1px solid #213140;
  vertical-align: middle;
  margin-right: 10px;
}

/* ----------- AREA DA BARRA DE PESQUISA */
.formGroup {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 4px;
  height: 36px;
}

.inputWithIcon {
  position: relative;
  width: 100%;
}

.inputWithIcon i {
  position: absolute;
  font-size: 15pt;
  left: 10px;
  top: 8px;
}

.inptSearch {
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 2px;
  background: #f3f3f3;
  border: 0.5px solid #213140;
  font-weight: 300;
  font-size: 10pt;
  padding-left: 34px;
  padding-right: 13px;
  outline: none;
}

.inptSearch::-webkit-search-cancel-button {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  font-size: 15pt;
  border-radius: 1px;
  background: url(../../assets/close.svg) no-repeat scroll 98%;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  /* ----------- GRUPO RADIOS-LABEL */
  .radioGroup {
    margin-bottom: 1em;
  }

  .radioLabel {
    font-size: 16px;
  }

  /* ----------- AREA DA BARRA DE PESQUISA */
  .formGroup {
    gap: 8px;
    height: 40px;
  }

  .inputWithIcon i {
    left: 10px;
    top: 10px;
  }

  .inptSearch {
    font-size: 11pt;
    padding-left: 36px;
  }

  .inptSearch::-webkit-search-cancel-button {
    height: 22px;
    width: 22px;
    font-size: 16pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  /* ----------- GRUPO RADIOS-LABEL */
  .areaSearch {
    display: flex;
    justify-content: space-between;
  }
  .areaInpts {
    width: 30%;
  }

  /* ----------- AREA DA BARRA DE PESQUISA */
  .formGroup{
    width: 65%;
  }
}
</style>
