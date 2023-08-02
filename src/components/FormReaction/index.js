import classNames from 'classnames/bind';
import styles from './FormReaction.module.scss';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { reaction_heart, reaction_cmt, reaction_share } from '../../config/configs';

const cx = classNames.bind(styles);

function FormReaction() {
   const [reaction, setReaction] = useState(false);

   const changeReaction = () => {
      setReaction(!reaction);
   };
   return (
      <div className={cx('form-reaction-cmt-share')}>
         <div className={cx('reaction-cmt-share')}>
            <span className={cx('span-tag-svg')}>
               {reaction ? (
                  <FontAwesomeIcon className={cx('icon-reaction-heart')} icon={faHeart} onClick={changeReaction} />
               ) : (
                  <svg className={cx('reaction-heart')} onClick={changeReaction}>
                     <title>Like</title>
                     <path d={reaction_heart}></path>
                  </svg>
               )}
            </span>
            <span className={cx('span-tag-svg')}>
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
