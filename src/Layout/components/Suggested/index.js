import classNames from 'classnames/bind';
import styles from './Suggested.module.scss';
import HeaderStatus from '../../../components/HeaderStatus';
import Following from '../../../components/Following';

const cx = classNames.bind(styles);

function Suggested({ listUser }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('profile-user')}>
            {listUser === undefined || listUser.length == 0 ? (
               ''
            ) : (
               <HeaderStatus
                  fullname={listUser[0].USER.USERNAME}
                  caption={listUser[0].CAPTION}
                  children={<div></div>}
               />
            )}
         </div>
         <div className={cx('content-suggested')}>
            {listUser === undefined || listUser.length == 0 ? (
               ''
            ) : (
               <div>
                  Suggested for you
                  <span className={cx('see-all')}>see all</span>
               </div>
            )}
         </div>
         <div className={cx('form-suggested')}>
            {listUser === undefined || listUser.length == 0
               ? ''
               : listUser.map((status) => {
                    return (
                       <HeaderStatus
                          avatar={status.USER.AVATAR}
                          fullname={status.USER.USERNAME}
                          caption={status.CAPTION}
                          children={<Following />}
                          id={status.USER.ID}
                       />
                    );
                 })}
         </div>
      </div>
   );
}

export default Suggested;
