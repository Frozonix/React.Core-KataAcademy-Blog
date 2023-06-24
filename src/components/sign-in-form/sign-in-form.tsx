/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { toggleRedirectNeededUser, postLogin } from '../../store/userSlice'
import { handleSubmitType } from '../../types/dataTypes'
import { useAppDispatch } from '../../store/hooks'
import { InputError } from '../input-error/input-error'
import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './sign-in-form.module.scss'

import '../../reusable-styles/list-article-shadow.scss'

export function SignInForm() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(toggleRedirectNeededUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const htmlFor: handleSubmitType = {
    email: 'email-auth',
    password: 'password-auth',
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<handleSubmitType>({ mode: 'onBlur' })

  const myHandleSubmit = (data: handleSubmitType) => {
    dispatch(
      postLogin({
        email: data[htmlFor.email],
        password: data[htmlFor.password],
      })
    )
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="authorization" className={styles['reg-form']} onSubmit={handleSubmit(myHandleSubmit)}>
          <div className={styles.title}>
            <h4>Sign In</h4>
          </div>
          <div className={styles['inputs-wrapper']}>
            <div>
              <label htmlFor={htmlFor.email}>
                Email address
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
              <InputError errors={errors} name={htmlFor.email} />
            </div>
            <div>
              <label htmlFor={htmlFor.password}>
                Password
                <input
                  style={errors[htmlFor.password] && { border: '1px solid #f5222d' }}
                  type="password"
                  placeholder="Password"
                  id={htmlFor.password}
                  {...register(htmlFor.password, {
                    required: 'Required field!',
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.password} />
            </div>
          </div>
          <div className={styles['submit-wrapper']}>
            <SubmitBtn text="Login" form="authorization" />
            <span>
              Don’t have an account? <Link to="/sign-up">Sign Up</Link>.
            </span>
          </div>
        </form>
      </div>
    </section>
  )
}
