<template>
  <h2>Base Cargo</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idBaseCargo", altKey: "ID_BASE_CARGO", title: "ID", hidden: true, readonly: true },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "titular", altKey: "TITULAR", title: "Titular", type: "number" },
  { key: "criadoem", altKey: "CRIADOEM", title: "Criado Em", format: "date", readonly: true },
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
