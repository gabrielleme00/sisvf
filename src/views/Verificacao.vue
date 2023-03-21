<template>
  <h2>Verificação</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idVerificacao", title: "ID", hidden: true, readonly: true },
  { key: "dataInicial", title: "Data Inicial", format: "date" },
  { key: "dataFinal", title: "Data Final", format: "date" },
  { key: "observacao", altKey: "OBSERVACAO", title: "Observação" },
  { key: "descricao", altKey: "descricao", title: "Descrição" },
  { key: "cidade", altKey: "CIDADE", title: "Cidade", readonly: true },
  { key: "criadopor", title: "Criado por", readonly: true },
  { key: "criadoem", title: "Criado em", format: "date", readonly: true },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "Verificacao",
      headers,
    }
  },
}
</script>
