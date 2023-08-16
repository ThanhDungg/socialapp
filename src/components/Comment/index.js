import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
import ImgToProfile from '../ImgToProfile';
import { useState } from 'react';
import { postData } from '../../config/fetchData';
import { postComment } from '../../config/configs';

const cx = classNames.bind(styles);

function Comment({ content, avatar, username, time, id, idpost, idUser }) {
   const handleCmt = async () => {
      try {
         if (document.getElementById(`${id}`).value == '') {
            alert('Bạn chưa nhập comment.');
            return;
         }
         const res = await postData(
            postComment + `${idpost}/${id}`,
            {
               content: document.getElementById(`${id}`).value,
            },
            localStorage.getItem('accessToken'),
         );
         if (res.data.status == 1) {
            document.getElementById(`${id}`).value = '';
            console.log(res);
         } else {
            alert('Comment fail');
         }
      } catch (e) {
         console.log(e);
      }
   };
   return (
      <div className={cx('wrapper')}>
         <div className={cx('header-cmt')}>
            <ImgToProfile src={avatar} toLink={`/profile/${idUser}`} />
            <div className={cx('username')}>{username}</div>
            <div>{content}</div>
         </div>
         <div className={cx('time')}>{time}</div>
         <input
            id={`${id}`}
            name="input"
            className={cx('input-cmt')}
            placeholder="Comment..."
            onKeyPress={(e) => e.key === 'Enter' && handleCmt()}
         />
      </div>
   );
}

export default Comment;
