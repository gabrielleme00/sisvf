<template>
  <h2>Colaboradores</h2>
  <div>{{ contributors }}</div>
</template>

<script>
export default {
  data() {
    return {
      contributors: { type: Array, default: () => [] },
    }
  },
  mounted() {
    this.contributors = this.getContributors()
  },
  methods: {
    getContributors() {
      return [
        {
          idColaborador: "227D45B0-34D8-45CC-B0B9-E14F299CAFDE",
          nome: "MIKIO",
          formacao: "Engenheiro de Software",
          dtInicioAdm: "2021-01-12T00:00:00.000Z",
          login: "MIKIO",
          ativo: 1,
          criadoem: "2023-02-09T19:46:21.675Z",
          alteradoem: null,
          ultimoAcesso: "2023-02-25T16:42:29.000Z",
          departamento: null,
          idDepartamento: null,
          cidade: null,
          idCidade: null,
          cargo: null,
          idCargo: null,
          permissao: "Administrador",
        },
        {
          idColaborador: "8E29BD3F-B68E-4DFC-9EAE-ED55A2C3DBAC",
          nome: "GABRIEL",
          formacao: "Desenvolvedor",
          dtInicioAdm: "2023-02-15T00:00:00.000Z",
          login: "GABRIEL",
          ativo: 1,
          criadoem: "2023-02-19T17:43:49.587Z",
          alteradoem: null,
          ultimoAcesso: "2023-02-28T17:34:39.000Z",
          departamento: null,
          idDepartamento: null,
          cidade: null,
          idCidade: null,
          cargo: null,
          idCargo: null,
          permissao: "Administrador",
        },
      ]
    },
  },
}
</script>
