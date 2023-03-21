<template>
  <h2>Regional</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idRegional", altKey: "ID_CIDADE", title: "ID", hidden: true, readonly: true },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "dtFormacao", altKey: "DT_FORMACAO", title: "Data de Formação", format: "date" },
  { key: "qtdeCidades", altKey: "QTDE_CIDADES", title: "Qtde. Titulares", type: "number" },
  { key: "criadopor", title: "Criado Por", readonly: true },
  { key: "criadoem", title: "Data de Formação", format: "date", readonly: true },
  { key: "dtInsercaoEdicao", title: "Data de Inserção/Edição", format: "datetime", readonly: true },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "Regional",
      headers,
    }
  },
}
</script>
