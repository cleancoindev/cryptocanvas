import { Transaction, TRANSACTION_TYPE } from '../models/Transaction'
import { TransactionWithPixel } from '../models/TransactionWithPixel'
import { TransactionWithCanvasId } from '../models/transactions/TransactionWithCanvasId'
import { TransactionWithPixels } from '../models/TransactionWithPixels'

const STORAGE_KEY = 'USER_TX'

const getTransactions = () => {
  const transactions = window.localStorage.getItem(STORAGE_KEY)
  if (transactions) {
    return JSON.parse(transactions).map(tx => {
      switch (tx.type) {
        case TRANSACTION_TYPE.setPixel:
          return new TransactionWithPixel(tx)
        case TRANSACTION_TYPE.setPixels:
          return new TransactionWithPixels(tx)
        case TRANSACTION_TYPE.createCanvas:
        case TRANSACTION_TYPE.withdrawBalance:
          return new Transaction(tx)
        default:
          return new TransactionWithCanvasId(tx)
      }
    })
  }
  return []
}

const updateTransactions = (transaction) => {
  const currentTransactions = getTransactions()

  // Check if transaction is saved already
  const index = currentTransactions.findIndex(tx => tx.hash === transaction.hash)

  const newTransactions = (index >= 0)
    ? [
      ...currentTransactions.slice(0, index),
      transaction,
      ...currentTransactions.slice(index + 1, currentTransactions.length)
    ]
    : [
      ...currentTransactions,
      transaction
    ]

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions))
}

const clearTransactions = () => {
    window.localStorage.removeItem(STORAGE_KEY)
}

export const transactions = {
  getTransactions,
  updateTransactions,
  clearTransactions,
}