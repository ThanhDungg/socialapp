import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import InputLogin from '../../../components/InputLogin';

const cx = classNames.bind(styles);

function ChangePassword({ handleCancelChangePassword, handleChangePassword }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-changepassword')}>
            <div>
               <ImgToProfile src={img} />
            </div>
            <div className={cx('form-input')}>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Old password</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>New password</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Confirm new password</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <div className={cx('place-btn')}>
                  <button className={cx('btn-change')} onClick={handleChangePassword}>
                     Change
                  </button>
                  <button className={cx('btn-cancel')} onClick={handleCancelChangePassword}>
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ChangePassword;
