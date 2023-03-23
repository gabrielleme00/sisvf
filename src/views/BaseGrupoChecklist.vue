<template>
  <h2>Base Grupo Checklist</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idBaseGrupoChecklist",
    altKey: "ID_BASE_GRUPO_CHECKLIST",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "descricao", altKey: "DESCRICAO", title: "Descrição" },
  {
    key: "idBaseFinalidadeChecklist",
    altKey: "ID_BASE_FINALIDADE_CHECKLIST",
    title: "ID Base Finalidade Checklist",
    hidden: true,
  },
  { key: "finalidadechecklist", title: "Finalidade Checklist", readonly: true },
  { key: "ordem", altKey: "ORDEM", title: "Ordem" },
  { key: "criadoem", title: "Criado Em", format: "date", readonly: true },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "BaseGrupoChecklist",
      headers,
    }
  },
}
</script>
