import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../../header/header'

import styles from './layout.module.scss'

export function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
