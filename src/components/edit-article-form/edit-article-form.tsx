/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'

import { putArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { SubmitBtn } from '../submit-btn/submit-btn'
import { ReusableForm } from '../reusable-form/reusable-form'
import { ModalDeleteArticle } from '../modal-delete-article/modal-delete-article'

import styles from './edit-article-form.module.scss'

import '../../reusable-styles/reg-auth-shadow.scss'

export function EditArticleForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userData } = useAppSelector((state) => state.user)
  const { status, isRedirectNeeded } = useAppSelector((state) => state.article)
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
    control,
    setValue,
  } = useForm({ mode: 'onBlur', defaultValues: { tags: [{ tag: '' }] } })

  useEffect(() => {
    if (isRedirectNeeded) {
      navigate('/')
    }
  }, [isRedirectNeeded, navigate])

  const myHandleSubmit = (data: any) => {
    const tagList = data.tags
      .filter((item: { tag: string }) => item.tag.trim() !== '' && item.tag)
      .map((item: { tag: string }) => item.tag)
    console.log(tagList)
    dispatch(
      putArticle([
        {
          title: data[htmlFor.title],
          description: data[htmlFor.shortDescription],
          body: data[htmlFor.text],
          tagList,
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
          <ReusableForm
            isCreateArticle={false}
            htmlFor={htmlFor}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
          />
        </form>
      </div>
    </section>
  )
}
