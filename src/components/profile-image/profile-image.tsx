import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { InterfaceBtn } from '../interface-btn/interface-btn'
import { authorType } from '../../types/dataTypes'

import styles from './profile-image.module.scss'

type profileImage = {
  header: boolean
  authorDataItem: authorType
  created: string
  list: boolean
}
export function ProfileImage({ header, authorDataItem, created, list }: profileImage) {
  const auth = true
  //   console.log(styles)
  //   const margin = auth ? 'author-date-wrapper__margin' : null

  console.log(new Date(created))

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
          <Link to="/edit-profile">
            <h6 style={{ cursor: 'pointer' }}>John Doe</h6>
          </Link>
        </div>
        <div className={styles['author-img']} />
      </div>
    )
  }

  const renderBtns = () => {
    if (auth && !list) {
      return (
        <div className={styles['interface-btns']}>
          <InterfaceBtn text="Delete" padding={17} height="31px" />
          <Link to="/edit-article">
            <InterfaceBtn text="Edit" padding={19} height="31px" />
          </Link>
        </div>
      )
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
        <img src={authorDataItem.image} alt="avatar" />
      </div>
      {renderBtns()}
    </div>
  )
}
