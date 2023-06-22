import React from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { putArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { SubmitBtn } from '../submit-btn/submit-btn'
import { ReusableForm } from '../reusable-form/reusable-form'
import { ModalDeleteArticle } from '../modal-delete-article/modal-delete-article'

import styles from './edit-article-form.module.scss'

import '../../reusable-styles/reg-auth-shadow.scss'

ModalDeleteArticle

export function EditArticleForm() {
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.user)
  const slug = useLocation().pathname.replace('/articles/', '').replace('/edit', '')
  const htmlFor = {
    title: 'title-new-article',
    shortDescription: 'short-desc-new-article',
    text: 'text-new-article',
    tag: 'tag-new-article',
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const myHandleSubmit = (data: any) => {
    console.log('EEEDIIIITTTT')
    dispatch(
      putArticle([
        {
          title: data[htmlFor.title],
          description: data[htmlFor.shortDescription],
          body: data[htmlFor.text],
          tagList: ['hello'],
        },
        userData.token,
        slug,
      ])
    )
  }
  if (!userData) {
    return <Navigate to="/sign-in" replace />
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="edit-article" className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
          <ReusableForm isCreateArticle={false} htmlFor={htmlFor} register={register} errors={errors} />
          {/* <div className={styles.title}>
            <h4>Edit article</h4>
          </div>
          <div className={styles['inputs-wrapper']}>
            <div>

              <label htmlFor={htmlFor.title}>Title</label>
              <input type="text" placeholder="Title" id={htmlFor.title} name={htmlFor.title} />
            </div>
            <div>

              <label htmlFor={htmlFor.shortDescription}>Short description</label>
              <input
                type="text"
                placeholder="Description"
                id={htmlFor.shortDescription}
                name={htmlFor.shortDescription}
              />
            </div>
            <div>

              <label htmlFor={htmlFor.text}>Text</label>
              <textarea placeholder="Text" id={htmlFor.text} name={htmlFor.text} />
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
            <SubmitBtn text="Send" form="registration" />
          </div> */}
        </form>
      </div>
    </section>
  )
}
