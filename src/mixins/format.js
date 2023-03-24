const LOCALE = "pt-BR"
const TIMEZONE_BR_SP = "-03:00"

export const formatMixin = {
  methods: {
    formatDate(value) {
      if (!value) return value
      const localDate = new Date(value.replace("Z", TIMEZONE_BR_SP))
      return localDate.toLocaleDateString(LOCALE)
    },
    formatMoney(value) {
      const brl = new Intl.NumberFormat(LOCALE, {
        style: "currency",
        currency: "BRL",
      })
      return brl.format(value)
    },
  },
}
