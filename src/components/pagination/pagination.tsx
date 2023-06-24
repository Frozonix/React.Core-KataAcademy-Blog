import React from 'react'

import styles from './pagination.module.scss'

type PaginationProps = {
  currentPage: number
  setCurrentPage: (x: number) => void
  activePage: boolean[]
  setActivePage: (arr: boolean[]) => void
  maxPage: number
}
export function Pagination({ currentPage, setCurrentPage, activePage, setActivePage, maxPage }: PaginationProps) {
  const getNumber = (x: number) => x + Math.floor(currentPage / 5.01) * 5

  const checkStart = (x: number) => {
    setActivePage([true, false, false, false, false])
    return x < 1 ? 1 : x
  }

  const checkEnd = (x: number) => {
    if (x > maxPage) {
      const newState = [false, false, false, false, false]
      const page = (maxPage % 5) - 1
      newState[page] = true
      setActivePage(newState)
      return maxPage
    }
    return x
  }

  return (
    <div className={styles['pagination-wrapper']}>
      <button
        type="button"
        className={styles['left-btn']}
        onClick={() => setCurrentPage(checkStart(currentPage - 5))}
        onKeyDown={() => setCurrentPage(checkStart(currentPage - 5))}
      >
        &nbsp;
      </button>
      <div>
        <button
          type="button"
          onClick={() => {
            setCurrentPage(getNumber(1))
            setActivePage([true, false, false, false, false])
          }}
          onKeyDown={() => {
            setCurrentPage(getNumber(1))
            setActivePage([true, false, false, false, false])
          }}
          className={`${activePage[0] ? styles.active : ''} ${getNumber(1) > maxPage ? styles['disable-page'] : ''}`}
        >
          {getNumber(1)}
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(getNumber(2))
            setActivePage([false, true, false, false, false])
          }}
          onKeyDown={() => {
            setCurrentPage(getNumber(2))
            setActivePage([false, true, false, false, false])
          }}
          className={`${activePage[1] ? styles.active : ''} ${getNumber(2) > maxPage ? styles['disable-page'] : ''}`}
        >
          {getNumber(2)}
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(getNumber(3))
            setActivePage([false, false, true, false, false])
          }}
          onKeyDown={() => {
            setCurrentPage(getNumber(3))
            setActivePage([false, false, true, false, false])
          }}
          className={`${activePage[2] ? styles.active : ''} ${getNumber(3) > maxPage ? styles['disable-page'] : ''}`}
        >
          {getNumber(3)}
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(getNumber(4))
            setActivePage([false, false, false, true, false])
          }}
          onKeyDown={() => {
            setCurrentPage(getNumber(4))
            setActivePage([false, false, false, true, false])
          }}
          className={`${activePage[3] ? styles.active : ''} ${getNumber(4) > maxPage ? styles['disable-page'] : ''}`}
        >
          {getNumber(4)}
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(getNumber(5))
            setActivePage([false, false, false, false, true])
          }}
          onKeyDown={() => {
            setCurrentPage(getNumber(5))
            setActivePage([false, false, false, false, true])
          }}
          className={`${activePage[4] ? styles.active : ''} ${getNumber(5) > maxPage ? styles['disable-page'] : ''}`}
        >
          {getNumber(5)}
        </button>
      </div>
      <button
        type="button"
        className={styles['right-btn']}
        onClick={() => setCurrentPage(checkEnd(currentPage + 5))}
        onKeyDown={() => setCurrentPage(checkEnd(currentPage + 5))}
      >
        &nbsp;
      </button>
    </div>
  )
}
