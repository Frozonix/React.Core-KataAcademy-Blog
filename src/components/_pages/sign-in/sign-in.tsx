import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import { useAppSelector } from '../../../store/hooks'
import { SignInForm } from '../../sign-in-form/sign-in-form'
import { Loading } from '../../loading/loading'
import { ErrorBlock } from '../../error-block/error-block'

export function SignIn() {
  const { status, error, userData } = useAppSelector((state) => state.user)

  const renderPage = () => {
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'ok' || status === 'rejected') {
      return (
        <>
          {error ? <ErrorBlock error={error} /> : null}
          <SignInForm />
        </>
      )
    }
    return null
  }
  if (userData) {
    return <Navigate to="/" replace />
  }
  return renderPage()
}
