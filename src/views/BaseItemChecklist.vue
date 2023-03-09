<template>
  <h2>Base Item Checklist</h2>
  <Crud table="BaseItemChecklist" :headers="headers" />
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
        { key: "ativo", text: "Ativo", bool: true  },
        { key: "descricao", text: "Descrição" },
        { key: "ordem", text: "Ordem" },
        { key: "criadoem", text: "Criado Em", format: "date" },
      ],
    }
  },
}
</script>
