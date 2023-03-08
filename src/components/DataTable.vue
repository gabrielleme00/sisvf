<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          :key="index"
          @click="sortBy(header.key)"
          :class="{
            'sorted-asc': sortedBy === header.key && sortOrder === 1,
            'sorted-desc': sortedBy === header.key && sortOrder === -1,
          }"
        >
          {{ header.text || header.key }}
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index">
        <td v-for="(value, key) in item" :key="key">
          <template v-if="key === 'ativo'">
            <font-awesome-icon
              :icon="`fa-solid ${value ? 'fa-check' : 'fa-xmark'}`"
            />
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
        <td class="actions">
          <font-awesome-icon
            class="action action-edit"
            icon="fa-solid fa-pen-to-square"
            size="lg"
            title="Editar"
            @click="handleEdit"
          />
          <font-awesome-icon
            class="action action-delete"
            icon="fa-solid fa-trash"
            size="lg"
            title="Excluir"
            @click="handleDelete"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { toRaw } from "vue"

export default {
  props: {
    data: { type: Array, required: true, default: [] },
    headers: { type: Array, required: true, default: [] },
  },
  data() {
    return {
      sortOrder: 1,
      sortedBy: "",
    }
  },
  computed: {
    formattedData() {
      const data = toRaw(this.data)
      if (!data || !data.length) return data
      return data.map(item => {
        const newItem = {}
        this.headers.forEach(header => {
          const { key, format } = header
          newItem[key] = this.formatValue(item[key], format)
        })
        return newItem
      })
    },
    sortedData() {
      if (!this.sortedBy) return this.formattedData
      return this.formattedData.sort((a, b) => {
        const aVal = a[this.sortedBy]
        const bVal = b[this.sortedBy]
        if (aVal > bVal) {
          return this.sortOrder
        } else if (aVal < bVal) {
          return -this.sortOrder
        }
        return 0
      })
    },
  },
  methods: {
    handleEdit() {
      alert('Editar')
    },
    handleDelete() {
      alert('A função de excluir está desativada. Em vez disso, desative o item.')
    },
    sortBy(headerKey) {
      if (this.sortedBy === headerKey) {
        this.sortOrder = -this.sortOrder
      } else {
        this.sortOrder = 1
      }
      this.sortedBy = headerKey
    },
    formatValue(value, formatType) {
      if (!formatType) return value
      if (formatType === "date") {
        return new Date(value).toLocaleDateString()
      }
      if (formatType === "datetime") {
        return new Date(value).toLocaleString()
      }
      return value
    },
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

table {
  width: 100%;
  border-collapse: collapse;
  background-color: @nord0;
  color: @nord4;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid @nord3;
}

td.actions {
  .action {
    cursor: pointer;

    &-edit {
      color: @nord13;
    }
    &-delete {
      color: @nord11;
    }
  }
  .action:nth-child(odd) {
    margin-right: 1rem;
  }
  .action:hover {
    opacity: 0.8;
  }
}

th {
  cursor: pointer;
}

th:hover {
  background-color: @nord2;
}

th.sorted-asc::after {
  position: fixed;
  content: "▲";
  margin-left: 8px;
}

th.sorted-desc::after {
  position: fixed;
  content: "▼";
  margin-left: 8px;
}

tbody tr:nth-child(even) {
  background-color: @nord1;
}

tbody tr:hover {
  background-color: @nord2;
}
</style>
