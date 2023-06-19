import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getData } from '../../../store/allArticlesSlice'
import { ArticleItem } from '../../article-item/article-item'
import { articleType } from '../../../types/dataTypes'

import styles from './homepage-list.module.scss'

export function HomepageList() {
  const dispatch = useAppDispatch()
  const { data, status, error } = useAppSelector((state) => state.articles)
  useEffect(() => {
    async function get() {
      await dispatch(getData())
    }
    get()
  }, [dispatch])

  function renderList() {
    if (data) {
      return data.articles.map((item: articleType) => (
        <ArticleItem dataItem={item} list key={item.createdAt + Math.random().toString(36).substring(2).toString()} />
      ))
    }
    return null
  }

  return <>{renderList()}</>
}
