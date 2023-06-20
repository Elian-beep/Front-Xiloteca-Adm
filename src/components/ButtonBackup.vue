<template>
  <button @click="exportToExcel" class="btn-backup">
    <i class="fa-solid fa-file-export"></i>
  </button>
</template>

<script>
import { defineComponent } from "vue";
import Samples from "../services/samples.js";
import createXlsx from "../services/createXlsx.js";

export default defineComponent({
  name: "ButtonBackup",
  data() {
    return {
      samples: [],
    };
  },
  methods: {
    exportToExcel() {
      Samples.listAll().then((response) => {
        this.samples = response.data;
        createXlsx.createXlsx(this.samples);
      });
    },
  },
});
</script>

<style scoped>
.btn-backup {
  background: none;
  padding: 0;
  border: none;
}

.btn-backup > i {
  transition: color 0.2s ease-in-out;
}

.btn-backup i {
  color: #228B22;
  font-size: 20pt;
}

.btn-backup:hover i {
  cursor: pointer;
  color: #006400;
}

/* -------------------------------- TABLET -------------------------------- */
@media screen and (min-width: 481px) {
  .btn-backup i {
    font-size: 22pt;
  }
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .btn-backup i {
    font-size: 25pt;
  }

}
</style>