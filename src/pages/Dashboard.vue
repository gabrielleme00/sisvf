<template>
  <div class="container">
    <Sidebar />
    <main>
      <Header />
      <section class="content">
        <router-view />
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Sidebar from "@components/Sidebar/Component.vue"
import Header from "@components/Header.vue"

export default {
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      permissions: { type: Array, default: () => [] }
    }
  },
  methods: {
    ...mapActions(['readRecords']),
    async getPermissions() {
      try {
        await this.readRecords('ListPermission')
      } catch (error) {
        const msg = error.response.data.error
        alert(msg)
        if (msg == "Sua sessão expirou! Realize o login novamente.") {
          this.$router.push('/login')
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.container {
  display: flex;
  flex-direction: row;
}

main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem;
}

.content {
  padding: 0 2rem;
  max-width: 70vw;
}
</style>
