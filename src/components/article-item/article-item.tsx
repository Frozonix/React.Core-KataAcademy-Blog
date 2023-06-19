import React from 'react'
import { Link } from 'react-router-dom'

import { ProfileImage } from '../profile-image/profile-image'
import { articleType } from '../../types/dataTypes'

import '../../reusable-styles/list-article-shadow.scss'
import styles from './article-item.module.scss'

type item = {
  dataItem: articleType
  list: boolean
}
export function ArticleItem({ dataItem, list }: item) {
  //   console.log(dataItem)
  // eslint-disable-next-line
  let author, body, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt
  ;({ author, body, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = dataItem)
  console.log(tagList)
  const style = {
    height: list ? '' : '100%',
  }
  return (
    <div className={list ? `${styles['list-item']} list-article-shadow` : `${styles['list-item']}`} style={style}>
      <div className={styles.wrapper}>
        <div className={styles['left-side']}>
          <div className={styles['item-title-block']}>
            <Link to={`/articles/${slug}`} className={styles['link-wrapper']}>
              <h5>{title}</h5>
            </Link>
            <p>
              <input type="checkbox" id="heart" />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="heart">
                <span> {favoritesCount}</span>
              </label>
            </p>
          </div>
          <div className={styles.tags}>
            {tagList.map((itemTag) => (
              <span key={Math.random()}>{itemTag}</span>
            ))}
          </div>
          <div className={styles['item-preview']}>
            <p>{description}</p>
          </div>
        </div>

        <ProfileImage header={false} authorDataItem={author} created={createdAt} list={list} />
      </div>
    </div>
  )
}
