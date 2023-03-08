<template>
  <h2>Departamentos</h2>
  <Crud table="BaseDepartamento" :headers="headers" />
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
        { key: "criadoem", text: "Criado Em", format: "date" },
      ],
    }
  },
}
</script>
