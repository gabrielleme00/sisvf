<template>
  <section class="table-actions">
    <button @click="startAdd" v-if="create">
      <font-awesome-icon icon="fa-solid fa-plus" />
      Adicionar
    </button>
    <button @click="getContent" class="btn-refresh">
      <font-awesome-icon icon="fa-solid fa-rotate-right" />
      Atualizar
    </button>
  </section>
  <modal :show="isModalOpen" :close="closeModal" :title="modalTitle">
    <div v-for="(item, key) in modalRecord" :key="key" class="form-group">
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
          v-else-if="item.type === 'datetime-local'"
          :type="item.type"
          :name="key"
          :id="key"
          :value="item.value.slice(0, 19)"
          @input="item.value = $event.target.value"
          :disabled="item.readonly"
        />
        <textarea
          v-else-if="item.type === 'textarea'"
          type="text"
          :name="key"
          :id="key"
          v-model="item.value"
          :disabled="item.readonly"
        />
        <select
          v-else-if="item.type === 'select'"
          :name="key"
          :id="key"
          :value="this.getSelectValue(item)"
          @input="item.value = $event.target.value"
          :disabled="item.readonly"
        >
          <option v-for="(text, i) in item.options" :key="i" :value="i">
            {{ text }}
          </option>
        </select>
        <input
          v-else
          type="text"
          :name="key"
          :id="key"
          v-model="item.value"
          :disabled="item.readonly"
        />
        <!-- <span v-if="item.formattedValue" class="input-group-append">
          {{ item.formattedValue }}
        </span> -->
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

const FETCH_DELAY = 1000

const getFieldValueForPayload = field => {
  const { value, type } = field
  if (type === "datetime-local") {
    const localDateTime = value.replace("Z", "-03:00")
    return new Date(localDateTime).toLocaleString("en-US")
  }
  return value
}

export default {
  components: {
    DataTable,
    Modal,
  },
  props: {
    table: { type: String, required: true, default: "" },
    headers: { type: Array, required: true, default: [] },
    create: { type: Boolean, default: true },
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
    ...mapActions(["readRecords", "updateRecord", "createRecord"]),
    getSelectValue(item) {
      const position = item.options.indexOf(item.value)
      const value = position > -1 ? position : item.value
      return value
    },
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
      this.content = []
      setTimeout(() => {
        this.readRecords(this.table)
          .then(res => {
            this.content = res.data
          })
          .catch(error => this.checkSessionExpired(error))
      }, FETCH_DELAY)
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
          return this.createRecord(payload)
        } else if (modalMode === ModalMode.Edit) {
          const oldRecord = _cloneDeep(modalRecord)
          Object.keys(oldRecord).forEach(key => {
            const field = toRaw(headers).filter(field => field.key === key)[0]
            const isIdField = key.toLowerCase().slice(0, 2).includes("id")
            if (!field.readonly || isIdField) {
              const value = getFieldValueForPayload(oldRecord[key])
              if (key == "cidade") debugger
              newRecord[field.altKey || field.key] = value
            }
          })
          const payload = { endpoint: this.table, data: newRecord }
          console.log(payload)
          return this.updateRecord(payload)
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
      } else if (this.modalMode === ModalMode.Add) {
        if (!confirm("Deseja mesmo adicionar o registro?")) return
      } else this.closeModal()
      this.saveRecord().then(this.getContent).catch(this.handleIntegrationError)
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
