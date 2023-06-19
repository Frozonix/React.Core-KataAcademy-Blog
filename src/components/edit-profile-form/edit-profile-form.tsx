/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../reusable-styles/form-errors.scss'

import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './edit-profile-form.module.scss'
import '../../reusable-styles/list-article-shadow.scss'

export function EditProfileForm() {
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
    alert(JSON.stringify(data))
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
                    required: 'Required field!',
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
              <div className="form-error">
                {errors[htmlFor.username] && <p>{errors[htmlFor.username]?.message?.toString()}</p>}
              </div>
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
                    required: 'Required field!',
                    validate: {
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        'Email address must be a valid address',
                    },
                  })}
                />
              </label>
              <div className="form-error">
                {errors[htmlFor.email] && <p>{errors[htmlFor.email]?.message?.toString()}</p>}
              </div>
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
              <div className="form-error">
                {errors[htmlFor.password] && <p>{errors[htmlFor.password]?.message?.toString()}</p>}
              </div>
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
                    required: 'Required field!',
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                      message: 'Invalid URL',
                    },
                  })}
                />
              </label>
              <div className="form-error">
                {errors[htmlFor.avatar] && <p>{errors[htmlFor.avatar]?.message?.toString()}</p>}
              </div>
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
