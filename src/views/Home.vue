<template>
  <LogoutAlert
    :token="tokenKey"
    :isOpen="receivedIsOpen"
    @closeConfirm="receivedOpenCOnfirm"
  />
  <Header :tokenKey="tokenKey" @openConfirm="receivedOpenCOnfirm" />
  <Container>
    <ToggleSwitch
      @show-table="receivedShowTable"
      @show-form="receivedShowForm"
      :is-edit="dataIsEdit"
    />
    <div class="content">
      <div class="cont-samples">
        <Samples
          :openTable="receivedTable"
          :token="tokenKey.token"
          @isEdit="receivedIsEdit"
          @sampleForEdit="receivedSample"
        />
      </div>
      <div class="cont-form">
        <FormNewSample
          :token="tokenKey.token"
          :openForm="receivedForm"
          :sampleReceived="sample"
        />
      </div>
    </div>
  </Container>
</template>

<script>
import { defineComponent } from "vue";
import Admin from "../services/admin.js";

import Container from "@/components/Container.vue";
import Header from "@/components/Header.vue";
import ToggleSwitch from "@/components/Table-Form/ToggleSwitch.vue";
import Samples from "@/components/Table-Form/Samples.vue";
import FormNewSample from "@/components/Table-Form/FormNewSample.vue";
import LogoutAlert from "../components/Alerts/LogoutAlert.vue";

export default defineComponent({
  name: "viewHome",
  components: {
    Header,
    Container,
    ToggleSwitch,
    Samples,
    FormNewSample,
    LogoutAlert,
  },
  data() {
    return {
      sample: {},
      receivedTable: true,
      receivedForm: false,
      dataIsEdit: false,
      receivedIsOpen: false,
      tokenKey: {
        _id: "",
        token: "",
      },
    };
  },
  mounted() {
    this.beforeRouteEnter();
  },
  methods: {
    beforeRouteEnter() {
      if (!this.$route.query.token) {
        this.$router.push({ path: "/" });
      }
      Admin.checkAndListToken(this.$route.query.token)
        .then((res) => {
          res.data.map((item) => {
            if (this.$route.query.token == item.token) {
              this.tokenKey = item;
            }
          });
          // console.log("top, tu ta logado, este é o token: ", this.tokenKey);
        })
        .catch((error) => {
          this.$router.push({ path: "/" });
          console.log(error.response.data);
          this.tokenKey = {};
        });
    },
    receivedShowTable(showTable) {
      this.receivedTable = showTable;
      this.receivedForm = !this.receivedForm;
      // console.log(`Form: ${this.receivedForm} | Table: ${this.receivedTable}`);
    },
    receivedShowForm(showForm) {
      this.receivedForm = showForm;
      this.receivedTable = !this.receivedTable;
      // console.log(`Form: ${this.receivedForm} | Table: ${this.receivedTable}`);
    },
    receivedIsEdit(isEdit) {
      console.log({ isEdit: isEdit });
      this.dataIsEdit = !this.dataIsEdit;
    },
    receivedSample(sample) {
      this.sample = sample;
    },
    receivedOpenCOnfirm(received) {
      this.receivedIsOpen = received;
    },
  },
});
</script>

<style scoped>
/* -------------------------------- DESKTOP  -------------------------------- */
@media screen and (min-width: 1700px) {
  .content {
    display: flex;
    justify-content: space-between;
  }
  .cont-samples{
    width: 65%;
  }

  .cont-form{
    width: 33%;
  }
}
</style>