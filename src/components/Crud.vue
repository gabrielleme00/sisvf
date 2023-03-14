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
  <modal :show="isModalOpen" :close="cancelEdit" title="Editar">
    <div
      v-for="(item, key) in recordToEdit"
      :key="key"
      class="form-group"
      v-show="!item.hidden"
    >
      <label :for="item.key">{{ item.title }}</label>
      <div class="input-group">
        <template v-if="item.type === 'checkbox'">
          <input
            type="checkbox"
            :name="key"
            :id="key"
            v-model="item.value"
            true-value="1"
            false-value="0"
          />
          <label :for="item.key">
            {{ item.value == 1 ? "Sim" : "Não" }}
          </label>
        </template>
        <input
          v-else-if="item.type === 'number'"
          :type="item.type"
          :name="key"
          :id="key"
          v-model="item.value"
          :disabled="item.readonly"
          :min="item.min"
          :max="item.max"
          :step="item.step || 1"
        />
        <input
          v-else
          type="text"
          :name="key"
          :id="key"
          v-model="item.value"
          :disabled="item.readonly"
        />
        <span v-if="item.formattedValue" class="input-group-append">
          {{ item.formattedValue }}
        </span>
      </div>
    </div>
    <div class="modal-actions">
      <button @click="cancelEdit" class="btn-cancel">
        <font-awesome-icon icon="fa-solid fa-xmark" />
        Cancelar
      </button>
      <button @click="saveEdit">
        <font-awesome-icon icon="fa-solid fa-check" />
        Salvar
      </button>
    </div>
  </modal>
  <DataTable
    v-if="content.length"
    :content="content"
    :headers="headers"
    :handleEdit="startEdit"
  />
  <p v-else>Carregando, por favor aguarde...</p>
</template>

<script>
import { toRaw } from "vue"
import { mapActions } from "vuex"
import DataTable from "@components/DataTable.vue"
import Modal from "./Modal.vue"
import _cloneDeep from "lodash/cloneDeep"

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
      isModalOpen: false,
      recordToEdit: null,
    }
  },
  methods: {
    ...mapActions(["fetchTable", "editTable"]),
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
    async editRow() {
      try {
        const oldItem = toRaw(this.recordToEdit)
        const newItem = {}
        Object.keys(oldItem).forEach(key => {
          newItem[key] = oldItem[key].value
        })
        return await this.editTable({ endpoint: this.table, data: newItem })
      } catch (error) {
        console.error(error)
        const { data } = error.response
        const msg =
          data.error ||
          `Campos obrigatórios: ${data["Campos obrigatórios: "]}` ||
          data ||
          "Erro desconhecido ao editar registro."
        alert(msg)
        if (msg === MSG_SESSION_EXPIRED) {
          this.$router.push("/login")
        }
      }
    },
    openModal(item) {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    startEdit(item) {
      this.recordToEdit = _cloneDeep(item)
      this.openModal()
    },
    cancelEdit() {
      this.recordToEdit = null
      this.closeModal()
    },
    saveEdit() {
      if (!confirm("Deseja mesmo salvar as alterações?")) return
      this.editRow()
      this.closeModal()
      this.getContent()
    },
  },
  async created() {
    await this.getContent()
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.table-actions,
.modal-actions {
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

    &.btn-cancel {
      background-color: @nord3;
    }
  }
}
</style>
