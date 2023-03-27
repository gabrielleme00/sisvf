<template>
  <h2>Preenchimento</h2>
  <p>Preenchimento de checklists em aberto e seus respectivos itens.</p>

  <Alert v-if="loading" type="loading">Carregando...</Alert>
  <Alert v-else-if="error" type="danger">
    <b>Houve um erro ao tentar carregar checklists em aberto:</b>
    <p>{{ error }}</p>
    <p>Tente fazer o login novamente.</p>
  </Alert>
  <Alert v-else-if="!checklists.length" type="success">
    <a href="/dashboard/presidencia-checklist">
      Não há checklists em aberto no momento! Clique aqui para ver todas as
      checklists.
    </a>
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
          <div class="number-info-value input-group">
            <span v-if="info.isMoney" class="input-group-preppend">R$</span>
            <input type="number" v-model="checklist[info.field]" />
          </div>
        </div>
      </div>
      <div v-if="checklist.observacao" class="checklist-note">
        <b>Observação</b>
        <p>{{ checklist.observacao }}</p>
      </div>
      <hr />
      <div v-if="checklist.items && checklist.items.length">
        <h3>Itens da Checklist</h3>
        <ol class="checklist-items">
          <li
            v-for="(item, i) in checklist.items"
            :key="i"
            :class="{ highlight: item.sinalizarItem }"
          >
            <p class="item-description">
              <b>{{ (i + 1).toString().padStart(2, "0") }}.</b>
              {{ item.descricao }}
            </p>
            <div class="item-inputs">
              <div>
                <label :for="`item_note_${i}`">Opção</label>
                <select v-model="item.opcaoEscolhida">
                  <option value="" disabled selected>Selecione...</option>
                  <option v-for="(text, i) in itemOptions" :key="i" :value="i">
                    {{ text }}
                  </option>
                </select>
              </div>
              <div class="item-note">
                <label :for="`item_note_${i}`">Observação</label>
                <textarea
                  :id="`item_note_${i}`"
                  v-model="item.observacao"
                  maxlength="250"
                  placeholder="(Opcional)"
                ></textarea>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <Alert v-else type="danger">Erro ao carregar itens do checklist.</Alert>
      <button
        :disabled="!allItemsCompleted(checklist.items)"
        @click="() => handleClickFinish(checklist)"
      >
        Finalizar Checklist
      </button>
      <Alert
        v-if="checklist.finishProcessStatus.message"
        :type="checklist.finishProcessStatus.type"
        >{{ checklist.finishProcessStatus.message }}</Alert
      >
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex"
import Alert from "@components/Alert.vue"
import { formatMixin } from "@mixins/format.js"

const MOCK_CHECKLISTS = [
  {
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    receitasColetasOfertas: 0,
    ofertasMdoVoluntaria: 0,
    receitasDiversas: 0,
    totalDespesas: 0,
    crescimentoImobilizado: 0,
    patrimonioLiquidoSaldo: 0,
    qtdeIrmaosSantaCeia: 0,
    criadopor: "MIKIO",
    alteradopor: "GABRIEL",
    criadoem: "2023-03-22T00:28:28.280Z",
    alteradoem: "2023-03-26T03:25:39.000Z",
    concluidopor: null,
    concluidoem: null,
    status: "EM ABERTO",
    tipo: "RESTRITO",
    dataVerificacao: "2023-04-01T00:00:00.000Z",
    dataInicial: "2022-01-01T00:00:00.000Z",
    dataFinal: "2022-12-31T00:00:00.000Z",
    observacao: "Verificacao de teste",
  },
]

const MOCK_ITEMS = [
  {
    idPresidenciaItemChecklist: "92781790-D7BB-4EE3-BC77-D8A33204477F",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "ACUMULO DE CARGO MINISTERIAL: Anciães, Diáconos e Cooperador com cargo administrativo? (Presidente, Secretário, Tesoureiro, Vices, Conselho Fiscal e Suplente - Parágrafo único do Art. 5º do Estatuto).\t\t\t\t\t\t\t\t\t\t",
    ordem: 20,
    sinalizarItem: 0,
    idBaseItemChecklist: "E34739EA-1477-4E7A-B530-AF8FD41857FD",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "083364FC-D437-4F4F-ABCE-D715BE835DA1",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "DUPLICIDADE DE CARGOS: Existe acumulo de função dos irmão que formam a Administração, atuando em mais de uma área.\t\t\t\t\t\t\t\t\t\t",
    ordem: 30,
    sinalizarItem: 0,
    idBaseItemChecklist: "56C053D7-C62A-4896-B570-413E6A1DC303",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "C713A84E-C006-4164-A58F-7F542FEE0364",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "EQUIPAMENTOS: Há equipamentos suficientes para o exercício das funções como computadores, notebooks, projetor, internet, instalações e softwares.\t\t\t\t\t\t\t\t\t\t",
    ordem: 40,
    sinalizarItem: 0,
    idBaseItemChecklist: "C122BE3A-729D-4A14-B2E3-6C5AF819FFE9",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "DA2A4895-73F2-4E4E-AFFE-C4931C669922",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "O presidente assina os cheques e ou os pagamentos a fornecedores junto com o Secretário e Tesoureiro.\t\t\t\t\t\t\t\t\t\t",
    ordem: 50,
    sinalizarItem: 0,
    idBaseItemChecklist: "36EC19A5-43A1-4B26-9096-9081A5494790",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "4E8372DC-EB4D-4152-99F3-1F74745CED7A",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "O presidente é o usuário máster para a movimentação das contas bancárias pela internet.\t\t\t\t\t\t\t\t\t\t",
    ordem: 60,
    sinalizarItem: 0,
    idBaseItemChecklist: "FC8AD085-346E-417A-A744-6BFF21A8D775",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "08CA3690-962E-40C3-9A93-3499DD16031A",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "O presidente realiza reuniões mensais só com os membros da administração para tratar temas internos.\t\t\t\t\t\t\t\t\t\t",
    ordem: 70,
    sinalizarItem: 0,
    idBaseItemChecklist: "535D2E87-BAEC-4DB5-A934-41A0EBF9AEDE",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "515764D9-5978-495B-8299-D7316F338EBC",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "O presidente compartilha com o CF os assuntos relevantes e busca orientação dos mesmos.\t\t\t\t\t\t\t\t\t\t",
    ordem: 80,
    sinalizarItem: 0,
    idBaseItemChecklist: "7E6144AF-A565-4153-A8B6-BA28135DC0E5",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "68E65518-A047-420F-8471-CC157DFDB38D",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "A presidência enviou relatório de resposta aos apontamentos levantados na ultima averiguação pela Regional.\t\t\t\t\t\t\t\t\t\t",
    ordem: 90,
    sinalizarItem: 0,
    idBaseItemChecklist: "50B2882B-D108-425D-A3B6-B9621A6A863C",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
  {
    idPresidenciaItemChecklist: "5E3847CC-5A11-40AB-AA5E-1025C93E5D16",
    idPresidenciaChecklist: "0926C120-F35B-4CF5-BF3B-8B7D6D8F146C",
    descricao:
      "As não conformidades e as recomendações apontadas na averiguação anterior foram tratadas em sua maioria.\t\t\t\t\t\t\t\t\t\t",
    ordem: 100,
    sinalizarItem: 1,
    idBaseItemChecklist: "D2D0379B-A1DC-4958-AEED-039322958E7D",
    concluidopor: null,
    concluidoem: null,
    opcaoEscolhida: "",
    observacao: null,
  },
]

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
    ...mapActions(["readRecords", "updateRecord"]),
    finishChecklist(checklist) {
      const {
        idPresidenciaChecklist,
        idVerificacao,
        receitasColetasOfertas,
        ofertasMdoVoluntaria,
        receitasDiversas,
        totalDespesas,
        crescimentoImobilizado,
        patrimonioLiquidoSaldo,
        qtdeIrmaosSantaCeia,
      } = checklist
      const data = {
        ID_PRESIDENCIA_CHECKLIST: idPresidenciaChecklist,
        ID_VERIFICACAO: idVerificacao,
        RECEITAS_COLETAS_OFERTAS: receitasColetasOfertas,
        OFERTAS_MDO_VOLUNTARIA: ofertasMdoVoluntaria,
        RECEITAS_DIVERSAS: receitasDiversas,
        TOTAL_DESPESAS: totalDespesas,
        CRESCIMENTO_IMOBILIZADO: crescimentoImobilizado,
        PATRIMONIO_LIQUIDO_SALDO: patrimonioLiquidoSaldo,
        QTDE_IRMAOS_SANTA_CEIA: qtdeIrmaosSantaCeia,
        STATUS: 0,
      }
      const update = () => {
        return this.updateRecord({ endpoint: "PresidenciaChecklist", data })
      }
      return new Promise((ok, err) =>
        setTimeout(() => update().then(res => ok(res)), 1000)
      )
    },
    finishChecklistItem(item, index) {
      return new Promise((ok, err) => setTimeout(ok, index * 1000))
    },
    handleClickFinish(checklist) {
      const setStatus = (type, message) => {
        checklist.finishProcessStatus = { type, message }
      }

      setStatus("loading", "Salvando itens...")
      const itemPromises = checklist.items.map(this.finishChecklistItem)
      Promise.all(itemPromises).then(() => {
        setStatus("loading", "Itens salvos com sucesso! Salvando checklist...")
        this.finishChecklist(checklist)
          .then(res => {
            setStatus(
              "success",
              "Checklist e seus respectivos itens salvos com sucesso!"
            )
          })
          .catch(error => {
            setStatus(
              "danger",
              `Erro ao tentar finalizar a checklist:  ${error}`
            )
          })
      })
    },
    allItemsCompleted(items) {
      const notCompleted = item => item.opcaoEscolhida === ""
      return items.filter(notCompleted).length === 0
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
          field: "receitasColetasOfertas",
          isMoney: true,
        },
        {
          title: "Ofertas Mdo. Voluntária",
          field: "ofertasMdoVoluntaria",
          isMoney: true,
        },
        {
          title: "Saldo de Patrimônio Líquido",
          field: "patrimonioLiquidoSaldo",
          isMoney: true,
        },
        {
          title: "Receitas Diversas",
          field: "receitasDiversas",
          isMoney: true,
        },
        {
          title: "Total de Despesas",
          field: "totalDespesas",
          isMoney: true,
        },
        {
          title: "Crescimento Imobilizado",
          field: "crescimentoImobilizado",
          isMoney: true,
        },
        { title: "Qtde. Irmãos na Santa Ceia", field: "qtdeIrmaosSantaCeia" },
      ]
    },
  },
  computed: {
    canShowChecklists() {
      return !this.loading && !this.error && this.checklists.length
    },
    itemOptions() {
      return ["NAO", "SIM", "ADEQUADO", "MELHORAR", "CRITICO", "ISENTO"]
    },
  },
  mounted() {
    // TODO: implement delay on readRecords
    Promise.all([
      this.readRecords("PresidenciaChecklist"),
      // { data: MOCK_CHECKLISTS },
      new Promise((resolve, reject) =>
        setTimeout(() => {
          this.readRecords("PresidenciaItemChecklist").then(res => resolve(res))
          // resolve({ data: MOCK_ITEMS })
        }, 1000)
      ),
    ])
      .then(values => [
        values[0].data.filter(item => item.status == "EM ABERTO"),
        values[1].data.filter(item => !item.concluidoem),
      ])
      .then(values => {
        const [checklists, items] = values
        return checklists.map(checklist => {
          const { idPresidenciaChecklist } = checklist
          const isChild = item =>
            (item.idPresidenciaChecklist = idPresidenciaChecklist)
          return {
            ...checklist,
            items: items.filter(isChild),
            finishProcessStatus: { icon: "", message: "" },
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
  margin: 2rem 0;
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
      max-width: 300px;

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
      padding: 0 1rem 1rem 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .item-description {
        width: 100%;
      }

      .item-inputs {
        width: 100%;
        display: flex;

        .item-note {
          flex-grow: 1;
        }
      }

      div:first-child {
        padding-right: 1rem;
      }

      &.highlight {
        background-color: @nord11;
      }

      select {
        width: 120px;
        cursor: pointer;
      }

      textarea {
        min-height: 40px;
      }
    }
  }
}
</style>
