<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="(header, index) in headers"
          v-show="!header.hidden"
          :key="index"
          :class="{
            'sorted-asc': sortedBy === header.key && sortOrder === 1,
            'sorted-desc': sortedBy === header.key && sortOrder === -1,
          }"
          @click="sortBy(header.key)"
        >
          {{ header.text || header.key }}
        </th>
        <th class="actions">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in sortedData" :key="index">
        <td v-for="(field, key) in item" :key="key" v-show="!field.hidden">
          <template v-if="field.bool">
            <font-awesome-icon :icon="getBoolIcon(field.value)" />
          </template>
          <template v-else>
            {{ getFieldValue(field) }}
          </template>
        </td>
        <td class="actions">
          <font-awesome-icon
            class="action action-edit"
            icon="fa-solid fa-pen-to-square"
            size="lg"
            title="Editar"
            @click="handleEdit(item)"
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
    handleEdit: { type: Function, default: () => {} },
  },
  data() {
    return {
      sortOrder: 1,
      sortedBy: "",
    }
  },
  computed: {
    rawData() {
      const data = toRaw(this.data)
      if (!data || !data.length) return data
    },
    formattedData() {
      return this.rawData.map(item => {
        const newItem = {}
        this.headers.forEach(header => {
          const { key, format } = header
          newItem[key] = {
            ...header,
            value: item[key],
            formattedValue: format ? this.formatValue(item[key], format) : null,
          }
        })
        return newItem
      })
    },
    sortedData() {
      const { sortedBy, sortOrder, formattedData, getFieldValue } = this
      if (!sortedBy) return formattedData
      return formattedData.sort((a, b) => {
        const aVal = getFieldValue(a[sortedBy])
        const bVal = getFieldValue(b[sortedBy])
        if (aVal > bVal) return sortOrder
        else if (aVal < bVal) return -sortOrder
        return 0
      })
    },
  },
  methods: {
    getBoolIcon(value) {
      return value ? "fa-solid fa-check" : "fa-solid fa-xmark"
    },
    getFieldValue(field) {
      const { value, formattedValue } = field
      return formattedValue ? formattedValue : value
    },
    handleDelete() {
      alert(
        "A função de excluir está desativada. Em vez disso, desative o item."
      )
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
  min-width: 60px;

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

th:not(.actions)::after {
  content: "▲";
  margin-left: 8px;
  opacity: 0.1;
}

th.sorted-asc::after {
  content: "▲";
  opacity: 1;
}

th.sorted-desc::after {
  content: "▼";
  opacity: 1;
}

tbody tr:nth-child(even) {
  background-color: @nord1;
}

tbody tr:hover {
  background-color: @nord2;
}
</style>
