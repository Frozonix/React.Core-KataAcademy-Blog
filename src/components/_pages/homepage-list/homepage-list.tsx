import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { toggleRedirectNeeded } from '../../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Loading } from '../../loading/loading'
import { getData } from '../../../store/allArticlesSlice'
import { ArticleItem } from '../../article-item/article-item'
import { articleType } from '../../../types/dataTypes'
import { ErrorBlock } from '../../error-block/error-block'

import styles from './homepage-list.module.scss'

ErrorBlock
// https://blog.kata.academy/api/articles?limit=5&offset=5
export function HomepageList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activePage, setActivePage] = useState([true, false, false, false, false])
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.articles)
  //   const { isRedirectNeeded } = useAppSelector((state) => state.article)
  const { auth } = useAppSelector((state) => state.user)
  const maxPage = Math.ceil(data.articlesCount / 20)
  useEffect(() => {
    dispatch(toggleRedirectNeeded())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    async function get() {
      await dispatch(getData([currentPage, auth]))
    }
    get()
  }, [currentPage, dispatch, auth])
  //   function renderPageNumberWrapper(x: number) {
  //     if (currentPage <= 2) {
  //     }
  //   }
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

  function renderList() {
    //  console.log(data.articles.length)
    if ((status === 'ok' || status === 'rejected') && data.articles.length) {
      // console.log(data)
      const articles = data.articles.map((item: articleType) => {
        const key = item.createdAt + Math.random().toString(36).substring(2).toString()
        return <ArticleItem dataItem={item} list key={key} keyString={key} />
      })

      return (
        <>
          {articles}
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
                className={`${activePage[0] ? styles.active : ''} ${
                  getNumber(1) > maxPage ? styles['disable-page'] : ''
                }`}
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
                className={`${activePage[1] ? styles.active : ''} ${
                  getNumber(2) > maxPage ? styles['disable-page'] : ''
                }`}
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
                className={`${activePage[2] ? styles.active : ''} ${
                  getNumber(3) > maxPage ? styles['disable-page'] : ''
                }`}
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
                className={`${activePage[3] ? styles.active : ''} ${
                  getNumber(4) > maxPage ? styles['disable-page'] : ''
                }`}
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
                className={`${activePage[4] ? styles.active : ''} ${
                  getNumber(5) > maxPage ? styles['disable-page'] : ''
                }`}
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
        </>
      )
    }
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'rejected') {
      return <ErrorBlock error={error} />
    }
    return null
  }

  return <>{renderList()}</>
}
