import React from 'react'

import styles from './submit-btn.module.scss'

type submitBtn = {
  text: string
  form: string
}

export function SubmitBtn({ text, form }: submitBtn) {
  return (
    <button type="submit" className={styles.submit} form={form}>
      {text}
    </button>
  )
}
