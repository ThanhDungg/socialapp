import classNames from 'classnames/bind';
import styles from './BodyHome.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import FormReaction from '../../../components/FormReaction';
import TotalLike from '../../../components/TotalLike';
import Caption from '../../../components/Caption';
import ViewAllCmt from '../../../components/ViewAllCmt';
import InputCmt from '../../../components/InputCmt';
import HeaderStatus from '../../../components/HeaderStatus';
import BodyStatus from '../../../components/BodyStatus';

import { useEffect, useState } from 'react';
import { getComment, home_Url } from '../../../config/configs';
import { getData } from '../../../config/fetchData';

const cx = classNames.bind(styles);

function BodyHome({ handleShowCreatePost, socket, listStatus, setStatusPost, setShowStatusPost, listComment }) {
   useEffect(() => {
      socket.on('likeToClient', async (newPost) => {
         document.getElementById(`${newPost.ID}`).textContent =
            parseInt(document.getElementById(`${newPost.ID}`).textContent) + 1;
      });
   }, [socket]);

   useEffect(() => {
      socket.on('unLikeToClient', async (newPost) => {
         console.log(newPost);
         document.getElementById(`${newPost.ID}`).textContent =
            parseInt(document.getElementById(`${newPost.ID}`).textContent) - 1;
      });
   }, [socket]);
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-post-status')}>
            <ImgToProfile src={img} />
            <button className={cx('btn')} onClick={handleShowCreatePost}>
               Bạn ơi, bạn nghĩ gì thế?
            </button>
         </div>
         <div className={cx('form-all-status')}>
            <div className={cx('all-status')}>
               {listStatus === undefined || listStatus.length == 0
                  ? ''
                  : listStatus.map((status) => {
                       return (
                          <div className={cx('status')}>
                             <HeaderStatus
                                avatar={status.USER.AVATAR}
                                fullname={status.USER.USERNAME}
                                caption={'1d'}
                                children={<FontAwesomeIcon icon={faEllipsis} />}
                             />
                             <BodyStatus status={status} />
                             <div className={cx('cmt-status')}>
                                <div>
                                   <FormReaction
                                      socket={socket}
                                      post={status}
                                      setShowStatusPost={() => {
                                         setShowStatusPost(true);
                                      }}
                                      setStatusPost={setStatusPost}
                                   />
                                </div>
                                <TotalLike Like={status.LIKES} id={status.ID} />
                                <Caption name={status.USER.USERNAME} caption={status.CAPTION} />
                                <ViewAllCmt
                                   totalCmt={200}
                                   onClick={async () => {
                                      setShowStatusPost(true);
                                      setStatusPost(status);
                                      const res = await getData(
                                         getComment + `${status.ID}`,
                                         localStorage.getItem('accessToken'),
                                      );
                                      console.log(res);
                                   }}
                                />
                                <InputCmt />
                             </div>
                          </div>
                       );
                    })}
            </div>
         </div>
      </div>
   );
}

export default BodyHome;
