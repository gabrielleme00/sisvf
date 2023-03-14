<template>
  <transition>
    <div class="modal" v-if="show" @click="handleClickOutside">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <font-awesome-icon
            icon="fa-solid fa-xmark-circle"
            size="xl"
            class="modal-close-icon"
            @click="close"
          />
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: { type: String, default: '' },
    show: { type: Boolean, default: false },
    close: { type: Function, default: () => {} },
  },
  methods: {
    handleClickOutside(event) {
      const isOutside = event.target.className === 'modal'
      if (isOutside) this.close()
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";
@import "@/style.less";

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
  display: flex;
  flex-direction: column;
  background-color: @nord1;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 50%;
  height: 80%;
  overflow: hidden;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.modal-close-icon {
  color: @nord4;
  cursor: pointer;
  &:hover {
    opacity: @btn-hover-opacity;
  }
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
