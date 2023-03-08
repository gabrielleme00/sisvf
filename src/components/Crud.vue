<template>
  <DataTable
    v-if="content.length"
    :data="content"
    :headers="headers"
  />
  <p v-else>Carregando, por favor aguarde...</p>
</template>

<script>
import { mapActions } from "vuex"
import DataTable from "@/components/DataTable.vue"

const MSG_SESSION_EXPIRED = "Sua sessão expirou! Realize o login novamente."

export default {
  components: {
    DataTable,
  },
  props: {
    table: { type: String, required: true, default: '' },
    headers: { type: Array, required: true, default: [] },
  },
  data() {
    return {
      content: { type: Array, default: [] },
    }
  },
  methods: {
    ...mapActions(["fetchTable"]),
  },
  async created() {
    try {
      this.content = await this.fetchTable(this.table)
    } catch (error) {
      const msg = error.response.data.error
      alert(msg)
      if (msg === MSG_SESSION_EXPIRED) {
        this.$router.push("/login")
      }
    }
  },
}
</script>
