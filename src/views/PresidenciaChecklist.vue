<template>
  <h2>PresidenciaChecklist</h2>
  <Crud :table="table" :headers="headers" :create="false" />
</template>

<script>
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idPresidenciaChecklist",
    altKey: "ID_PRESIDENCIA_CHECKLIST",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  {
    key: "receitasColetasOfertas",
    altKey: "RECEITAS_COLETAS_OFERTAS",
    title: "Receitas Coletas Ofertas",
    type: "number",
  },
  {
    key: "ofertasMdoVoluntaria",
    altKey: "OFERTAS_MDO_VOLUNTARIA",
    title: "Receitas MDO Voluntária",
    type: "number",
  },
  {
    key: "receitasDiversas",
    altKey: "RECEITAS_DIVERSAS",
    title: "Receitas Diversas",
    type: "number",
  },
  {
    key: "totalDespesas",
    altKey: "TOTAL_DESPESAS",
    title: "Total Despesas",
    type: "number",
  },
  {
    key: "crescimentoImobilizado",
    altKey: "CRESCIMENTO_IMOBILIZADO",
    title: "Cresc. Imobilizado",
    type: "number",
  },
  {
    key: "patrimonioLiquidoSaldo",
    altKey: "PATRIMONIO_LIQUIDO_SALDO",
    title: "Patr. Líq. Saldo",
    type: "number",
  },
  {
    key: "qtdeIrmaosSantaCeia",
    altKey: "QTDE_IRMCAOS_SANTA_CEIA",
    title: "Qtde. Irmãos Sta. Ceia",
    type: "number",
  },
  {
    key: "criadopor",
    title: "Criado por",
    readonly: true,
  },
  {
    key: "alteradopor",
    title: "Alterado por",
    readonly: true,
  },
  {
    key: "criadoem",
    title: "Criado em",
    format: "datetime",
    readonly: true,
  },
  {
    key: "alteradoem",
    title: "Alterado em",
    format: "datetime",
    readonly: true,
  },
  {
    key: "concluidopor",
    title: "Concluído por",
    readonly: true,
  },
  {
    key: "status",
    altKey: "STATUS",
    title: "Status",
    type: "select",
    options: ["EM ABERTO", "CONCLUIDO", "PARCIAL", "NAO CONSIDERADO"],
    format: "select",
  },
  {
    key: "tipo",
    title: "Tipo",
    readonly: true,
  },
  {
    key: "dataVerificacao",
    title: "Data Verificação",
    format: "date",
    readonly: true,
  },
  {
    key: "dataInicial",
    title: "Data Inicial",
    format: "date",
    readonly: true,
  },
  {
    key: "dataFinal",
    title: "Data Final",
    format: "date",
    readonly: true,
  },
  {
    key: "observacao",
    altKey: "OBSERVACAO",
    title: "Observação",
  },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "PresidenciaChecklist",
      headers,
    }
  },
}
</script>
