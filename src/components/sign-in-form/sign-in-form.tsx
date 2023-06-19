/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import '../../reusable-styles/form-errors.scss'

import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './sign-in-form.module.scss'
import '../../reusable-styles/list-article-shadow.scss'

export function SignInForm() {
  const htmlFor = {
    email: 'email-auth',
    password: 'password-auth',
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const myHandleSubmit = (data: any) => {
    alert(JSON.stringify(data))
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
                  //  name={htmlFor.email}
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
                  })}
                />
              </label>
              <div className="form-error">
                {errors[htmlFor.password] && <p>{errors[htmlFor.password]?.message?.toString()}</p>}
              </div>
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