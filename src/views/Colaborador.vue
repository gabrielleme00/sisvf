<template>
  <h2>Colaborador</h2>
  <Crud :table="table" :headers="headers" />
</template>

<script>
import { mapActions } from "vuex"
import Crud from "@components/Crud.vue"

const headers = [
  {
    key: "idColaborador",
    altKey: "ID_COLABORADOR",
    title: "ID",
    hidden: true,
    readonly: true,
  },
  { key: "ativo", altKey: "ATIVO", title: "Ativo", type: "checkbox" },
  { key: "nome", altKey: "NOME", title: "Nome" },
  { key: "login", altKey: "LOGIN", title: "Login" },
  { key: "formacao", altKey: "FORMACAO", title: "Formação" },
  {
    key: "dtInicioAdm",
    altKey: "DT_INICIO_ADM",
    title: "Data Início Adm.",
    type: "datetime-local",
    format: "date",
  },
  {
    key: "permissao",
    altKey: "PERMISSAO",
    title: "Permissão",
    type: "select",
    options: ["Restrito", "Verificador", "Administrador"],
  },

  { key: "idCargo", altKey: "ID_CARGO", title: "ID Cargo", hidden: true },
  { key: "cargo", title: "Cargo", readonly: true },

  { key: "idCidade", altKey: "ID_CIDADE", title: "ID Cidade", hidden: true },
  { key: "cidade", title: "Cidade", readonly: true },

  {
    key: "idDepartamento",
    altKey: "ID_DEPARTAMENTO",
    title: "ID Departamento",
    hidden: true,
  },
  { key: "departamento", title: "Departamento", readonly: true },

  { key: "criadoem", title: "Criado Em", format: "date", readonly: true },
  {
    key: "ultimoAcesso",
    title: "Último Acesso",
    format: "datetime",
    readonly: true,
  },
]

//cargo,permissao

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
