<template>
  <h2>Base Departamento</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idBaseDepartamento", title: "ID", hidden: true, readonly: true },
  { key: "ativo", title: "Ativo", type: 'checkbox' },
  { key: "descricao", title: "Descrição" },
  { key: "criadoem", title: "Criado Em", format: "date" },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "BaseDepartamento",
      headers,
    }
  },
}
</script>
