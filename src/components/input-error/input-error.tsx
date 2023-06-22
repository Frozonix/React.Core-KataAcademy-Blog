import React from 'react'
import './input-error.scss'

type InputErrorType = {
  errors: Record<string, any>
  name: string
}
export function InputError({ errors, name }: InputErrorType) {
  return <div className="form-error">{errors[name] && <p>{errors[name]?.message?.toString()}</p>}</div>
}
