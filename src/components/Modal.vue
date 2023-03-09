<template>
  <transition>
    <div class="modal" v-if="show">
      <div class="modal-content">
        <slot></slot>
        <button @click="close">Close</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
    close: { type: Function, default: () => {} },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.modal {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: @nord1;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 80%;
  height: 80%;
}

/* Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
