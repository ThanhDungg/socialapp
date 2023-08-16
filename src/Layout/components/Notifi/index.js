import classNames from 'classnames/bind';
import styles from './SearchHome.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { useEffect, useState } from 'react';
import { getData } from '../../../config/fetchData';
import { getNoti } from '../../../config/configs';
import Close from '../../../components/Close';

const cx = classNames.bind(styles);

function Notifi({ handleHiddenShow }) {
   const [listUser, setListUser] = useState([]);

   useEffect(() => {
      try {
         const fetchData = async () => {
            const res = await getData(getNoti, localStorage.getItem('accessToken'));
            console.log(res);
            setListUser(res.data.result);
         };
         fetchData();
      } catch (e) {
         console.log(e);
      }
   }, []);
   return (
      <div className={cx('wrapper')}>
         <Close onClick={handleHiddenShow} />
         <div className={cx('header')}>Noti</div>
         <div className={cx('body')}>
            <div className={cx('header-body')}>Recent</div>
            <div>
               {listUser.map((user) => {
                  if (user.TYPE == 'follow') {
                     return (
                        <div className={cx('user')}>
                           <ImgToProfile src={user.USER.AVATAR} toLink={`/profile/${user.ID}`} />
                           <div>
                              <div className={cx('username')}>
                                 <b>{user.USER.USERNAME}</b>
                              </div>
                              đã follow bạn
                           </div>
                        </div>
                     );
                  }
                  return (
                     <div className={cx('user')}>
                        <ImgToProfile src={user.AVATAR} toLink={`/profile/${user.ID}`} />
                        <div>
                           <div className={cx('username')}>
                              <b>{user.USERNAME}</b>
                           </div>
                           <div>
                              <i>{user.FULLNAME}</i>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Notifi;
