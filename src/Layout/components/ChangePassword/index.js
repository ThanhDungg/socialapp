import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import InputLogin from '../../../components/InputLogin';
import { useState } from 'react';
import { putData } from '../../../config/fetchData';
import { putPassword } from '../../../config/configs';

const cx = classNames.bind(styles);

function ChangePassword({ handleCancelChangePassword, setLoading }) {
   const [errorMes, setError] = useState('');

   const handleChangePassword = async () => {
      if (document.querySelector('[name="old-password"]').value == '') {
         setError('Bạn chưa nhập mật khẩu cũ');
      } else if (document.querySelector('[name="new-password"]').value == '') {
         setError('Bạn chưa nhập mật khẩu mới');
      } else if (document.querySelector('[name="re-new-password"]').value == '') {
         setError('Bạn chưa nhập lại mật khẩu mới');
      } else if (
         document.querySelector('[name="re-new-password"]').value !=
         document.querySelector('[name="new-password"]').value
      ) {
         setError('Mật khẩu mới nhập lại không đúng.');
      } else {
         try {
            await setLoading(true);
            const res = await putData(
               putPassword,
               {
                  password: document.querySelector('[name="old-password"]').value,
                  n_password: document.querySelector('[name="new-password"]').value,
                  re_password: document.querySelector('[name="re-new-password"]').value,
               },
               localStorage.getItem('accessToken'),
            );
            console.log(res);
            if (res.data.status == 1) {
               window.location.reload();
            } else if (res.data.status == 0) {
               setError('Mật khẩu cũ không đúng');
            } else {
               setError(res.data.message);
            }
            await setLoading(false);
         } catch (e) {
            console.log(e);
         }
      }
   };

   const onChange = () => {
      setError('');
   };
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
                     <input name="old-password" type="password" className={cx('input')} onChange={onChange} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>New password</td>
                  <td>
                     <input name="new-password" type="password" className={cx('input')} onChange={onChange} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Confirm new password</td>
                  <td>
                     <input name="re-new-password" type="password" className={cx('input')} onChange={onChange} />
                  </td>
               </tr>
               <div className={cx('error')}>{errorMes}</div>
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
