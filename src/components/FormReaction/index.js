import classNames from 'classnames/bind';
import styles from './FormReaction.module.scss';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { reaction_heart, reaction_cmt, reaction_share, likePost } from '../../config/configs';
import { deleteData, postData } from '../../config/fetchData';

const cx = classNames.bind(styles);

function FormReaction({ socket, post, setShowStatusPost, setStatusPost }) {
   const [reaction, setReaction] = useState(parseInt(post.ISLIKED));
   console.log(post);

   const changeReactionLike = async () => {
      const res = await postData(likePost + `${post.ID}`, '', localStorage.getItem('accessToken'));
      console.log(res);
      if (res.data.status == 1) {
         await setReaction(true);
         await socket.emit('likePost', post);
         document.getElementById(`${post.ID}`).textContent =
            parseInt(document.getElementById(`${post.ID}`).textContent) + 1;
      } else {
         alert('Like không thành công');
      }
   };

   const changeReactionUnLike = async () => {
      const res = await deleteData(likePost + `${post.ID}`, localStorage.getItem('accessToken'));
      console.log(res);
      if (res.data.status == 1) {
         await setReaction(false);
         await socket.emit('unLikePost', post);
         document.getElementById(`${post.ID}`).textContent =
            parseInt(document.getElementById(`${post.ID}`).textContent) - 1;
      } else {
         alert('UnLike không thành công');
      }
   };

   return (
      <div className={cx('form-reaction-cmt-share')}>
         <div className={cx('reaction-cmt-share')}>
            <span className={cx('span-tag-svg')}>
               {reaction == 1 ? (
                  <FontAwesomeIcon
                     className={cx('icon-reaction-heart')}
                     icon={faHeart}
                     onClick={changeReactionUnLike}
                  />
               ) : (
                  <svg className={cx('reaction-heart')} onClick={changeReactionLike}>
                     <title>Like</title>
                     <path d={reaction_heart}></path>
                  </svg>
               )}
            </span>
            <span
               className={cx('span-tag-svg')}
               onClick={() => {
                  setShowStatusPost(true);
                  setStatusPost(post);
               }}
            >
               <svg className={cx('reaction-cmt')}>
                  <title>Comment</title>
                  <path className={cx('path-comment')} d={reaction_cmt}></path>
               </svg>
            </span>
            <span className={cx('span-tag-svg')}>
               <svg className={cx('svg-share')}>
                  <polygon className={cx('polygon-share')} points={reaction_share}></polygon>
               </svg>
            </span>
         </div>
         <div className={cx('save')}></div>
      </div>
   );
}

export default FormReaction;
