<template>
  <h2>Base Cargo</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idBaseCargo", title: "ID", hidden: true, readonly: true },
  { key: "ativo", title: "Ativo", type: "checkbox" },
  { key: "descricao", title: "Descrição" },
  { key: "titular", title: "Titular", type: "number" },
  { key: "criadoem", title: "Criado Em", format: "date", readonly: true },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "BaseCargo",
      headers,
    }
  },
}
</script>
