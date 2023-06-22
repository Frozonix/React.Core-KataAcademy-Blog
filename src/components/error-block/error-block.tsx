import React from 'react'
import './error-block.scss'

type ErrorBlockProps = {
  error: string
}
export function ErrorBlock({ error }: ErrorBlockProps) {
  return (
    <div className="error-wrapper">
      <p>{error}</p>
    </div>
  )
}
