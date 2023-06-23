import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Loading } from '../../loading/loading'
import { Header } from '../../header/header'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { postLogin, toggleFirstRequest } from '../../../store/userSlice'

import styles from './layout.module.scss'

export function Layout() {
  const dispatch = useAppDispatch()
  const { startRequest } = useAppSelector((state) => state.user)

  //   if (localStorage.getItem('email') && localStorage.getItem('password') && !startRequest) {
  //     const email = localStorage.getItem('email') || ''
  //     const password = localStorage.getItem('password') || ''
  //     dispatch(postLogin({ email, password }))
  //   } else {
  //     dispatch(toggleFirstRequest())
  //   }

  useEffect(() => {
    if (localStorage.getItem('email') && localStorage.getItem('password') && !startRequest) {
      const email = localStorage.getItem('email') || ''
      const password = localStorage.getItem('password') || ''
      dispatch(postLogin({ email, password }))
    } else {
      dispatch(toggleFirstRequest())
    }
  }, [startRequest, dispatch])

  return (
    <>
      <Header />
      <main className={styles.main}>{startRequest ? <Outlet /> : <Loading />}</main>
    </>
  )
}
