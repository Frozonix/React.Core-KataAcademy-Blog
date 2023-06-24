/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useFieldArray } from 'react-hook-form'

import { getArticle } from '../../store/articleSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { InputError } from '../input-error/input-error'
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
    tags: []
  }
  cbTags: (array: string[]) => { tag: string }[]
  register: any
  errors: any
  control: any
  setValue: any
}
export function ReusableForm({
  isCreateArticle,
  htmlFor,
  cbTags,
  register,
  errors,
  control,
  setValue,
}: ReusableFormProps) {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector((state) => state.article)
  const slug = useLocation().pathname.replace('/articles/', '').replace('/edit', '')

  const { fields, append, remove } = useFieldArray({ control, name: 'tags' })

  useEffect(() => {
    async function get() {
      await dispatch(getArticle(slug))
    }
    if (!isCreateArticle && !data) {
      get()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (data) {
      if (isCreateArticle) {
        setValue(htmlFor.title, '')
        setValue(htmlFor.shortDescription, '')
        setValue(htmlFor.text, '')
      } else {
        setValue(htmlFor.title, data.title)
        setValue(htmlFor.shortDescription, data.description)
        setValue(htmlFor.text, data.body)
        setValue('tags', cbTags(data.tagList) || [{ tag: '' }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const render = () => (
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
          {fields.map((field, index) => (
            <div key={field.id}>
              <input type="text" placeholder="Tag" {...register(`tags.${index}.tag`)} />
              {fields.length > 1 && (
                <InterfaceBtn text="Delete" padding={37} height="100%" remove={remove} index={index} />
              )}

              {fields.length === index + 1 && (
                <InterfaceBtn text="Add tag" padding={40} height="100%" append={append} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles['submit-wrapper']}>
        <SubmitBtn text="Send" form={isCreateArticle ? 'create-new-article' : 'edit-article'} />
      </div>
    </div>
  )
  return render()
}
