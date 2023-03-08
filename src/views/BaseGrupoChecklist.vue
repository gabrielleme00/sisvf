<template>
  <h2>Base Finalidade Checklist</h2>
  <Crud table="BaseGrupoChecklist" :headers="headers" />
</template>

<script>
import Crud from "@/components/Crud.vue"

export default {
  components: {
    Crud,
  },
  data() {
    return {
      headers: [
        { key: "ativo", text: "Ativo" },
        { key: "descricao", text: "Descrição" },
        { key: "finalidadechecklist", text: "Finalidade Checklist" },
        { key: "ordem", text: "Ordem" },
        { key: "criadoem", text: "Criado Em", format: "date" },
      ],
    }
  },
}
</script>
