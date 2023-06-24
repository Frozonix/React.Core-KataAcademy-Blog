import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { ErrorBlock } from '../../error-block/error-block'
import { SignUpForm } from '../../sign-up-form/sign-up-form'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { Loading } from '../../loading/loading'
import { clearError } from '../../../store/userSlice'

export function SignUp() {
  const { status, error, userData } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

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
