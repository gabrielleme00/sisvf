<template>
  <h2>Colaborador</h2>
  <Crud table="Colaborador" :headers="headers" />
</template>

<script>
import { mapActions } from "vuex"
import Crud from "@components/Crud.vue"

export default {
  components: {
    Crud,
  },
  data() {
    return {
      headers: [
        { key: "ativo", text: "Ativo", bool: true  },
        { key: "nome", text: "Nome" },
        { key: "formacao", text: "Formação" },
        { key: "permissao", text: "Permissão" },
        { key: "criadoem", text: "Criado Em", format: "date" },
        { key: "ultimoAcesso", text: "Último Acesso", format: "datetime" },
      ],
    }
  },
}
</script>
