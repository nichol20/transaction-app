import React, { useState } from 'react';
import { io } from 'socket.io-client';

import { TransactionApi } from './components/TransactionApi';
import { TransactionTable } from './components/TransactionTable';

import styles from './styles/App.module.scss'

export const socket = io("http://localhost:4000") 

function App() {
  const [ tab, setTab ] = useState('logger')

  const changeTab = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const tabElementList = (event.currentTarget.parentElement as HTMLElement).children;
    
    setTab(event.currentTarget.id);

    // remove active class from each element
    Object.keys(tabElementList).forEach(key => {
      (tabElementList[key] as HTMLButtonElement).classList.remove(styles.active)
    })

    // add active class on current element
    event.currentTarget.classList.add(styles.active)
  }

  return (
    <div className={styles.app}>
      <header>
        <nav>
          <button onClick={changeTab} id='logger' className={styles.active}>Logger</button>
          <button onClick={changeTab} id='api'>Api</button>
        </nav>
      </header>
      {
        tab === 'logger' ? <TransactionTable />
        : tab === 'api' ? <TransactionApi />
        : null
      }
    </div>
  );
}

export default App;
