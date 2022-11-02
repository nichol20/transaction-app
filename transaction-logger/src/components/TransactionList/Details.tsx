import { Transaction } from '../../types/transaction'
import styles from './style.module.scss'

interface DetailsProps {
  transaction: Transaction
  showDetails: boolean
}

export function Details({ transaction, showDetails }: DetailsProps) {

  return (
    <div className={styles.details}>

      {
        showDetails && (
          <>
            <div className={`${styles.person_column} ${styles.column}`}>
              <h3>Person</h3>
              {
                Object.keys(transaction.author).map((field, i) => {
                  return (
                    <div className={styles.row} key={i}>
                      <span className={styles.field_name}>{field}:</span>
                      <div className={styles.field}>{transaction.author[field]}</div>
                    </div>
                  )
                })
              }
            </div>

            <div className={`${styles.credit_card_column} ${styles.column}`}>
              <h3>Credit Card</h3>
              {
                Object.keys(transaction.creditCard).map((field, i) => {
                  return (
                    <div className={styles.row} key={i}>
                      <span className={styles.field_name}>{field}:</span>
                      <div className={styles.field}>{transaction.creditCard[field]}</div>
                    </div>
                  )
                })
              }
            </div>

            <div className={`${styles.transaction_column} ${styles.column}`}>
              <h3>Transaction</h3>
              {
                Object.keys(transaction).map((field, i) => {
                  if(['creditCard', 'author'].includes(field)) return null
                  return (
                    <div className={styles.row} key={i}>
                      <span className={styles.field_name}>{field}:</span>
                      <div className={styles.field}>{transaction[field]}</div>
                    </div>
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}