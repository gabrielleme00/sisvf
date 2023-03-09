<template>
  <section class="table-actions">
    <button @click="openModal">
      <font-awesome-icon icon="fa-solid fa-plus" />
      Adicionar
    </button>
    <button @click="getContent" class="btn-refresh">
      <font-awesome-icon icon="fa-solid fa-rotate-right" />
      Atualizar
    </button>
  </section>
  <modal :show="modalOpen" :close="closeModal">
    <h1>Modal Content</h1>
  </modal>
  <DataTable
    v-if="content.length"
    :data="content"
    :headers="headers"
    :handleEdit="handleEdit"
  />
  <p v-else>Carregando, por favor aguarde...</p>
</template>

<script>
import { mapActions } from "vuex"
import DataTable from "@/components/DataTable.vue"
import Modal from "./Modal.vue"

const MSG_SESSION_EXPIRED = "Sua sessão expirou! Realize o login novamente."

export default {
  components: {
    DataTable,
    Modal,
  },
  props: {
    table: { type: String, required: true, default: "" },
    headers: { type: Array, required: true, default: [] },
  },
  data() {
    return {
      content: { type: Array, default: [] },
      modalOpen: false,
    }
  },
  methods: {
    ...mapActions(["fetchTable"]),
    async getContent() {
      try {
        this.content = []
        this.content = await this.fetchTable(this.table)
      } catch (error) {
        const msg = error.response.data.error
        alert(msg)
        if (msg === MSG_SESSION_EXPIRED) {
          this.$router.push("/login")
        }
      }
    },
    openModal() {
      this.modalOpen = true
    },
    closeModal() {
      this.modalOpen = false
    },
    handleEdit(item) {
      this.openModal()
      console.log(item)
    }
  },
  async created() {
    await this.getContent()
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.table-actions {
  display: flex;
  flex-direction: row;
  justify-content: end;
  margin-bottom: 4px;

  button {
    width: fit-content;
    margin-top: 0;

    &:nth-child(odd) {
      margin-right: 1rem;
    }

    &.btn-refresh {
      background-color: @nord15;
    }
  }
}
</style>
