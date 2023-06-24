import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { ErrorBlock } from '../../error-block/error-block'
import { Loading } from '../../loading/loading'
import { ArticleItem } from '../../article-item/article-item'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { getArticle } from '../../../store/articleSlice'

import '../../../reusable-styles/list-article-shadow.scss'

import stylesArticle from './article.module.scss'

export function Article() {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.article)
  const { slug } = useParams()

  useEffect(() => {
    async function get() {
      await dispatch(getArticle(slug))
    }
    get()
  }, [dispatch, slug])

  const renderArticle = () => {
    if (status === 'ok' && data) {
      // eslint-disable-next-line
      let body
      ;({ body } = data)
      return (
        <div className={`${stylesArticle.wrapper} list-article-shadow`}>
          <ArticleItem dataItem={data} list={false} />
          <div className={stylesArticle.article}>
            <div>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
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

  return <>{renderArticle()}</>
}
