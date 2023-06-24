/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { handleSubmitTypeTags } from '../../types/dataTypes'
import { putArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ReusableForm } from '../reusable-form/reusable-form'

import styles from './edit-article-form.module.scss'

import '../../reusable-styles/reg-auth-shadow.scss'

export function EditArticleForm() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userData } = useAppSelector((state) => state.user)
  const { isRedirectNeeded } = useAppSelector((state) => state.article)
  const slug = useLocation().pathname.replace('/articles/', '').replace('/edit', '')
  const htmlFor: handleSubmitTypeTags = {
    title: 'title-new-article',
    shortDescription: 'short-desc-new-article',
    text: 'text-new-article',
    tags: [],
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<handleSubmitTypeTags>({ mode: 'onBlur', defaultValues: { tags: [{ tag: '' }] } })

  useEffect(() => {
    if (isRedirectNeeded) {
      navigate('/')
    }
  }, [isRedirectNeeded, navigate])

  const myHandleSubmit = (data: handleSubmitTypeTags) => {
    let tagList
    if (Array.isArray(data.tags)) {
      tagList = data.tags
        .filter((item: { tag: string }) => item.tag.trim() !== '' && item.tag)
        .map((item: { tag: string }) => item.tag)
    }

    dispatch(
      putArticle([
        {
          title: data[htmlFor.title.toString()].toString(),
          description: data[htmlFor.shortDescription.toString()],
          body: data[htmlFor.text.toString()],
          tagList,
        },
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
