<template>
  <section class="table-actions">
    <button @click="startAdd">
      <font-awesome-icon icon="fa-solid fa-plus" />
      Adicionar
    </button>
    <button @click="getContent" class="btn-refresh">
      <font-awesome-icon icon="fa-solid fa-rotate-right" />
      Atualizar
    </button>
  </section>
  <modal :show="isModalOpen" :close="closeModal" :title="modalTitle">
    <div
      v-for="(item, key) in modalRecord"
      :key="key"
      class="form-group"
      v-show="!item.hidden && !(modalMode === 'add' && item.readonly)"
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
      <button @click="closeModal" class="btn-cancel">
        <font-awesome-icon icon="fa-solid fa-xmark" />
        Cancelar
      </button>
      <button @click="saveModal">
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

const ModalMode = Object.freeze({
  Add: "add",
  Edit: "edit",
})

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
      modalRecord: null,
      modalMode: ModalMode.Add,
    }
  },
  computed: {
    modalTitle() {
      if (this.modalMode === ModalMode.Add) return "Adicionar"
      if (this.modalMode === ModalMode.Edit) return "Editar"
      return ""
    },
  },
  methods: {
    ...mapActions(["fetchTable", "editRecord", "addRecord"]),
    checkSessionExpired(error) {
      const msg = error.response ? error.response.data.error : error
      if (!msg) return
      alert(msg)
      if (msg === MSG_SESSION_EXPIRED) {
        this.$router.push("/login")
      }
    },
    handleIntegrationError(error) {
      this.checkSessionExpired(error)
      const { data } = error.response
      const msg =
        data.error ||
        `Campos obrigatórios: ${data["Campos obrigatórios: "]}` ||
        data ||
        "Erro desconhecido ao salvar registro."
      alert(`Não foi possível salvar. ${msg}`)
    },
    async getContent() {
      try {
        this.content = []
        this.content = await this.fetchTable(this.table)
      } catch (error) {
        this.checkSessionExpired(error)
      }
    },
    async saveRecord() {
      const { modalMode, modalRecord, headers } = this
      try {
        const newRecord = {}
        if (modalMode === ModalMode.Add) {
          for (let field of toRaw(headers)) {
            if (field.readonly) continue
            const value = toRaw(modalRecord)[field.key].value
            newRecord[field.altKey || field.key] = value
          }
          const payload = { endpoint: this.table, data: newRecord }
          console.log(payload)
          return await this.addRecord(payload)
        } else if (modalMode === ModalMode.Edit) {
          Object.keys(oldRecord).forEach(key => {
            if (!key.readonly) {
              newRecord[key] = oldRecord[key].value
            }
          })
          const payload = { endpoint: this.table, data: newRecord }
          return await this.editRecord(payload)
        } else {
          throw "Erro ao detectar modo de salvar o registro."
        }
      } catch (error) {
        this.handleIntegrationError(error)
      }
    },
    saveModal() {
      if (this.modalMode === ModalMode.Edit) {
        if (!confirm("Deseja mesmo salvar as alterações?")) return
        this.saveRecord()
        this.getContent()
      } else if (this.modalMode === ModalMode.Add) {
        if (!confirm("Deseja mesmo adicionar o registro?")) return
        this.saveRecord()
        this.getContent()
      }
      this.closeModal()
    },
    closeModal() {
      this.isModalOpen = false
      this.modalRecord = null
      this.modalMode = null
    },
    startEdit(item) {
      this.modalMode = ModalMode.Edit
      this.modalRecord = _cloneDeep(item)
      this.isModalOpen = true
    },
    startAdd() {
      this.modalMode = ModalMode.Add
      const emptyRecord = {}
      this.headers.forEach(field => {
        const newField = _cloneDeep(field)
        switch (field.type) {
          case "checkbox":
          case "number":
            newField.value = 0
            break
          default:
            newField.value = ""
            break
        }
        emptyRecord[field.key] = newField
      })
      this.modalRecord = emptyRecord
      this.isModalOpen = true
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
