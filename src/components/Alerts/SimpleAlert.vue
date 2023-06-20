<template>
  <div
    class="alert"
    :class="{ active: dataIsActive }"
    :style="{ '--background-color': backgroundColor }"
  >
    <slot></slot>
  </div>
</template>
  
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SimpleAlert",
  emits: ["closeActive"],
  props: {
    isActive: {
      type: Boolean,
      required: true,
    },
    backgroundColor: {
      type: String,
      default: "#213140",
    },
  },
  data() {
    return {
      dataIsActive: false,
    };
  },
  watch: {
    isActive(newIsActive) {
      this.dataIsActive = newIsActive;
      setTimeout(() => {
        this.dataIsActive = false;
      }, 3000);
      this.$emit("closeActive", this.dataIsActive);
    },
  },
});
</script>
  
<style scoped>
.alert {
  display: none;
  padding: 19px 60px;
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: var(--background-color, #213140);
  border-radius: 3px;
  color: #fafafa;
  animation: slidein 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.9);
}

.alert.active {
  display: block;
}

@keyframes slidein {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.message::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  animation: time 3s forwards;
}

@keyframes time {
  0% {
    width: 0;
  }

  100% {
    width: 100%;
  }
}
</style>