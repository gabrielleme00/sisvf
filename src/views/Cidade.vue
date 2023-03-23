<template>
  <h2>Cidade</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idCidade", altKey: "ID_CIDADE", title: "ID", hidden: true, readonly: true },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "regional", title: "Regional", readonly: true },
  { key: "qtdeTitulares", altKey: "QTDE_TITULARES", title: "Qtde. Titulares", type: "number" },
  { key: "qtdeColaboradores", altKey: "QTDE_COLABORADORES", title: "Qtde. Colaboradores", type: "number" },
  { key: "dtFormacao", altKey: "DT_FORMACAO", title: "Data de Formação", type: "datetime-local", format: "date" },
  { key: "criadopor", title: "Criado Por", readonly: true },
  { key: "criadoem", title: "Data de Formação", type: "datetime-local", format: "date", readonly: true },
  { key: "idRegional", altKey: "ID_REGIONAL", title: "ID Regional" },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "Cidade",
      headers,
    }
  },
}
</script>
