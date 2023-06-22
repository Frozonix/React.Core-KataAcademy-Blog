import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { postLike, deleteLike } from '../../store/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProfileImage } from '../profile-image/profile-image'
import { articleType } from '../../types/dataTypes'

import '../../reusable-styles/list-article-shadow.scss'
import styles from './article-item.module.scss'

type item = {
  dataItem: articleType
  list: boolean
  keyString?: string
  //   setLike: (x: boolean) => void
}

const defaultProps = {
  keyString: '',
}

export function ArticleItem({ dataItem, list, keyString }: item) {
  const { auth } = useAppSelector((state) => state.user)
  //   console.log(dataItem)
  // eslint-disable-next-line
  let author, body, createdAt, description, favorited: boolean, favoritesCount, slug: string, tagList, title, updatedAt
  ;({ author, body, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = dataItem)
  const [like, setLike] = useState<boolean>(favorited)
  const [countLike, setCountLike] = useState<number>(favoritesCount)
  //   const refLike = useRef(like)
  useEffect(() => {
    console.log('hello')
  }, [like])

  const dispatch = useAppDispatch()
  const style = {
    height: list ? '' : '100%',
  }
  console.log(favorited)
  return (
    <div className={list ? `${styles['list-item']} list-article-shadow` : `${styles['list-item']}`} style={style}>
      <div className={styles.wrapper}>
        <div className={styles['left-side']}>
          <div className={styles['item-title-block']}>
            <Link to={`/articles/${slug}`} className={styles['link-wrapper']}>
              <h5>{title.length > 60 && list ? `${title.slice(0, 60)}...` : title}</h5>
            </Link>
            <p>
              <input
                type="checkbox"
                id={`heart${keyString}`}
                onChange={() => {
                  if (auth && !like) {
                    dispatch(postLike(slug))
                    setLike(
                      (prevState) => !prevState
                      //  return !prevState
                    )
                    setCountLike((prevState) => prevState + 1)
                    //   console.log('ref like', refLike.current)
                  }
                  if (auth && like) {
                    dispatch(deleteLike(slug))
                    setLike(
                      (prevState) => !prevState
                      //  return !prevState
                    )
                    setCountLike((prevState) => prevState - 1)
                    //   console.log('ref ne like', refLike.current)
                  }
                }}
                checked={like}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor={`heart${keyString}`}>
                <span> {countLike}</span>
              </label>
            </p>
          </div>
          <div className={styles.tags}>
            {Array.isArray(tagList) && tagList.map((itemTag) => <span key={Math.random()}>{itemTag}</span>)}
          </div>
          <div className={styles['item-preview']}>
            <p>{description.length > 185 && list ? `${description.slice(0, 185)}...` : description}</p>
          </div>
        </div>

        <ProfileImage header={false} authorDataItem={author} created={createdAt} list={list} slug={slug} />
      </div>
    </div>
  )
}

ArticleItem.defaultProps = defaultProps
