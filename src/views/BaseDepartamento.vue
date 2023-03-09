<template>
  <h2>Base Departamento</h2>
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
        { key: "ativo", text: "Ativo", bool: true },
        { key: "descricao", text: "Descrição" },
        { key: "criadoem", text: "Criado Em", format: "date" },
      ],
    }
  },
}
</script>
