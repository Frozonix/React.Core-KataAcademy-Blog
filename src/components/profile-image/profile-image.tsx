import React, { useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { useAppSelector } from '../../store/hooks'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { authorType } from '../../types/dataTypes'

import styles from './profile-image.module.scss'

type headerDataType = {
  user: {
    username: string
    email: string
    token: string
  }
}

type profileImage = {
  header: boolean
  authorDataItem: any
  created: string
  list: boolean
  slug?: string
}

const defaultProps = {
  slug: '',
}

export function ProfileImage({ header, authorDataItem, created, list, slug }: profileImage) {
  const { auth, userData } = useAppSelector((state) => state.user)
  //   console.log(authorDataItem)
  function getDateText() {
    const date = new Date(created)
    const day = String(date.getDate()).padStart(2, '0')
    const month = date.toLocaleString('en-EN', { month: 'long' })

    return `${month} ${day}, ${date.getFullYear()}`
  }
  if (header && auth) {
    return (
      <div className={styles['author-header']}>
        <div className={styles['author-date-wrapper']}>
          <Link to="/profile">
            <h6 style={{ cursor: 'pointer' }}>{authorDataItem.username}</h6>
          </Link>
        </div>
        <div className={styles['author-img']}>
          <img
            src={
              authorDataItem.image ? authorDataItem.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'
            }
            alt="avatar"
          />
        </div>
      </div>
    )
  }

  const renderBtns = () => {
    //  console.log(slug)
    if (userData) {
      // console.log(userData.username, authorDataItem.username)
      if (auth && !list && userData.username === authorDataItem.username) {
        return (
          <div className={styles['interface-btns']}>
            <InterfaceBtn text="Delete" padding={17} height="31px" click={() => console.log('is delete')} />
            <Link to={`/articles/${slug}/edit`}>
              <InterfaceBtn text="Edit" padding={19} height="31px" />
            </Link>
          </div>
        )
      }
    }
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['author-date-wrapper']}>
        <h6>{authorDataItem.username}</h6>
        <p>{getDateText()}</p>
      </div>
      <div className={styles['author-img']}>
        <img
          src={
            authorDataItem.image ? authorDataItem.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'
          }
          alt="avatar"
        />
      </div>
      {renderBtns()}
    </div>
  )
}

ProfileImage.defaultProps = defaultProps
