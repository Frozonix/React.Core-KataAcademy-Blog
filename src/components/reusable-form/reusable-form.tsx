/* eslint-disable react/jsx-props-no-spreading */

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { postArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { InputError } from '../input-error/input-error'
import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './reusable-form.module.scss'

import '../../reusable-styles/reg-auth-shadow.scss'

type ReusableFormProps = {
  isCreateArticle: boolean
  htmlFor: {
    title: string
    shortDescription: string
    text: string
    tag: string
  }
  register: any
  errors: any
}
export function ReusableForm({ isCreateArticle, htmlFor, register, errors }: ReusableFormProps) {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.user)
  //   const htmlFor = {
  //     title: isCreateArticle ? 'title-new-article' : 'title-new-article',
  //     shortDescription: isCreateArticle ? 'short-desc-new-article' : 'short-desc-new-article',
  //     text: isCreateArticle ? 'text-new-article' : 'text-new-article',
  //     tag: isCreateArticle ? 'tag-new-article' : 'tag-new-article',
  //   }
  //   const {
  //     register,
  //     formState: { errors },
  //     //  handleSubmit,
  //   } = useForm({ mode: 'onBlur' })

  //   const myHandleSubmit = (data: any) => {
  //     if (isCreateArticle) {
  //       dispatch(
  //         postArticle([
  //           {
  //             title: data[htmlFor.title],
  //             description: data[htmlFor.shortDescription],
  //             body: data[htmlFor.text],
  //             tagList: ['hello'],
  //           },
  //           userData.token,
  //         ])
  //       )
  //     }
  //   }
  return (
    //  <section className={styles.wrapper}>
    //    <div className={styles['form-wrapper']}>
    //      <form id="create-new-article" className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
    <div className={styles['reusable-form-wrapper']}>
      <div className={styles.title}>
        <h4>{isCreateArticle ? 'Create new article' : 'Edit article'}</h4>
      </div>
      <div className={styles['inputs-wrapper']}>
        <div>
          <label htmlFor={htmlFor.title}>
            Title{' '}
            <input
              type="text"
              placeholder="Title"
              id={htmlFor.title}
              {...register(htmlFor.title, {
                required: 'Required field!',
              })}
            />
          </label>
          <InputError errors={errors} name={htmlFor.title} />
        </div>
        <div>
          <label htmlFor={htmlFor.shortDescription}>
            Short description
            <input
              type="text"
              placeholder="Description"
              id={htmlFor.shortDescription}
              {...register(htmlFor.shortDescription, {
                required: 'Required field!',
              })}
            />
          </label>
          <InputError errors={errors} name={htmlFor.shortDescription} />
        </div>
        <div>
          <label htmlFor={htmlFor.text}>
            Text
            <textarea
              placeholder="Text"
              id={htmlFor.text}
              {...register(htmlFor.text, {
                required: 'Required field!',
              })}
            />
          </label>
          <InputError errors={errors} name={htmlFor.text} />
        </div>
      </div>
      <div className={`${styles['inputs-wrapper']} ${styles.tags}`}>
        <p>Tags</p>
        <div className={styles['tags-wrapper']}>
          <div>
            <input type="text" placeholder="Tag" id={`${htmlFor.tag}1`} name={`${htmlFor.tag}1`} />
            <InterfaceBtn text="Delete" padding={37} height="100%" />
          </div>
          <div>
            <input type="text" placeholder="Tag" id={`${htmlFor.tag}2`} name={`${htmlFor.tag}2`} />
            <InterfaceBtn text="Delete" padding={37} height="100%" />
            <InterfaceBtn text="Add tag" padding={40} height="100%" />
          </div>
        </div>
      </div>
      <div className={styles['submit-wrapper']}>
        <SubmitBtn text="Send" form={isCreateArticle ? 'create-new-article' : 'edit-article'} />
      </div>
    </div>
    //      </form>
    //    </div>
    //  </section>
  )
}
