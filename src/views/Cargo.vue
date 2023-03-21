<template>
  <h2>Cargo</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idCargo", altKey: "ID_CARGO", title: "ID", hidden: true, readonly: true },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "cidade", altKey: "CIDADE", title: "Cidade", readonly: true },
  { key: "titular", altKey: "TITULAR", title: "Titular", type: "number" },
  { key: "criadopor", title: "Criado por", readonly: true },
  { key: "criadoem", title: "Criado em", format: "date", readonly: true },
  { key: "idCidade", altKey: "ID_CIDADE", title: "ID", hidden: true },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "Cargo",
      headers,
    }
  },
}
</script>
