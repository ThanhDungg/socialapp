import classNames from 'classnames/bind';
import styles from './OTP.module.scss';

import InputLogin from '../../../components/InputLogin';
import SubmitLogin from '../../../components/SubmitLogin';

const cx = classNames.bind(styles);

function OTP({ onchangeOtp, errormsg, onClickSubmitLogin }) {
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
                     <InputLogin
                        placehodder={'Nhập OTP'}
                        onchange={onchangeOtp}
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
                     <SubmitLogin onClickSubmit={onClickSubmitLogin} text="Xác nhận" />
                  </div>
               </label>
            </div>
            {/* {isLoading && <Loading />} */}
         </div>
      </div>
   );
}

export default OTP;
