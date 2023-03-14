<template>
  <h2>Base Item Checklist</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idBaseItemChecklist", title: "ID", hidden: true, readonly: true },
  { key: "ativo", title: "Ativo", type: "checkbox" },
  { key: "descricao", title: "Descrição" },
  { key: "ordem", title: "Ordem" },
  { key: "criadoem", title: "Criado Em", format: "date" },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "BaseItemChecklist",
      headers,
    }
  },
}
</script>
