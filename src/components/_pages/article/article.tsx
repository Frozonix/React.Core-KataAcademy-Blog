import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

import { ErrorBlock } from '../../error-block/error-block'
import { Loading } from '../../loading/loading'
import { ProfileImage } from '../../profile-image/profile-image'
import { InterfaceBtn } from '../../interface-btn/interface-btn'
import { ArticleItem } from '../../article-item/article-item'
import { useAppSelector, useAppDispatch } from '../../../store/hooks'
import { getArticle } from '../../../store/articleSlice'
import styles from '../../article-item/article-item.module.scss'

import '../../../reusable-styles/list-article-shadow.scss'

import stylesArticle from './article.module.scss'

export function Article() {
  const auth = true
  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.user)
  const { data, status, error } = useAppSelector((state) => state.article)
  const { slug } = useParams()
  //   let isLike = false
  const [like, setLike] = useState<boolean>(false)
  useEffect(() => {
    async function get() {
      await dispatch(getArticle(slug))
    }
    get()
  }, [dispatch, slug, like])

  const renderBtns = () => {
    if (auth) {
      return (
        <div className={styles['interface-btns']}>
          <InterfaceBtn text="Delete" padding={17} height="31px" />
          <Link to={`/articles/${slug}/edit`}>
            <InterfaceBtn text="Edit" padding={19} height="31px" />
          </Link>
        </div>
      )
    }
    return null
  }

  const renderArticle = () => {
    if (status === 'ok' && data) {
      // eslint-disable-next-line
      let author, body, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt
      ;({ author, body, createdAt, description, favorited, favoritesCount, slug, tagList, title, updatedAt } = data)
      // isLike = favorited
      // setLike(favorited)
      console.log(data)
      return (
        <div className={`${stylesArticle.wrapper} list-article-shadow`}>
          <ArticleItem dataItem={data} list={false} />
          <div className={stylesArticle.article}>
            <div>
              <ReactMarkdown>{body}</ReactMarkdown>
            </div>
          </div>
        </div>
      )
    }
    if (status === 'loading') {
      return <Loading />
    }
    if (status === 'rejected') {
      return <ErrorBlock error={error} />
    }
    return null
  }

  return <>{renderArticle()}</>
  //  <div className={`${stylesArticle.wrapper} list-article-shadow`}>
  //    <div className={`${styles['list-item']} ${stylesArticle['list-item']}`}>
  //      <div className={styles.wrapper}>
  //        <div className={styles['left-side']}>
  //          <div className={styles['item-title-block']}>
  //            <h5>Some article title</h5>
  //            <p>
  //              <span>&#10084;</span> 12
  //            </p>
  //          </div>
  //          <div className={styles.tags}>
  //            <span>Tag 1</span>
  //          </div>
  //          <div className={`${styles['item-preview']} ${stylesArticle['item-preview']}`}>
  //            <p>
  //              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
  //              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
  //              ex ea commodo consequat.
  //            </p>
  //          </div>
  //        </div>
  //        <div className={styles['right-side']}>
  //          {/* <ProfileImage header={false} /> */}
  //          {renderBtns()}
  //        </div>

  //        <div />
  //      </div>
  //    </div>
  //    <div className={stylesArticle.article}>
  //      <p>
  //        Est Ampyciden pater patent Amor saxa inpiger Lorem markdownum Stygias neque is referam fudi, breve per. Et
  //        Achaica tamen: nescia ista occupat, illum se ad potest humum et. Qua deos has fontibus Recens nec ferro
  //        responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo
  //        omnes ne pendentia citus pedum. Quamvis pronuba Ulli labore facta. Io cervis non nosterque nullae, vides:
  //        aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit
  //        hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt
  //        Venus draconem, hic, Methymnaeae. 1. Clamoribus haesit tenentem iube Haec munera 2. Vincla venae 3. Paris
  //        includere etiam tamen 4. Superi te putria imagine Deianira 5. Tremore hoste Esse sed perstat capillis siqua
  //      </p>
  //    </div>
  //  </div>
}
