import moment from 'moment'

export const monthToString = (month: number) => moment(month, 'MM').format('MMMM')
export const centsToFloat = (cents: number) => (cents/100)
export const centsToCurrency= (cents: number) => centsToFloat(cents).toFixed(2)
export const floatToCents = (money: number) => Math.round(money * 100)