/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../reusable-styles/form-errors.scss'

import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './sign-up-form.module.scss'

export function SignUpForm() {
  const htmlFor = {
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
  } = useForm({ mode: 'onBlur' })

  const myHandleSubmit = (data: any) => {
    alert(JSON.stringify(data))
    console.log(getValues(htmlFor.password))
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
              <div className="form-error">
                {errors[htmlFor.username] && <p>{errors[htmlFor.username]?.message?.toString()}</p>}
              </div>
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
              <div className="form-error">
                {errors[htmlFor.email] && <p>{errors[htmlFor.email]?.message?.toString()}</p>}
              </div>
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
              <div className="form-error">
                {errors[htmlFor.password] && <p>{errors[htmlFor.password]?.message?.toString()}</p>}
              </div>
            </div>
            <div>
              <label htmlFor={htmlFor.repeatPassword}>
                Repeat Password
                <input
                  style={errors[htmlFor.password] && { border: '1px solid #f5222d' }}
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
              <div className="form-error">
                {errors[htmlFor.repeatPassword] && <p>{errors[htmlFor.repeatPassword]?.message?.toString()}</p>}
              </div>
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
