<template>
  <router-link
    v-if="!data.children"
    class="menu-item"
    :to="data.url"
    active-class="active"
  >
    <font-awesome-icon
      v-if="data.icon"
      :icon="data.icon"
      class="menu-item-icon"
    />
    <span class="text">{{ data.text }}</span>
  </router-link>
  <div v-else class="folder">
    <div class="folder-link" @click="data.expanded = !data.expanded">
      <font-awesome-icon
        v-if="data.icon"
        :icon="data.icon"
        class="menu-item-icon"
      />
      <span class="text">{{ data.text }}</span>
      <font-awesome-icon
        :icon="
          data.expanded ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'
        "
        class="folder-icon"
      />
    </div>
    <ul class="folder-items" v-if="data.expanded">
      <li v-for="item in data.children" :key="item.url">
        <MenuItem :data="item" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({
        url: "#",
        icon: null,
        text: "",
        expanded: false,
        children: [],
      }),
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

li {
  font-size: 18px;
  list-style-type: none;
  overflow-y: auto;
}

.active {
  background-color: @nord2;
}

.menu-item,
.folder {
  display: block;
  height: 100%;
  margin-left: 10px;
  padding: 10px 0 10px 1rem;

  .text {
    user-select: none;
  }
}

.menu-item,
.folder-link {
  cursor: pointer;
}

.menu-item {
  color: @nord4;
  font-weight: 400;
  border-left: 1px solid @nord3;

  &:hover {
    background-color: @nord3;
  }

  &-icon {
    display: inline-block;
    width: 20px;
    margin-right: 20px;
    text-align: center;
  }
}

.folder {
  color: @nord6;
  font-weight: 700;

  &-icon {
    margin-left: 10px;
  }

  &-items {
    padding-left: 0;
  }
}
</style>
