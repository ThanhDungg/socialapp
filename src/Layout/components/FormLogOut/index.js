import classNames from 'classnames/bind';
import styles from './FormLogOut.module.scss';

const cx = classNames.bind(styles);

function FormLogOut({ handleLogOut, handleCancel, handleShowChangePassword, handleShowEditProfile }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form')}>
            <div className={cx('btn')} onClick={handleShowEditProfile}>
               Edit profile
            </div>
            <div className={cx('btn')} onClick={handleShowChangePassword}>
               ChangePassword
            </div>
            <div className={cx('btn')} onClick={handleLogOut}>
               Logout
            </div>
            <div className={cx('btn')} onClick={handleCancel}>
               Cancel
            </div>
         </div>
      </div>
   );
}

export default FormLogOut;
