<template>
  <div class="container" :class="{ isOpen: dataIsOpen }">
    <div class="content">
      <SubTitle text="Tem certeza que deseja sair?" />
      <div class="btns">
        <button class="btn-confirm" @click="logOff">Sim</button>
        <button class="btn-close" @click="close">Não</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Admin from "../../services/admin.js";
import SubTitle from "../Titles/SubTitle.vue";

export default defineComponent({
  name: "LogoutAlert",
  components: { SubTitle },
  emits: ["closeConfirm"],
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dataIsOpen: false,
    };
  },
  methods: {
    close() {
      this.dataIsOpen = false;
      this.$emit("closeConfirm", false);
    },
    logOff() {
      // Admin.delToken(this.token)
      //   .then((res) => {
      //     if (res.status !== 200) {
      //       console.log("não excluido");
      //     }
      //     this.$router.push({ path: "/" });
      //   })
      //   .catch((error) => {
        //     console.log(error);
        //   });
        localStorage.setItem('token', '');
        this.$router.push({ path: "/" });

    },
  },
  watch:{
    isOpen(newIsOpen){
      this.dataIsOpen = newIsOpen;
    }
  }
});
</script>

<style scoped>
.container {
  display: none;
  background: rgba(30, 31, 30, 0.5);
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 99;
}

.container.isOpen {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background: #fafafa;
  padding: 1em;
}

.btns{
  margin-top: 1.5em;
  display: flex;
  justify-content: space-between;
}

.btn-confirm{
  background: #e33737;
  border: 1px solid #e33737;
  color: #fafafa;
}

.btn-close{
  border: 1px solid #213140;
  color: #213140;
  background: #fafafa;

}

.btns button{
  padding: 6px;
  height: 35px;
  width: 90px;
  border-radius: 4px;
  font-size: 11pt;
  font-weight: 400;

  cursor: pointer;
  transition: background-color ease-in .2s;
}

.btn-close:hover{
  background: #213140;
  color: #fafafa;
}

.btn-confirm:hover{
  background: #6a1616;
}



</style>