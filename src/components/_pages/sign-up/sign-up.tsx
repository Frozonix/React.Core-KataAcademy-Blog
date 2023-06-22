import React from 'react'
import { Link, Navigate } from 'react-router-dom'

import { ErrorBlock } from '../../error-block/error-block'
import { SignUpForm } from '../../sign-up-form/sign-up-form'
import { useAppSelector } from '../../../store/hooks'
import { Loading } from '../../loading/loading'

export function SignUp() {
  const { status, error, userData } = useAppSelector((state) => state.user)
  const renderPage = () => {
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'ok' || status === 'rejected') {
      return (
        <>
          {error ? <ErrorBlock error={error} /> : null}
          <SignUpForm />
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
