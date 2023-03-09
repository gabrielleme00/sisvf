<template>
  <h2>Base Finalidade Checklist</h2>
  <Crud table="BaseFinalidadeChecklist" :headers="headers" />
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
        { key: "ativo", text: "Ativo", bool: true },
        { key: "descricao", text: "Descrição" },
        { key: "basedepartamento", text: "Base Departamento" },
        { key: "ordem", text: "Ordem" },
      ],
    }
  },
}
</script>
