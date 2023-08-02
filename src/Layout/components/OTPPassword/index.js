import classNames from 'classnames/bind';
import styles from './OTPPassword.module.scss';

import InputLogin from '../../../components/InputLogin';
import SubmitLogin from '../../../components/SubmitLogin';

const cx = classNames.bind(styles);

function OTPPassword({ onClickSubmitLogin, errormsg, onChangPassword, onChangRePassword, onChangeOTP }) {
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
                  <InputLogin placehodder={'Mật khẩu'} type={'password'} onchange={onChangPassword} />
               </div>
               <div>
                  <InputLogin placehodder={'Nhập lại mật khẩu'} type={'password'} onchange={onChangRePassword} />
               </div>
               <div>
                  <InputLogin
                     placehodder={'OTP'}
                     onchange={onChangeOTP}
                     onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                        }
                     }}
                     length={6}
                  />
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

export default OTPPassword;
