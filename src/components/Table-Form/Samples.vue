<template>
  <section class="container" :class="{ openTable: dataOpenTable }">
    <SearchFormVue
      @opcInput="receivedOpcInput"
      @searchInput="receivedSearchInput"
    />

    <!-- ------------------------------- LOOP DE LOADING -->
    <div class="loading-area" :class="{ 'close-loading-area': tableIsOpen }">
      <CircleLoading />
    </div>

    <!-- ------------------------------- TABELA DAS AMOSTRAS -->
    <div class="table-area" :class="{ show: tableIsOpen }">
      <table class="tableSample">
        <thead>
          <tr>
            <th>Código</th>
            <th class="inLaptop"><span>Família</span></th>
            <th>Nome Científico</th>
            <th class="inTablet">Nome vulgar</th>
            <th class="inDesktop">Coletor</th>
            <th class="inDesktop">Determinador</th>
            <th>
              <div class="btnRefresh">
                <ButtonLight @click="listAllPage"
                  ><i class="fa-solid fa-arrows-rotate"></i
                ></ButtonLight>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sample of samples" :key="sample._id" class="link-modal">
            <td @click="openModalSample(sample)">{{ sample.cod }}</td>
            <td @click="openModalSample(sample)" class="inLaptop">
              {{ sample.familia }}
            </td>
            <td @click="openModalSample(sample)" class="table-sample-nc">
              {{ sample.nomeCientifico }}
            </td>
            <td @click="openModalSample(sample)" class="inTablet">
              {{ sample.nomeVulgar }}
            </td>
            <td @click="openModalSample(sample)" class="inDesktop">
              {{ sample.coletor }}
            </td>
            <td @click="openModalSample(sample)" class="inDesktop">
              {{ sample.determinador }}
            </td>
            <td>
              <div class="table-actions">
                <button
                  @click="sendEditSample(sample)"
                  class="table-action act-edit"
                >
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button
                  @click="openModalDelSample(sample)"
                  class="table-action act-del"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ------------------------------- PAGINAÇÃO DA TABELA -->
    <div class="pag-area" :class="{ show: tableIsOpen }">
      <button class="pag-btn-action" @click="previousPage">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <div class="pag-numbers">
        <span
          v-for="page in pagesToShow"
          :key="page"
          @click="goToPage(page)"
          class="pag-number"
          :class="{ 'current-page': currentPage === page }"
          >{{ page }}</span
        >
      </div>
      <button class="pag-btn-action" @click="nextPage">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </section>
  <ModalSample
    @closeModal="closedModal"
    :openModal="openModal"
    :sample="sample"
  />
  <ModalDelSample
    @closeModal="closedModalDelSample"
    @refreshTable="attSamples"
    :openModal="openModalDel"
    :sample="sample"
    :token="token"
  />
</template>
  
<script>
import { defineComponent } from "vue";
import CircleLoading from "../Loadings/Loading.vue";
import Samples from "../../services/samples.js";
import ModalSample from "../Modals/ModalSample.vue";
import ModalDelSample from "../Modals/ModalDelSample.vue";
import ButtonLight from "../Form/ButtonLight.vue";
import SearchSample from "../../services/searchSample.js";
import SearchFormVue from "../Form/SearchForm.vue";

export default defineComponent({
  name: "tableSamples",
  components: {
    SearchFormVue,
    CircleLoading,
    ModalSample,
    ModalDelSample,
    ButtonLight,
  },
  emits: ["isEdit", "sampleForEdit"],
  props: {
    openTable: {
      type: Boolean,
      required: true,
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
      },
      samples: [],
      sampleSearched: [],
      modeSearch: false,
      tableIsOpen: false,
      pages: {
        previousPage: "",
        nextPage: "",
        totalSamples: 0,
        limit: 1,
        offset: 0,
      },
      dataOpenTable: true,
      currentPage: 1,
      openModal: false,
      openModalDel: false,
      opcInput: "",
      searchInput: "",
      cloneSamples: [],
    };
  },
  mounted() {
    // this.listAll();
    this.listAllPage();
  },
  computed: {
    totalPages() {
      // return Math.ceil(this.samples.length / this.samplesForPage);
      return Math.ceil(this.pages.totalSamples / this.pages.limit);
    },
    pagesToShow() {
      var pages = [];
      if (this.currentPage <= 3) {
        for (var i = 1; i <= 3; i++) {
          pages.push(i);
        }
        pages.push("..");
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        pages.push("..");
        for (let i = this.totalPages - 2; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("..");
        pages.push(this.currentPage - 1);
        pages.push(this.currentPage);
        pages.push(this.currentPage + 1);
        pages.push("..");
        pages.push(this.totalPages);
      }
      return pages;
    },
  },
  methods: {
    attSamples(receivedIdSample) {
      if (receivedIdSample) {
        this.tableIsOpen = false;
        if (!this.modeSearch) {
          Samples.findAllPage(`${process.env.VUE_APP_ROUTE_SAMPLE}/${process.env.VUE_APP_ROUTE_PAGE}?limit=${this.pages.limit}&offset=${this.pages.offset}`).then((response) => {
            this.samples = response.data.results;
            this.pages.totalSamples = response.data.total;
            this.pages.offset = response.data.offset;
            this.pages.previousPage = response.data.previousUrl;
            this.pages.nextPage = response.data.nextUrl;
            this.currentPage = this.pages.offset / this.pages.limit + 1;
            this.tableIsOpen = true;
          });
        } else {
          this.sampleSearched.pop(receivedIdSample);
          //this.sampleSearched = this.sampleSearched.filter(sample => sample._id != receivedIdSample);
          Samples.findSearchPage(`${process.env.VUE_APP_ROUTE_SAMPLE}/${process.env.VUE_APP_ROUTE_PAGE}/${process.env.VUE_APP_ROUTE_SEARCH}?limit=${this.pages.limit}&offset=${this.pages.offset}`, this.sampleSearched).then(
            (response) => {
              this.samples = response.data.results;
              this.pages.totalSamples = response.data.total;
              this.pages.offset = response.data.offset;
              this.pages.previousPage = response.data.previousUrl;
              this.pages.nextPage = response.data.nextUrl;
              this.currentPage = this.pages.offset / this.pages.limit + 1;
              this.tableIsOpen = true;
            }
          );
        }
      }
    },
    listAll() {
      Samples.listAll().then((response) => {
        this.samples = response.data;
        this.cloneSamples = this.samples;
        this.tableIsOpen = true;
      });
    },
    listAllPage() {
      this.tableIsOpen = false;
      Samples.findAllPage().then((response) => {
        this.samples = response.data.results;
        this.pages.totalSamples = response.data.total;
        this.pages.offset = response.data.offset;
        this.pages.limit = response.data.limit;
        this.pages.previousPage = response.data.previousUrl;
        this.pages.nextPage = response.data.nextUrl;
        this.tableIsOpen = true;
        this.currentPage = 1;
        this.modeSearch = false;
      });
    },
    async searchSample() {
      let allSamples = [];
      this.tableIsOpen = false;
      await Samples.listAll().then((response) =>
        response.data.map((sample) => allSamples.push(sample))
      );
      this.sampleSearched = SearchSample.search(
        this.searchInput,
        allSamples,
        this.opcInput
      );
      console.log(this.sampleSearched);
      Samples.findSearchPage("amostras/page/busca", this.sampleSearched).then(
        (response) => {
          this.samples = response.data.results;
          this.pages.totalSamples = response.data.total;
          this.pages.offset = response.data.offset;
          this.pages.previousPage = response.data.previousUrl;
          this.pages.nextPage = response.data.nextUrl;
          this.tableIsOpen = true;
        }
      );
      this.currentPage = 1;
      this.modeSearch = true;

      // this.currentPage = 1;
      // this.samples = this.cloneSamples;
      // this.samples = SearchSample.search(
      //   this.searchInput,
      //   this.samples,
      //   this.opcInput
      // );
    },
    sendEditSample(sample) {
      this.sample = sample;
      this.$emit("isEdit", true);
      this.$emit("sampleForEdit", this.sample);
    },
    refreshTable() {
      this.tableIsOpen = false;
      this.nomeVulgar = "";
      this.listAll();
    },
    nextPage() {
      // if (this.currentPage < this.totalPages) {
      //   this.currentPage++;
      // }
      if (this.pages.nextPage) {
        this.tableIsOpen = false;
        if (!this.modeSearch) {
          Samples.findAllPage(this.pages.nextPage).then((response) => {
            this.samples = response.data.results;
            this.pages.totalSamples = response.data.total;
            this.pages.offset = response.data.offset;
            this.pages.previousPage = response.data.previousUrl;
            this.pages.nextPage = response.data.nextUrl;
            this.currentPage = this.pages.offset / this.pages.limit + 1;
            this.tableIsOpen = true;
          });
        } else {
          Samples.findSearchPage(this.pages.nextPage, this.sampleSearched).then(
            (response) => {
              this.samples = response.data.results;
              this.pages.totalSamples = response.data.total;
              this.pages.offset = response.data.offset;
              this.pages.previousPage = response.data.previousUrl;
              this.pages.nextPage = response.data.nextUrl;
              this.currentPage = this.pages.offset / this.pages.limit + 1;
              this.tableIsOpen = true;
            }
          );
        }
      }
    },
    previousPage() {
      // if (this.currentPage > 1) {
      //   this.currentPage--;
      // }
      if (this.pages.previousPage) {
        this.tableIsOpen = false;
        if (!this.modeSearch) {
          Samples.findAllPage(this.pages.previousPage).then((response) => {
            this.samples = response.data.results;
            this.pages.totalSamples = response.data.total;
            this.pages.offset = response.data.offset;
            this.pages.previousPage = response.data.previousUrl;
            this.pages.nextPage = response.data.nextUrl;
            this.currentPage = this.pages.offset / this.pages.limit + 1;
            this.tableIsOpen = true;
          });
        } else {
          Samples.findSearchPage(
            this.pages.previousPage,
            this.sampleSearched
          ).then((response) => {
            this.samples = response.data.results;
            this.pages.totalSamples = response.data.total;
            this.pages.offset = response.data.offset;
            this.pages.previousPage = response.data.previousUrl;
            this.pages.nextPage = response.data.nextUrl;
            this.currentPage = this.pages.offset / this.pages.limit + 1;
            this.tableIsOpen = true;
          });
        }
      }
    },
    async goToPage(page) {
      // if (page != "..") this.currentPage = page;
      if (page != "..") {
        this.tableIsOpen = false;
        this.pages.offset = (page - 1) * this.pages.limit;
        const urlBusca = this.modeSearch ? "/busca" : "";
        const urlPage = `/amostras/page${urlBusca}?limit=${this.pages.limit}&offset=${this.pages.offset}`;
        if (!this.modeSearch) {
          Samples.findAllPage(urlPage).then((response) => {
            this.samples = response.data.results;
            this.pages.previousPage = response.data.previousUrl;
            this.pages.nextPage = response.data.nextUrl;
            this.currentPage = page;
            this.tableIsOpen = true;
          });
        } else {
          Samples.findSearchPage(urlPage, this.sampleSearched).then(
            (response) => {
              this.samples = response.data.results;
              this.pages.previousPage = response.data.previousUrl;
              this.pages.nextPage = response.data.nextUrl;
              this.currentPage = page;
              this.tableIsOpen = true;
            }
          );
        }
      }
    },
    openModalSample(sample) {
      this.sample = sample;
      this.openModal = true;
    },
    closedModal(closedModal) {
      this.openModal = closedModal;
    },
    openModalDelSample(sample) {
      this.sample = sample;
      this.openModalDel = true;
    },
    closedModalDelSample(closedModal) {
      this.openModalDel = closedModal;
    },
    receivedOpcInput(receivedOpcInput) {
      this.opcInput = receivedOpcInput;
    },
    receivedSearchInput(receivedSearchInput) {
      this.searchInput = receivedSearchInput;
      this.searchSample();
      console.log(this.opcInput, this.searchInput);
    },
  },
  watch: {
    openTable(newOpenTable) {
      this.dataOpenTable = newOpenTable;
    },
  },
});
</script>
  
<style scoped>
.container {
  display: none;
}
.container.openTable {
  display: block;
}

.inTablet,
.inLaptop,
.inDesktop {
  display: none;
}

.loading-area {
  padding-top: 200px;
  display: block;
}

.loading-area.close-loading-area {
  display: none;
}

/* ----------- AREA DA TABELA DE AMOSTRAS */
.table-area {
  margin-top: 1em;
  max-height: 500px;
  overflow-y: scroll;
  display: none;
}

.table-area.show {
  display: block;
}

.tableSample {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

.tableSample thead {
  height: 55px;
  font-weight: 300;
  /* text-align: left; */
  font-size: 15px;
  color: #213140;
}

.tableSample thead t > {
  padding-left: 10px;
}

.tableSample tbody {
  text-align: left;
  font-weight: 400;
  font-size: 11pt;
  color: #213140;
}

.tableSample tbody tr {
  height: 40px;
  border-top: 1px solid rgba(33, 49, 64, 0.5);
}

.link-modal:hover {
  cursor: pointer;
}

.table-sample-nc {
  text-decoration: underline;
  font-style: italic;
}

.tableSample tbody tr td {
  transition: background-color 0.2s ease-in-out;
  padding-left: 10px;
  /* margin-left: 10px; */
}

.tableSample tbody tr:hover > td {
  background: rgba(33, 49, 64, 0.75);
  color: #fafafa;
}

.tableSample tbody tr:nth-child(even) {
  background: #f3f3f3;
}

.table-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 8px 10px 8px 8px;
}

.table-action {
  border: none;
  background: none;
  color: #213140;
}

/* ----------- AREA DA PAGINAÇÃO DA TABELA */
.pag-area {
  display: none;
  justify-content: center;
  gap: 15px;
  padding-top: 1.5em;
}
.pag-area.show {
  display: flex;
}

.pag-btn-action {
  border: none;
  background: none;
  font-size: 12pt;
  color: #213140;
}

.pag-numbers {
  display: flex;
  gap: 12px;
  font-size: 12pt;
  font-weight: 400;
  color: #999898;
}
.current-page {
  font-weight: bold;
  color: #213140;
  border-bottom: 1px solid;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .inTablet {
    display: table-cell;
  }

  .inptSearch::-webkit-search-cancel-button {
    height: 22px;
    width: 22px;
    font-size: 16pt;
  }

  /* ----------- AREA DA TABELA DE AMOSTRAS */
  .table-area {
    max-height: 550px;
  }

  .tableSample thead {
    height: 60px;
    font-size: 16px;
  }

  .tableSample thead t > {
    padding-left: 12px;
  }

  .btnRefresh {
    display: flex;
    justify-content: end;
  }

  .tableSample tbody t > {
    padding-left: 12px;
  }

  .table-actions {
    gap: 12px;
    padding: 8px 12px 8px 8px;
  }

  /* ----------- AREA DA PAGINAÇÃO DA TABELA */
  .pag-area {
    gap: 16px;
  }

  .pag-btn-action {
    font-size: 13pt;
  }

  .pag-numbers {
    gap: 14px;
    font-size: 13pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .inLaptop {
    display: table-cell;
  }
  .table-actions {
    gap: 18px;
  }
  .act-edit i,
  .act-del i {
    transition: color 0.2s ease-in-out;
  }
  .act-edit:hover i {
    cursor: pointer;
    color: #8ad547;
  }
  .act-del:hover i {
    cursor: pointer;
    color: #be3737;
  }

  /* ----------- AREA DA PAGINAÇÃO DA TABELA */

  .pag-btn-action i {
    transition: color 0.2s ease-in-out;
  }

  .pag-btn-action:hover i {
    cursor: pointer;
    color: #999898;
  }

  .pag-number {
    transition: color 0.2s ease-in-out;
  }
  .pag-number:hover {
    color: rgba(33, 49, 64, 1);
    cursor: pointer;
  }
}

/* -------------------------------- DESKTOP  -------------------------------- */
@media screen and (min-width: 1700px) {
  .inDesktop {
    display: table-cell;
  }

  .table-area {
    max-height: 900px;
  }
}
</style>