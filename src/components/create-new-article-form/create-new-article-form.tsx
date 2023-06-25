/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { postArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { ReusableForm } from '../reusable-form/reusable-form'
import { handleSubmitTypeTags } from '../../types/dataTypes'

import styles from './create-new-article-form.module.scss'

import '../../reusable-styles/reg-auth-shadow.scss'

export function CreateNewArticleForm() {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { userData } = useAppSelector((state) => state.user)
  const { isRedirectNeeded } = useAppSelector((state) => state.article)
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
      postArticle({
        title: data[htmlFor.title.toString()].toString(),
        description: data[htmlFor.shortDescription.toString()].toString(),
        body: data[htmlFor.text.toString()].toString(),
        tagList,
      })
    )
  }
  if (!userData) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="create-new-article" className={styles.form} onSubmit={handleSubmit(myHandleSubmit)}>
          <ReusableForm
            isCreateArticle
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
