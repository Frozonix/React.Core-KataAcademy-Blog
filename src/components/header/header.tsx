import React, { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'

import styles from './header.module.scss'

export function Header() {
  const [auth, setAuth] = useState(false)

  function renderInterface() {
    if (auth) {
      return (
        <div className={styles.interface}>
          <Link to="/create-new-article">
            <InterfaceBtn text="Create article" padding={10} height="31px" />
          </Link>
          {/* <ProfileImage header /> */}
          {/* <Link to="/sign-up"> */}
          <button type="button" className={styles['log-out']}>
            Log Out
          </button>
          {/* </Link> */}
        </div>
      )
    }
    return (
      <div className={styles.interface}>
        <Link to="/sign-in">
          <button type="button" className={styles['sign-in']}>
            Sign In
          </button>
        </Link>
        <Link to="/sign-up">
          <button type="button" className={styles['sign-up']}>
            Sign Up
          </button>
        </Link>
      </div>
    )
  }

  return (
    <header>
      <div className={styles.logo}>
        <Link to="/">
          <span>Realworld Blog</span>
        </Link>
      </div>
      {renderInterface()}
    </header>
  )
}
