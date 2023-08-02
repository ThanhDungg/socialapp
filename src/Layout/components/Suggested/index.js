import classNames from 'classnames/bind';
import styles from './Suggested.module.scss';
import HeaderStatus from '../../../components/HeaderStatus';
import Following from '../../../components/Following';

const cx = classNames.bind(styles);

function Suggested({ listUser }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('profile-user')}>
            <HeaderStatus fullname={listUser[0].USER.USERNAME} caption={listUser[0].CAPTION} children={<div></div>} />
         </div>
         <div className={cx('content-suggested')}>
            Suggested for you
            <span className={cx('see-all')}>see all</span>
         </div>
         <div className={cx('form-suggested')}>
            {listUser.map((status) => {
               return (
                  <HeaderStatus
                     fullname={listUser[0].USER.USERNAME}
                     caption={listUser[0].CAPTION}
                     children={<Following />}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Suggested;