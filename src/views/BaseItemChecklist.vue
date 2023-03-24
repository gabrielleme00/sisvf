<template>
  <h2>Base Item Checklist</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idBaseItemChecklist",
    altKey: "ID_BASE_ITEM_CHECKLIST",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  {
    key: "idBaseGrupoChecklist",
    altKey: "ID_BASE_GRUPO_CHECKLIST",
    title: "ID Base Grupo Checklist",
    hidden: true,
  },
  {
    key: "idBaseFinalidadeChecklist",
    altKey: "ID_BASE_FINALIDADE_CHECKLIST",
    title: "ID Base Finalidade Checklist",
    hidden: true,
  },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  {
    key: "descricao",
    altKey: "DESCRICAO",
    title: "Descrição",
    type: "textarea",
    style: { minWidth: "400px" },
  },
  {
    key: "finalidadechecklist",
    altKey: "FINALIDADECHECKLIST",
    title: "Finalidade Checklist",
    readonly: true,
  },
  { key: "ordem", altKey: "ORDEM", title: "Ordem" },
  {
    key: "criadoem",
    altKey: "CRIADOEM",
    title: "Criado Em",
    format: "date",
    readonly: true,
  },
  {
    key: "opcaopadrao",
    altKey: "OPCAO_PADRAO",
    title: "Opção Padrão",
    type: "number",
  },
  {
    key: "sinalizarItem",
    altKey: "SINALIZAR_ITEM",
    title: "Sinalizar Item",
    type: "number",
  },
  {
    key: "observacao",
    altKey: "OBSERVACAO",
    title: "Observação",
    type: "textarea",
  },
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
