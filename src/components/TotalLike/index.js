import classNames from 'classnames/bind';
import styles from './TotalLike.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function TotalLike({ Like, id }) {
   return (
      <div>
         <span id={`${id}`} className={cx('total-like')}>
            {Like.toLocaleString()}
         </span>
         <span>{'  '}Like</span>
      </div>
   );
}

export default TotalLike;
