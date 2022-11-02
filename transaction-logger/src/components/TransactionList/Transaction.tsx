import { useRef, useState } from "react";
import { Transaction } from "../../types/transaction";
import { Details } from "./Details";

import styles from './style.module.scss'

interface TransactionProps {
  transaction: Transaction
}

export function TransactionElement({ transaction }: TransactionProps) {
  const transactionDivRef = useRef<HTMLDivElement>(null)
  const [ showDetails, setShowDetails ] = useState(false)

  const toggleDetails = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(transactionDivRef.current === null) return

    const detailsElement = (transactionDivRef.current.children[1] as HTMLDivElement)
    detailsElement.classList.toggle(styles.active)
    setShowDetails(prev => !prev)
  }

  return (
    <div className={styles.transaction} ref={transactionDivRef}>
      <div
       className={`${styles.main} ${styles[transaction.status]}`} 
       onClick={toggleDetails}
      >
        <div className={styles.name}>{transaction.author.fullName}</div>
        <div className={styles.cpf}>{transaction.author.cpf}</div>
        <div className={styles.credit_card_number}>{transaction.creditCard.number}</div>
        <div className={styles.status}>{transaction.status}</div>
      </div>

      
      <Details transaction={transaction} showDetails={showDetails} />
      
    </div>
  )
}