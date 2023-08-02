import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';

import InputLogin from '../../components/InputLogin';
import SubmitLogin from '../../components/SubmitLogin';

const cx = classNames.bind(styles);

function ForgotPassword({ onClickSubmitLogin, onChangEmail, errormsg }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper1')}>
            <div className={cx('login-title')}>Quên mật khẩu</div>
            <label
               for="#submit"
               onKeyPress={(e) => {
                  e.key === 'Enter' && onClickSubmitLogin();
               }}
            >
               <div>
                  <InputLogin placehodder={'Email'} onchange={onChangEmail} />
               </div>
               <div className={cx('error')}>{errormsg}</div>
               <div id="submit">
                  <SubmitLogin onClickSubmit={onClickSubmitLogin} text="Nhận OTP" />
               </div>
            </label>
         </div>
      </div>
   );
}

export default ForgotPassword;
