<template>
  <h2>Preenchimento</h2>
  <p>Preenchimento de checklists em aberto e seus respectivos itens.</p>

  <Alert v-if="loading">Carregando...</Alert>
  <Alert v-else-if="error" type="danger">
    <b>Houve um erro ao tentar carregar checklists em aberto:</b>
    <p>{{ error }}</p>
  </Alert>
  <Alert v-else-if="!checklists.length" type="success">
    Não há checklists em aberto no momento!
  </Alert>
  <Alert v-else type="warning">
    Há uma ou mais checklists a serem preenchidas!
  </Alert>

  <section v-if="canShowChecklists" class="checklists">
    <div v-for="(checklist, i) in checklists" :key="i" class="checklist">
      <div class="checklist-header grid">
        <span v-for="(headerItem, i) in getHeaderItems(checklist)" :key="i">
          <b>{{ headerItem.title }}:</b> {{ headerItem.value }}
        </span>
      </div>
      <div class="checklist-numbers grid">
        <div
          v-for="(info, i) in getNumberInfos(checklist)"
          :key="i"
          class="number-info"
        >
          <div class="number-info-title">{{ info.title }}</div>
          <div class="number-info-value">{{ info.value }}</div>
        </div>
      </div>
      <div v-if="checklist.observacao" class="checklist-note">
        <b>Observação:</b>
        <p>{{ checklist.observacao }}</p>
      </div>
      <hr />
      <div v-if="checklist.checklistItems && checklist.checklistItems.length">
        <h3>Itens da Checklist</h3>
        <ol class="checklist-items">
          <li
            v-for="(item, i) in checklist.checklistItems"
            :key="i"
            :class="{ highlight: item.sinalizarItem }"
          >
            <div>
              <p><b>{{ item.ordem }}.</b> {{ item.descricao }}</p>
              <div v-if="item.observacao">
                <b>Observação:</b>
                <p>{{ item.observacao }}</p>
              </div>
            </div>
            <div>
              <select :value="getOptionValueByText(item.opcaoEscolhida)">
                <option value="0">NAO</option>
                <option value="1">SIM</option>
                <option value="2">ADEQUADO</option>
                <option value="3">MELHORAR</option>
                <option value="4">CRITICO</option>
                <option value="5">ISENTO</option>
              </select>
            </div>
          </li>
        </ol>
      </div>
      <Alert v-else type="danger">Erro ao carregar itens do checklist.</Alert>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex"
import Alert from "@components/Alert.vue"
import { formatMixin } from "@mixins/format.js"

export default {
  mixins: [formatMixin],
  components: {
    Alert,
  },
  data() {
    return {
      loading: true,
      error: null,
      checklists: [],
    }
  },
  methods: {
    ...mapActions(["readRecords"]),
    getOptionValueByText(text) {
      return [
        "NAO",
        "SIM",
        "ADEQUADO",
        "MELHORAR",
        "CRITICO",
        "ISENTO",
      ].indexOf(text)
    },
    getHeaderItems(checklist) {
      const { formatDate } = this
      const { dataInicial, dataFinal, criadoem, tipo } = checklist
      return [
        { title: "Início", value: formatDate(dataInicial) },
        { title: "Fim", value: formatDate(dataFinal) },
        { title: "Criação", value: formatDate(criadoem) },
        { title: "Tipo", value: tipo },
      ]
    },
    getNumberInfos(checklist) {
      const { formatMoney } = this
      const {
        receitasColetasOfertas,
        ofertasMdoVoluntaria,
        receitasDiversas,
        totalDespesas,
        crescimentoImobilizado,
        patrimonioLiquidoSaldo,
        qtdeIrmaosSantaCeia,
      } = checklist
      return [
        {
          title: "Receitas Coletas Ofertas",
          value: formatMoney(receitasColetasOfertas),
        },
        {
          title: "Ofertas Mdo. Voluntária",
          value: formatMoney(ofertasMdoVoluntaria),
        },
        {
          title: "Saldo de Patrimônio Líquido",
          value: formatMoney(patrimonioLiquidoSaldo),
        },
        { title: "Receitas Diversas", value: formatMoney(receitasDiversas) },
        { title: "Total de Despesas", value: formatMoney(totalDespesas) },
        { title: "Crescimento Imobilizado", value: `${crescimentoImobilizado}%` },
        { title: "Qtde. Irmãos na Santa Ceia", value: qtdeIrmaosSantaCeia },
      ]
    },
  },
  computed: {
    canShowChecklists() {
      return !this.loading && !this.error && this.checklists.length
    },
  },
  mounted() {
    // TODO: implement delay on readRecords
    Promise.all([
      this.readRecords("PresidenciaChecklist"),
      new Promise((resolve, reject) =>
        setTimeout(() => {
          this.readRecords("PresidenciaItemChecklist").then(res => resolve(res))
        }, 1000)
      ),
    ])
      .then(values => [
        values[0].data.filter(item => item.status == "EM ABERTO"),
        values[1].data.filter(item => !item.concluidoem),
      ])
      .then(values => {
        const [checklists, checklistItems] = values
        return checklists.map(checklist => {
          const { idPresidenciaChecklist } = checklist
          const isChild = item =>
            (item.idPresidenciaChecklist = idPresidenciaChecklist)
          return {
            ...checklist,
            checklistItems: checklistItems.filter(isChild),
          }
        })
      })
      .then(checklists => {
        this.checklists = checklists
      })
      .catch(error => {
        this.error = error
      })
      .finally(() => {
        this.loading = false
      })
  },
}
</script>

<style lang="less" scoped>
@import "node_modules/nord/src/lesscss/nord.less";

.checklists {
  margin-top: 2rem;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.checklist {
  background-color: @nord2;
  border-radius: 3px;
  padding: 1rem;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.2);

  &-header {
    background-color: @nord3;
    justify-content: space-evenly;
    padding: 1rem;
    span {
      width: 160px;
    }
    span:not(:last-child) {
      margin-right: 2rem;
    }
  }

  &-note {
    color: @nord4;
    margin: 1rem 0;
    p {
      margin: 0;
    }
  }

  &-numbers {
    margin: 1rem 0;

    .number-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: @nord1;
      padding: 1rem;
      flex-grow: 1;
      text-align: center;

      &-title {
        color: @nord4;
      }
      &-value {
        font-size: 2rem;
      }
    }
  }

  &-items {
    color: @nord4;
    list-style-type: none;
    padding-left: 0;
    li {
      background-color: @nord1;
      margin: 1rem 0;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div:first-child {
        padding-right: 1rem;
      }

      &.highlight {
        background-color: @nord11;
      }

      select {
        background-color: @nord9;
        width: 120px;
        cursor: pointer;
        &:hover {
          background-color: @nord10;
        }
      }
    }
  }
}
</style>
