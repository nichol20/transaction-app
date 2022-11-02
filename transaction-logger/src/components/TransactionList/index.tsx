import React from 'react'

import { Transaction } from "../../types/transaction"

import styles from './style.module.scss'
import { TransactionElement } from './Transaction'

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {

  return (
    <div className={styles.transaciont_list}>
        {
          transactions.map((transaction, index) =>
           <TransactionElement transaction={transaction} key={index}/>
          )
        }
    </div>
  )
}