import React, { useEffect, useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { getUser, userLogout } from '../../store/userSlice'

import styles from './header.module.scss'

export function Header() {
  const dispatch = useAppDispatch()
  const { auth, userData } = useAppSelector((state) => state.user)
  console.log(auth)
  //   const [auth, setAuth] = useState(false)
  useEffect(() => {
    if (auth) {
      dispatch(getUser())
    }
  }, [auth, dispatch])
  function renderInterface() {
    if (auth) {
      return (
        <div className={styles.interface}>
          <Link to="/new-article">
            <InterfaceBtn text="Create article" padding={10} height="31px" />
          </Link>
          <ProfileImage header authorDataItem={userData} created="" list={false} />
          {/* <Link to="/sign-up"> */}
          <button type="button" className={styles['log-out']} onClick={() => dispatch(userLogout())}>
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
