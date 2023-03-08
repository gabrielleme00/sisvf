<template>
  <ul class="menu">
    <li v-for="item in menu" :key="item.url">
      <MenuItem :data="item" />
    </li>
  </ul>
</template>

<script>
import MenuItem from "./MenuItem.vue"

export default {
  name: "Menu",
  components: {
    MenuItem,
  },
  data() {
    return {
      menu: [
        {
          text: "Cadastro",
          icon: "fa-solid fa-database",
          expanded: false,
          children: [
            {
              text: "Base Cargo",
              url: "/dashboard/base-cargo",
              icon: "fa-solid fa-briefcase",
            },
            {
              text: "Base Departamento",
              url: "/dashboard/base-departamento",
              icon: "fa-solid fa-building",
            },
            {
              text: "Colaborador",
              url: "/dashboard/colaborador",
              icon: "fa-solid fa-user",
            },
            {
              text: "Checklist",
              icon: "fa-solid fa-list-check",
              expanded: false,
              children: [
                {
                  text: "Finalidade",
                  url: "/dashboard/base-finalidade-checklist",
                  icon: "fa-solid fa-bullseye",
                },
                {
                  text: "Grupo",
                  url: "/dashboard/base-grupo-checklist",
                  icon: "fa-solid fa-users",
                },
                {
                  text: "Item",
                  url: "/dashboard/base-item-checklist",
                  icon: "fa-solid fa-circle-check",
                },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
ul {
  padding-left: 0;

  li {
    font-size: 18px;
    list-style-type: none;
    overflow-y: auto;

    .folder {
      padding-left: 0;
    }
  }
}
</style>
