<template>
    <aside class="sidebar">
      <h1 class="logo">SisVF</h1>
    </aside>
</template>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.sidebar {
  width: 200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: @nord2;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);

  .logo {
    font-size: 2rem;
    font-weight: bold;
    color: @nord4;
    text-align: center;
  }
}
</style>