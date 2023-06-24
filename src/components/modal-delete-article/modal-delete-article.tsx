import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { deleteArticle } from '../../store/articleSlice'
import { useAppDispatch } from '../../store/hooks'
import './modal-delete-article.scss'

type ModalDeleteArticleProps = {
  setShowModal: (state: boolean) => void
}
export function ModalDeleteArticle({ setShowModal }: ModalDeleteArticleProps) {
  const dispatch = useAppDispatch()
  const slug = useLocation().pathname.replace('/articles/', '').replace('/edit', '')
  return (
    <div className="modal">
      <div className="modal-arrow" />
      <div className="modal-wrapper">
        <div className="modal-svg">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
          </svg>
        </div>
        <div className="modal-interface">
          <span>Are you sure to delete this article?</span>
          <div className="modal-btns">
            <button type="button" onClick={() => setShowModal(false)}>
              No
            </button>
            <button type="button" onClick={() => dispatch(deleteArticle(slug))}>
              <Link to="/"> Yes </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
