<template>
  <aside class="sidebar">
    <router-link to="/dashboard">
      <h1 class="logo">SisVF - CCB</h1>
    </router-link>
    <Menu />
  </aside>
</template>

<script>
import Menu from "./Menu.vue"

export default {
  name: 'Sidebar',
  components: {
    Menu,
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.sidebar {
  min-width: 300px;
  width: 300px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: @nord4;
  background-color: @nord1;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  padding-left: 2rem;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: @nord6;
}
</style>
