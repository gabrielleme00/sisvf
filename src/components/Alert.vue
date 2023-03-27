<template>
  <div :class="`alert ${type}`">
    <font-awesome-icon
      :icon="`fa-solid ${icon}`"
      size="lg"
      class="alert-icon"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: "info" },
  },
  computed: {
    icon() {
      return {
        info: "fa-circle-info",
        warning: "fa-circle-exclamation",
        success: "fa-circle-check",
        danger: "fa-triangle-exclamation",
        loading: "fa-spinner",
      }[this.type]
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.alert {
  background-color: @nord1;
  border-radius: 3px;
  border-top: 1px solid @nord2;
  border-left: 1px solid @nord2;
  // box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);
  padding: 1rem;

  &-icon {
    margin-right: 1rem;
  }

  &.info {
    color: @nord4;
  }

  &.warning {
    color: @nord13;
  }

  &.success {
    color: @nord14;
  }

  &.danger {
    color: @nord11;
  }

  &.loading {
    color: @nord4;
    svg {
      animation: rotation 2s infinite linear;
    }
  }
}
</style>
