import axios from 'axios'
import { useRef } from 'react'

import styles from './style.module.scss'

export function TransactionApi() {
  const resultFindATransactionRef = useRef<HTMLDivElement>(null)
  const resultLatestTransactionsRef = useRef<HTMLDivElement>(null)

  const onFindATransactionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!resultFindATransactionRef.current) return

    const formData = new FormData(event.currentTarget)
    const id = (formData.get('id') as string)
    
    const response = await axios.get(`${process.env.API_URL}/transactions/${id}`)

    resultFindATransactionRef.current.innerHTML = response.data
  }

  const onLatestTransactionsSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!resultLatestTransactionsRef.current) return

    const formData = new FormData(event.currentTarget)
    const quantity = (formData.get('quantity') as string)

    const response = await axios.get(`${process.env.API_URL}/transactions/latest?quantity=${quantity}`)

    resultLatestTransactionsRef.current.innerHTML = response.data
  }

  return (
    <div className={styles.transaction_api}>
      <section>
        <h3>Find a transaction</h3>
        <form className={styles.fields} id="findATransactionForm" onSubmit={onFindATransactionSubmit}>
          <label className={styles.field}>
            <span className={styles.name}>id:</span>
            <input type="text" name='id' />
          </label>
        </form>
        <div className={styles.result}>
          <span>result:</span>
          <div className={styles.content} ref={resultFindATransactionRef}>

          </div>
        </div>
        <button
         className={styles.submit_button}
         type="submit"
         form='findATransactionForm'
        >submit</button>
      </section>

      <section>
        <h3>Latest transactions</h3>
        <form className={styles.fields} id="latestTransactionsForm" onSubmit={onLatestTransactionsSubmit}>
          <label className={styles.field}>
            <span className={styles.name}>quantity?:</span>
            <input type="text" name="quantity"/>
          </label>
        </form>
        <div className={styles.result}>
          <span>result:</span>
          <div className={styles.content}>
          </div>
        </div>
        <button className={styles.submit_button} form="latestTransactionsForm" type='submit'>submit</button>
      </section>
    </div>
  )
}