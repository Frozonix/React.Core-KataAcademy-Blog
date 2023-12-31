import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { clearError } from '../../../store/userSlice'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { SignInForm } from '../../sign-in-form/sign-in-form'
import { Loading } from '../../loading/loading'
import { ErrorBlock } from '../../error-block/error-block'

export function SignIn() {
  const { status, error, userData } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(clearError())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    return <Navigate to={location.state ? location.state.from : '/'} replace />
  }
  return renderPage()
}
