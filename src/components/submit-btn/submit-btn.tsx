import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'

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
