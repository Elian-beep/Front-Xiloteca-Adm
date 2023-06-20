<template>
    <textarea class="inptTxtArea" :placeholder="propPlaceholder"></textarea>
</template>
        
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TxtareaDefault",
  components: {},
  props: {
    propPlaceholder: {
      type: String,
      required: true,
    },
  },
});
</script>
        
<style scoped>
.inptTxtArea {
  width: 100%;
  height: 71px;
  background: #f3f3f3;
  border: 0.5px solid #213140;
  border-radius: 2px;
  padding: 6px 8px;
  font-size: 11pt;
  font-weight: 400;
  outline: none;
}

.inptTxtArea::placeholder {
  color: rgba(33, 49, 64, 0.5);
}
</style>