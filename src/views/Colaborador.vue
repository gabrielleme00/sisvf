<template>
  <h2>Colaborador</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import { mapActions } from "vuex"
import Crud from "@components/Crud.vue"

const headers = [
  { key: "idColaborador", title: "ID", hidden: true, readonly: true },
  { key: "ativo", title: "Ativo", type: "checkbox" },
  { key: "nome", title: "Nome" },
  { key: "login", title: "Login" },
  { key: "formacao", title: "Formação" },
  { key: "permissao", title: "Permissão", readonly: true, },
  { key: "criadoem", title: "Criado Em", format: "date" },
  { key: "ultimoAcesso", title: "Último Acesso", format: "datetime" },
]

export default {
  components: {
    Crud,
  },
  data() {
    return {
      table: "Colaborador",
      headers,
    }
  },
}
</script>
