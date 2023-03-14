<template>
  <h2>Base Finalidade Checklist</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idBaseFinalidadeChecklist",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  { key: "ativo", title: "Ativo", type: "checkbox" },
  { key: "descricao", title: "Descrição" },
  { key: "basedepartamento", title: "Base Departamento" },
  { key: "ordem", title: "Ordem" },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "BaseFinalidadeChecklist",
      headers,
    }
  },
}
</script>
