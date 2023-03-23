<template>
  <h2>Regional</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idRegional", altKey: "ID_REGIONAL", title: "ID", hidden: true, readonly: true },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "dtFormacao", altKey: "DT_FORMACAO", title: "Data de Formação", type: "datetime-local", format: "date" },
  { key: "qtdeCidades", altKey: "QTDE_CIDADES", title: "Qtde. Titulares", type: "number" },
  { key: "criadopor", title: "Criado por", readonly: true },
  { key: "alteradopor", title: "Alterado por", readonly: true },
  { key: "dtInsercaoEdicao", title: "Data de Inserção/Edição", type: "datetime-local", format: "datetime", readonly: true },
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
