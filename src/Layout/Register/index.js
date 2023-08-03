import classNames from 'classnames/bind';
import styles from './Register.module.scss';

import InputLogin from '../../components/InputLogin';
import SubmitLogin from '../../components/SubmitLogin';

const cx = classNames.bind(styles);

function Register({
   onClickSubmitLogin,
   onChangUsername,
   onChangfullname,
   onChangEmail,
   onChangAdress,
   onChangPhone,
   errormsg,
   onChangPassword,
   onChangRePassword,
}) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper1')}>
            <div className={cx('login-title')}>Đăng kí</div>
            <label
               for="#submit"
               onKeyPress={(e) => {
                  e.key === 'Enter' && onClickSubmitLogin();
               }}
            >
               <div>
                  <InputLogin placehodder={'Tên tài khoản'} onchange={onChangUsername} />
               </div>
               <div>
                  <InputLogin placehodder={'Họ tên'} onchange={onChangfullname} />
               </div>
               <div>
                  <InputLogin placehodder={'Email'} onchange={onChangEmail} />
               </div>
               <div>
                  <InputLogin placehodder={'Địa chỉ'} onchange={onChangAdress} />
               </div>
               <div>
                  <InputLogin
                     placehodder={'Số điện thoại'}
                     onchange={onChangPhone}
                     onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                           event.preventDefault();
                        }
                     }}
                     length={11}
                  />
               </div>
               <div>
                  <InputLogin placehodder={'Nhập mật khẩu'} onchange={onChangPassword} type={'password'} />
               </div>
               <div>
                  <InputLogin placehodder={'Nhập lại mật khẩu'} onchange={onChangRePassword} type={'password'} />
               </div>
               <input type="radio" name="gender" id="nam" checked /> Nam
               <input className={cx('gender')} type="radio" name="gender" id="nu" /> Nữ
               <div className={cx('error')}>{errormsg}</div>
               <div id="submit">
                  <SubmitLogin onClickSubmit={onClickSubmitLogin} text="Tiếp tục" />
               </div>
            </label>
         </div>
      </div>
   );
}

export default Register;
