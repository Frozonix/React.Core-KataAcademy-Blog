import React, { useState, useEffect } from 'react'

import { toggleRedirectNeeded } from '../../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { Loading } from '../../loading/loading'
import { getData } from '../../../store/allArticlesSlice'
import { ArticleItem } from '../../article-item/article-item'
import { articleType } from '../../../types/dataTypes'
import { ErrorBlock } from '../../error-block/error-block'
import { Pagination } from '../../pagination/pagination'

export function HomepageList() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activePage, setActivePage] = useState([true, false, false, false, false])
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.articles)
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

  function renderList() {
    if ((status === 'ok' || status === 'rejected') && data.articles.length) {
      const articles = data.articles.map((item: articleType) => {
        const key = item.createdAt + Math.random().toString(36).substring(2).toString()
        return <ArticleItem dataItem={item} list key={key} keyString={key} />
      })

      return (
        <>
          {articles}
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            activePage={activePage}
            setActivePage={setActivePage}
            maxPage={maxPage}
          />
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
