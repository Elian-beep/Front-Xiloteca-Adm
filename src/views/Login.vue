<template>
    <header>
        <a class="btn-back" href="https://xilotecacv.vercel.app/#/" ><i class="fa-solid fa-arrow-left"></i>Acessar Xiloteca</a>
    </header>
    <ContainerLogin>
        <LogoSX :isVisible="true" />
        <FormLogin />
    </ContainerLogin>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import ContainerLogin from "../components/ContainerLogin.vue";
import LogoSX from "../components/Titles/LogoSX.vue";
import FormLogin from "../components/Form/FormLogin.vue";

export default defineComponent({
  name: "viewLogin",
  components: { ContainerLogin, LogoSX, FormLogin },
});
</script>
  
<style>
header {
  height: 60px;
  background: #f3f3f3;
  padding: 12px;
  display: flex;
  justify-content: left;
}

.btn-back{
  border: 1px solid #213140;
  color: #213140;
  background: none;
  padding: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>