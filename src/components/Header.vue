<template>
  <header>
    <ul class="header-items">
      <li class="header-item">
        <button title="Sair" @click="handleLogout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="lg" />
        </button>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapActions } from "vuex"

export default {
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      try {
        await this.logout()
        this.$router.push("/login")
      } catch (error) {
        throw error
        alert("Não foi possível fazer o logout...")
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

header {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
}

.header-items {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  justify-content: end;
  margin: 0;
}

.header-item {
  list-style-type: none;
  display: flex;
  align-items: center;

  button {
    margin: 0;
    height: 100%;
    background-color: @nord11;
    width: 60px;
    height: 60px;
    border-radius: 10px;
  }
}
</style>
