import React, { useState } from 'react'

import { ModalDeleteArticle } from '../modal-delete-article/modal-delete-article'

import styles from './interface-btn.module.scss'

type interfaceBtn = {
  text: string
  padding: number
  height: string
  click?: () => any | undefined
}

const defaultProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  click: () => {},
}

export function InterfaceBtn({ text, padding, height, click }: interfaceBtn) {
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
        onClick={() => text === 'Delete' && setShowModal(true)}
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
