import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Sidebar from '../components/Sidebar';
import AvatarProfile from '../../components/AvatarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faTableCells } from '@fortawesome/free-solid-svg-icons';
import { img } from '../../config';

const cx = classNames.bind(styles);

function OrtherProfile({ setShowLogout }) {
   return (
      <div className={cx('wrapper')}>
         <Sidebar />
         <div className={cx('place-profile')}>
            <div className={cx('header-profile')}>
               <AvatarProfile />
            </div>
            <div className={cx('container-profile')}>
               <div className={cx('first-header')}>
                  <div className={cx('user-name')}>Zdugg0810</div>
                  <div className={cx('settings')}>
                     <FontAwesomeIcon
                        icon={faGear}
                        onClick={() => {
                           setShowLogout(true);
                        }}
                     />
                  </div>
               </div>
               <div className={cx('second-header')}>
                  <div className={cx('body-second-header')}>0 Post</div>
                  <div className={cx('body-second-header')}>48 Followers</div>
                  <div className={cx('body-second-header')}>39 Following</div>
               </div>
               <div className={cx('third-header')}>
                  <div>Nguyễn Thanh Dũng</div>
               </div>
            </div>
         </div>
         <div className={cx('post')}>
            <div className={cx('title-post')}>
               <FontAwesomeIcon icon={faTableCells} />
               <span className={cx('title')}>POST</span>
            </div>
            <div className={cx('body-post')}>
               <img className={cx('img')} src={img} />
               <img className={cx('img')} src={img} />
               <img className={cx('img')} src={img} />
               <img className={cx('img')} src={img} />
               <img className={cx('img')} src={img} />
            </div>
         </div>
      </div>
   );
}

export default OrtherProfile;
