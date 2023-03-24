<template>
  <h2>PresidenciaChecklist</h2>
  <Crud :table="table" :headers="headers" :create="false" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idPresidenciaItemChecklist",
    altKey: "ID_PRESIDENCIA_ITEM_CHECKLIST",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  {
    key: "idPresidenciaChecklist",
    altKey: "ID_PRESIDENCIA_CHECKLIST",
    title: "ID PresidenciaChecklist",
    hidden: true,
    readonly: true,
  },
  {
    key: "idBaseItemChecklist",
    altKey: "ID_BASE_ITEM_CHECKLIST",
    title: "ID BaseItemChecklist",
    hidden: true,
    readonly: true,
  },
  {
    key: "descricao",
    altKey: "DESCRICAO",
    title: "Descrição",
    type: "textarea",
    style: { minWidth: "400px" },
  },
  {
    key: "ordem",
    altKey: "ORDEM",
    title: "Ordem",
    type: "number",
  },
  {
    key: "sinalizarItem",
    altKey: "SINALIZAR_ITEM",
    title: "Sinalizar Item",
    type: "select",
    options: ["NÃO SINALIZAR", "SINALIZAR NA COR EM VERMELHO"],
    format: "select",
  },
  {
    key: "opcaoEscolhida",
    altKey: "OPCAO_ESCOLHIDA",
    title: "Opção Escolhida",
    type: "select",
    options: ["NÃO", "SIM", "MELHORAR", "CRITICO", "ISENTO"],
  },
  {
    key: "observacao",
    altKey: "OBSERVACAO",
    title: "Observação",
  },
  {
    key: "concluidopor",
    title: "Concluído por",
    readonly: true,
  },
  {
    key: "concluidoem",
    title: "Concluído em",
    readonly: true,
  },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "PresidenciaItemChecklist",
      headers,
    }
  },
}
</script>
