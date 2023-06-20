<template>
  <SimpleAlert :isActive="activeAlert" >{{ alertMsg }}</SimpleAlert>
  <div class="area-form">
    <SubTitle text="Fazer Login" class="subTitle" />
    <form class="form-login" @submit.prevent="login">
      <div class="inputs">
        <div class="area-input">
          <i class="fa-solid fa-user"></i>
          <input v-model="admin.usuario" type="text" placeholder="Usuário" />
        </div>
        <!-- <InputWithIcon
          icon="fa-solid fa-user"
          typeInput="text"
          placeholderInput="Usuário"
        /> -->
        <div class="area-input">
          <i class="fa-solid fa-lock"></i>
          <input v-model="admin.senha" type="password" placeholder="Senha" />
        </div>
        <!-- <InputWithIcon
          icon="fa-solid fa-lock"
          typeInput="password"
          placeholderInput="Senha"
        /> -->
      </div>

      <button type="submit" class="btn-login">Entrar</button>
      <div class="miniLoading" :class="{ isLoading: isLoading }">
        <MiniLoading />
      </div>
    </form>
  </div>
</template>
  
<script>
import { defineComponent } from "vue";
import SubTitle from "../Titles/SubTitle.vue";
import Admin from "../../services/admin.js";
import MiniLoading from "../Loadings/MiniLoading.vue";
import SimpleAlert from "../Alerts/SimpleAlert.vue";

export default defineComponent({
  name: "FormLogin",
  components: { SubTitle, MiniLoading, SimpleAlert },
  data() {
    return {
      admin: {
        _di: "",
        usario: "",
        senha: "",
      },
      token: "",
      isLoading: false,
      activeAlert: false,
      alertMsg: ""
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      // AUTENTICAÇÃO: VERIFICAR OS DADOS E GERAR O NOVO TOKEN
      Admin.authLogin(this.admin)
        .then((response) => {
          this.token = response.data.token;
          this.admin._di = response.data.Admin;
          if (!this.token) {
            return console.log("Token não gerado");
          }
          // REDIRECIONAMENTO: MUDAR A PÁGINA E ENVIAR JUNTO O TOKEN GERADO

          Admin.redirectAdmin(this.token, this.admin._di)
            .then(() => {
              this.$router.push({
                path: "/home",
                query: {
                  token: this.token,
                },
              });
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        })
        .catch((error) => {
          if (error.response.status === 422 || error.response.status === 404) {
            this.activeAlert = !this.activeAlert;
            this.alertMsg = error.response.data.msg;
            this.isLoading = false;
          }
        });
    },
  },
});
</script>
  
<style scoped>
.area-form {
  width: 296px;
  background: #fafafa;
  box-shadow: 0px 0px 20px 2px rgba(52, 115, 85, 0.1);
  border-radius: 4px;
  padding: 40px 24px;
}

.subTitle {
  text-align: center;
}
.form-login {
  display: flex;
  flex-direction: column;
}

.inputs {
  margin-top: 40px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.area-input {
  position: relative;
  display: flex;
  align-items: center;
  border: 0.5px solid #213140;
  border-radius: 2px;
}

.area-input i {
  position: absolute;
  left: 16px;
}

.area-input input {
  width: 100%;
  padding: 8px 16px 8px 40px;
  background: none;
  border: none;
}

.btn-login {
  background: #213140;
  border-radius: 2px;
  padding: 8px 34px;
  font-size: 14px;
  color: #fafafa;
  margin-bottom: 23px;
  transition: background-color 0.3s ease-in-out;
}

.btn-login:hover {
  background: #fafafa;
  color: #213140;
  cursor: pointer;
}

.miniLoading {
  display: none;
  justify-content: center;
}

.miniLoading.isLoading {
  display: flex;
}

.btn-title {
  display: block;
}
.btn-title.isLoading {
  display: none;
}

/* -------------------------------- NOTEBOOK -------------------------------- */
@media screen and (min-width: 769px) {
  .area-form {
    width: 359px;
    padding: 54px 24px;
  }

  .inputs {
    gap: 24px;
  }

  .area-input {
    font-size: 16px;
  }

  .area-input i {
    left: 20px;
  }

  .area-input input {
    padding: 12px 20px 12px 56px;
  }

  .btn-login {
    padding: 12px 34px;
    font-size: 18px;
    margin-bottom: 32px;
  }
}

/* -------------------------------- DESKTOP -------------------------------- */
@media screen and (min-width: 1024px) {
  .area-form {
    width: 471px;
    padding: 54px 32px;
  }

  .btn-login {
    font-size: 24px;
  }

  .area-input {
    font-size: 18px;
  }
}
</style>