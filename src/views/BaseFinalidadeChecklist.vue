<template>
  <h2>Base Finalidade Checklist</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idBaseFinalidadeChecklist",
    altKey: "ID_BASE_FINALIDADE_CHECKLIST",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  { key: "ordem", altKey: "ORDEM", title: "Ordem", type: "number" },
  { key: "basedepartamento", title: "Base Departamento", readonly: true },
  {
    key: "idBaseDepartamento",
    altKey: "ID_BASE_DEPARTAMENTO",
    title: "ID Base Departamento",
  },
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
