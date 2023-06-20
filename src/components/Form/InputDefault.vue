<template>
  <input class="inpt" :type="propType" :placeholder="propPlaceholder" />
</template>
      
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputDefault",
  components: {},
  props: {
    propType: {
      type: String,
      required: true,
    },
    propPlaceholder: {
      type: String,
      required: true,
    },
  },
});
</script>
      
<style scoped>
.inpt {
  width: 100%;
  background: #f3f3f3;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
}

.inpt::placeholder{
  color: rgba(33, 49, 64, 0.5);
}
</style>