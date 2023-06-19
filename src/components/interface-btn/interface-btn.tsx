import React from 'react'

import styles from './interface-btn.module.scss'

type interfaceBtn = {
  text: string
  padding: number
  height: string
}

export function InterfaceBtn({ text, padding, height }: interfaceBtn) {
  let colorClassName = ''
  if (text === 'Delete') {
    colorClassName = styles['btn-red']
  } else if (text === 'Add tag') {
    colorClassName = styles['btn-blue']
  }

  return (
    <span>
      <button
        type="button"
        className={`${styles.btn} ${colorClassName}`}
        style={{ padding: `0 ${padding}px`, height: `${height}` }}
      >
        {text}
      </button>
    </span>
  )
}
