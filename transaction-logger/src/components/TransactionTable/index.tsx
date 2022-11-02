import { useEffect, useState } from 'react'
import { socket } from '../../App'

import { Transaction } from '../../types/transaction'
import { TransactionList } from '../TransactionList'
import styles from './style.module.scss'

export function TransactionTable() {
  const [ transactions, setTransactions ] = useState<Transaction[]>([])

  useEffect(() => {
    socket.on('new-transaction', (transaction: Transaction) => {
      setTransactions(prev => {
        let newData = [...prev, transaction]
        if(newData.length > 15) newData.shift()
        return newData
      })
    })

    return () => {
      socket.off('new-transaction')
    }
  }, [])

  return (
    <div className={styles.transaction_table}>
      <div className={styles.header}>
        <div className={styles.column}>full name</div>
        <div className={styles.column}>cpf</div>
        <div className={styles.column}>credit card number</div>
        <div className={styles.column}>status</div>
      </div>

      <TransactionList transactions={transactions} />
    </div>
  )
}