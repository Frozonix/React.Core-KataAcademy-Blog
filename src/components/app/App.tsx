import React from 'react'
import { Route, Routes, Link, Navigate } from 'react-router-dom'

import { HomepageList } from '../_pages/homepage-list/homepage-list'
import { Layout } from '../_pages/layout/layout'
import { Article } from '../_pages/article/article'
import { SignUp } from '../_pages/sign-up/sign-up'
import { SignIn } from '../_pages/sign-in/sign-in'
import { EditProfile } from '../_pages/edit-profile/edit-profile'
import { CreateNewArticle } from '../_pages/create-new-article/create-new-article'
import { EditArticle } from '../_pages/edit-article/edit-article'
import { useAppSelector } from '../../store/hooks'

import styles from './App.module.scss'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomepageList />} />
        <Route path="articles" element={<Navigate to="/" replace />} />
        <Route path="articles/:slug" element={<Article />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="profile" element={<EditProfile />} />
        <Route path="new-article" element={<CreateNewArticle />} />
        <Route path="articles/:slug/edit" element={<EditArticle />} />
      </Route>
    </Routes>
  )
}
