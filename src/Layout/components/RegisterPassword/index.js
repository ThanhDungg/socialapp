import classNames from 'classnames/bind';
import styles from './RegisterPassword.module.scss';

import InputLogin from '../../../components/InputLogin';
import SubmitLogin from '../../../components/SubmitLogin';

const cx = classNames.bind(styles);

function RegisterPassword({ onClickSubmitLogin, onchangePassword, onchangeRePassword, errormsg }) {
   return (
      <div>
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
                     <InputLogin placehodder={'Nhập mật khẩu'} onchange={onchangePassword} />
                  </div>
                  <div>
                     <InputLogin placehodder={'Nhập lại mật khẩu'} onchange={onchangeRePassword} />
                  </div>
                  <div className={cx('error')}>{errormsg}</div>
                  <div id="submit">
                     <SubmitLogin onClickSubmit={onClickSubmitLogin} text="Xác nhận" />
                  </div>
               </label>
            </div>
            {/* {isLoading && <Loading />} */}
         </div>
      </div>
   );
}

export default RegisterPassword;
