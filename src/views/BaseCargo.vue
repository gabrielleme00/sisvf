<template>
  <h2>Base Cargo</h2>
  <Crud table="BaseCargo" :headers="headers" />
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
        { key: "idBaseCargo", hidden: true },
        { key: "ativo", text: "Ativo", bool: true },
        { key: "descricao", text: "Descrição" },
        { key: "titular", text: "Titular" },
        { key: "criadoem", text: "Criado Em", format: "date" },
      ],
    }
  },
}
</script>
