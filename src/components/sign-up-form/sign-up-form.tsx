/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { postReg } from '../../store/userSlice'
import { handleSubmitType } from '../../types/dataTypes'
import { InputError } from '../input-error/input-error'
import '../../reusable-styles/form-errors.scss'
import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './sign-up-form.module.scss'

export function SignUpForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isRedirectNeeded } = useAppSelector((state) => state.user)
  const htmlFor: handleSubmitType = {
    username: 'username-reg',
    email: 'email-reg',
    password: 'password-reg',
    repeatPassword: 'repeatPassword-reg',
    check: 'check-reg',
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm<handleSubmitType>({ mode: 'onBlur' })

  useEffect(() => {
    if (isRedirectNeeded) {
      navigate('/sign-in')
    }
  }, [isRedirectNeeded, navigate])

  const myHandleSubmit = (data: handleSubmitType) => {
    dispatch(
      postReg({
        username: data[htmlFor.username],
        email: data[htmlFor.email],
        password: data[htmlFor.password],
        image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      })
    )
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="registration" className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
          <div className={styles.title}>
            <h4>Create new account</h4>
          </div>
          <div className={styles['inputs-wrapper']}>
            <div>
              <label htmlFor={htmlFor.username}>
                Username{' '}
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
              <InputError errors={errors} name={htmlFor.username} />
            </div>
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
              <label htmlFor={htmlFor.repeatPassword}>
                Repeat Password
                <input
                  style={errors[htmlFor.repeatPassword] && { border: '1px solid #f5222d' }}
                  type="password"
                  placeholder="Password"
                  id={htmlFor.repeatPassword}
                  {...register(htmlFor.repeatPassword, {
                    required: 'Required field!',
                    validate: {
                      matchPattern: (v) => v === getValues(htmlFor.password) || 'Passwords must match',
                    },
                  })}
                />
              </label>
              <InputError errors={errors} name={htmlFor.repeatPassword} />
            </div>
          </div>
          <hr />
          <div className={styles['submit-wrapper']}>
            <div>
              <div>
                <input
                  type="checkbox"
                  id={htmlFor.check}
                  className={styles['agree-checkbox']}
                  {...register(htmlFor.check, {
                    required: true,
                  })}
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor={htmlFor.check}>I agree to the processing of my personal information</label>
              </div>
            </div>
            <SubmitBtn text="Create" form="registration" />

            <span>
              Already have an account? <Link to="/sign-in">Sign In</Link>.
            </span>
          </div>
        </form>
      </div>
    </section>
  )
}
