import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../header/header'
import { useAppDispatch } from '../../../store/hooks'
import { postLogin } from '../../../store/userSlice'

import styles from './layout.module.scss'

export function Layout() {
  const dispatch = useAppDispatch()
  if (localStorage.getItem('email') && localStorage.getItem('password')) {
    const email = localStorage.getItem('email') || ''
    const password = localStorage.getItem('password') || ''
    dispatch(postLogin({ email, password }))
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
