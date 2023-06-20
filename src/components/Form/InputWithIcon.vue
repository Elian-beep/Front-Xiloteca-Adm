<template>
  <div class="area-input">
    <i :class="icon"></i>
    <input
      :v-model="vmodel"
      :type="typeInput"
      :placeholder="placeholderInput"
    />
  </div>
</template>
  
  <script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputWithIcon",
  props: {
    typeInput: {
      type: String,
      required: true,
    },
    placeholderInput: {
      type: String,
      required: true,
    },
    vmodel: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: false,
    },
  },
});
</script>
  
  <style scoped>
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

@media screen and (min-width: 769px) {
  /* LAPTOP */
  .area-input {
    font-size: 16px;
  }

  .area-input i {
    left: 20px;
  }

  .area-input input {
    padding: 12px 20px 12px 56px;
  }
}

@media screen and (min-width: 1024px) {
  /* DESKTOP */
  .area-input {
    font-size: 18px;
  }
}
</style>