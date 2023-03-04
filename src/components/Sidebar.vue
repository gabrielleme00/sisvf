<template>
  <aside class="sidebar">
    <router-link to="/dashboard">
      <h1 class="logo">SisVF - CCB</h1>
    </router-link>
    <ul class="links">
      <li v-for="link in links" :key="link.url">
        <router-link :to="link.url">
          <font-awesome-icon :icon="link.icon" class="link-icon" />
          <span class="link-text">{{ link.text }}</span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          text: "Colaboradores",
          url: "/dashboard/contributors",
          icon: "fa-solid fa-user",
        },
        {
          text: "Verificações",
          url: "/dashboard",
          icon: "fa-solid fa-list-check",
        },
        {
          text: "Regionais",
          url: "/dashboard",
          icon: "fa-solid fa-map",
        },
        {
          text: "Departamentos",
          url: "/dashboard",
          icon: "fa-solid fa-users",
        },
        {
          text: "Cargos",
          url: "/dashboard",
          icon: "fa-solid fa-briefcase",
        },
        {
          text: "Cidades",
          url: "/dashboard",
          icon: "fa-solid fa-city",
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.sidebar {
  min-width: 320px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: @nord4;
  background-color: @nord1;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);

  .logo {
    font-size: 2rem;
    font-weight: bold;
    margin-left: 4rem;
    color: @nord6;
  }

  ul.links {
    padding: 0;
    overflow-y: auto;

    li {
      font-size: 18px;
      list-style-type: none;

      a {
        display: block;
        height: 100%;
        padding: 12px 4rem;
      }
    }

    li:hover {
      cursor: pointer;
      background-color: @nord3;
    }

    .link-icon {
      display: inline-block;
      width: 20px;
      margin-right: 20px;
      text-align: center;
    }
  }
}
</style>
