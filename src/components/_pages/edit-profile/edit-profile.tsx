import React from 'react'

import { ErrorBlock } from '../../error-block/error-block'
import { useAppSelector } from '../../../store/hooks'
import { Loading } from '../../loading/loading'
import { EditProfileForm } from '../../edit-profile-form/edit-profile-form'

export function EditProfile() {
  const { status, error } = useAppSelector((state) => state.user)
  const renderPage = () => {
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'ok' || status === 'rejected') {
      return (
        <>
          {error ? <ErrorBlock error={error} /> : null}
          <EditProfileForm />
        </>
      )
    }
    return null
  }
  return renderPage()
}
