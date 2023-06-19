import React from 'react'
import { Link } from 'react-router-dom'

import { ProfileImage } from '../profile-image/profile-image'
import { InterfaceBtn } from '../interface-btn/interface-btn'
import { SubmitBtn } from '../submit-btn/submit-btn'

import styles from './edit-article-form.module.scss'
import '../../reusable-styles/reg-auth-shadow.scss'

export function EditArticleForm() {
  const htmlFor = {
    title: 'title-new-article',
    shortDescription: 'short-desc-new-article',
    text: 'text-new-article',
    tag: 'tag-new-article',
  }
  return (
    <section className={styles.wrapper}>
      <div className={styles['form-wrapper']}>
        <form id="create-new-article" className={styles.form}>
          <div className={styles.title}>
            <h4>Edit article</h4>
          </div>
          <div className={styles['inputs-wrapper']}>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor={htmlFor.title}>Title</label>
              <input type="text" placeholder="Title" id={htmlFor.title} name={htmlFor.title} />
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor={htmlFor.shortDescription}>Short description</label>
              <input
                type="text"
                placeholder="Description"
                id={htmlFor.shortDescription}
                name={htmlFor.shortDescription}
              />
            </div>
            <div>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
          </div>
        </form>
      </div>
    </section>
  )
}
