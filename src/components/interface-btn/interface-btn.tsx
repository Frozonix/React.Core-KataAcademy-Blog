import React, { useState } from 'react'
import { useFieldArray } from 'react-hook-form'

import { ModalDeleteArticle } from '../modal-delete-article/modal-delete-article'

import styles from './interface-btn.module.scss'

useFieldArray

type interfaceBtn = {
  text: string
  padding: number
  height: string
  click?: () => any | undefined
  append?: any
  remove?: any
  index?: number
}

const defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  click: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  append: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  remove: () => {},
  index: '',
}

export function InterfaceBtn({ text, padding, height, click, append, remove, index }: interfaceBtn) {
  //   console.log(remove, index)
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
            // console.log(text, padding, height, click, append, remove, index)
            remove(index)
          }
          if (text === 'Delete' && !index) {
            // console.log(text, padding, height, click, append, remove, index)
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
