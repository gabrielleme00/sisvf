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
          icon: "fa-table-list",
          expanded: false,
          children: [
            {
              text: "Verificacao",
              url: "/dashboard/verificacao",
              icon: "fa-check-circle",
            },
            {
              text: "Colaborador",
              url: "/dashboard/colaborador",
              icon: "fa-address-card",
            },
            {
              text: "Cargo",
              url: "/dashboard/cargo",
              icon: "fa-briefcase",
            },
            {
              text: "Departamento",
              url: "/dashboard/departamento",
              icon: "fa-building",
            },
            {
              text: "Cidade",
              url: "/dashboard/cidade",
              icon: "fa-map-location-dot",
            },
            {
              text: "Regional",
              url: "/dashboard/regional",
              icon: "fa-map",
            },
            {
              text: "Base",
              icon: "fa-database",
              expanded: false,
              children: [
                {
                  text: "Cargo",
                  url: "/dashboard/base-cargo",
                  icon: "fa-briefcase",
                },
                {
                  text: "Departamento",
                  url: "/dashboard/base-departamento",
                  icon: "fa-building",
                },
                {
                  text: "Checklist",
                  icon: "fa-list-check",
                  expanded: false,
                  children: [
                    {
                      text: "Finalidade",
                      url: "/dashboard/base-finalidade-checklist",
                      icon: "fa-bullseye",
                    },
                    {
                      text: "Grupo",
                      url: "/dashboard/base-grupo-checklist",
                      icon: "fa-users",
                    },
                    {
                      text: "Item",
                      url: "/dashboard/base-item-checklist",
                      icon: "fa-file-lines",
                    },
                  ],
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
@import "node_modules/nord/src/lesscss/nord.less";

ul {
  padding-left: 0;

  li {
    font-size: 18px;
    list-style-type: none;
    overflow-y: auto;

    .folder {
      padding-left: 0;
      margin-left: 0;
    }
  }
}
</style>
