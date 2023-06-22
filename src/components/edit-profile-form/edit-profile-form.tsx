/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { putUserData } from '../../store/userSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
// eslint-disable-next-line import/order
import { InputError } from '../input-error/input-error'
import '../../reusable-styles/form-errors.scss'

import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './edit-profile-form.module.scss'

import '../../reusable-styles/list-article-shadow.scss'

export function EditProfileForm() {
  const { userData } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const htmlFor = {
    username: 'username-edit-profile',
    email: 'email-edit-profile',
    password: 'password-edit-profile',
    avatar: 'avatar-edit-profile',
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ mode: 'onBlur' })

  const myHandleSubmit = (data: any) => {
    const obj = {
      username: data[htmlFor.username],
      email: data[htmlFor.email],
      password: data[htmlFor.password],
      avatar: data[htmlFor.avatar],
    }

    const newData = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== ''))
    console.log(newData)
    dispatch(putUserData(newData))
  }
  if (!userData) {
    return <Navigate to="/sign-in" replace />
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="edit-profile" className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
          <div className={styles.title}>
            <h4>Edit Profile</h4>
          </div>
          <div className={styles['inputs-wrapper']}>
            <div>
              <label htmlFor={htmlFor.username}>
                Username
                <input
                  style={errors[htmlFor.username] && { border: '1px solid #f5222d' }}
                  type="text"
                  placeholder="Username"
                  id={htmlFor.username}
                  {...register(htmlFor.username, {
                    minLength: {
                      value: 3,
                      message: 'The field must contain from 3 to 20 characters',
                    },
                    maxLength: {
                      value: 20,
                      message: 'The field must contain from 3 to 20 characters',
                    },
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.username} />
            </div>
            <div>
              <label htmlFor={htmlFor.email}>
                Email address{' '}
                <input
                  style={errors[htmlFor.email] && { border: '1px solid #f5222d' }}
                  type="text"
                  placeholder="Email address"
                  id={htmlFor.email}
                  {...register(htmlFor.email, {
                    validate: {
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        /^$/.test(v) ||
                        'Email address must be a valid address',
                    },
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.email} />
            </div>
            <div>
              <label htmlFor={htmlFor.password}>
                Password{' '}
                <input
                  style={errors[htmlFor.password] && { border: '1px solid #f5222d' }}
                  type="password"
                  placeholder="Password"
                  id={htmlFor.password}
                  {...register(htmlFor.password, {
                    minLength: {
                      value: 6,
                      message: 'The field must contain from 6 to 40 characters',
                    },
                    maxLength: {
                      value: 40,
                      message: 'The field must contain from 6 to 40 characters',
                    },
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.password} />
            </div>
            <div>
              <label htmlFor={htmlFor.avatar}>
                Avatar image (url)
                <input
                  style={errors[htmlFor.avatar] && { border: '1px solid #f5222d' }}
                  type="text"
                  placeholder="Avatar image"
                  id={htmlFor.avatar}
                  {...register(htmlFor.avatar, {
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                      message: 'Invalid URL',
                    },
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.avatar} />
            </div>
          </div>
          <div className={styles['submit-wrapper']}>
            <SubmitBtn text="Save" form="edit-profile" />
          </div>
        </form>
      </div>
    </section>
  )
}
