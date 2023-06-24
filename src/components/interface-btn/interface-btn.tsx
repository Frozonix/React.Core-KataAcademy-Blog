/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react'

import { ModalDeleteArticle } from '../modal-delete-article/modal-delete-article'

import styles from './interface-btn.module.scss'

type interfaceBtn = {
  text: string
  padding: number
  height: string
  // @ts-ignore
  append?: any
  // @ts-ignore
  remove?: any
  index?: number
}

const defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  append: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
  index: '',
}

export function InterfaceBtn({ text, padding, height, append, remove, index }: interfaceBtn) {
  const [showModal, setShowModal] = useState<boolean>(false)
  let colorClassName = ''
  if (text === 'Delete') {
    colorClassName = styles['btn-red']
  } else if (text === 'Add tag') {
    colorClassName = styles['btn-blue']
  }

  return (
    <span>
      <button
        onClick={() => {
          if (text === 'Delete' && (index || index === 0)) {
            remove(index)
          }
          if (text === 'Delete' && !index) {
            setShowModal(true)
          }
          if (text === 'Add tag') {
            append({
              tag: '',
            })
          }
        }}
        type="button"
        className={`${styles.btn} ${colorClassName}`}
        style={{ padding: `0 ${padding}px`, height: `${height}` }}
      >
        {text}
      </button>
      {showModal && <ModalDeleteArticle setShowModal={setShowModal} />}
    </span>
  )
}

InterfaceBtn.defaultProps = defaultProps
