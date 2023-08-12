import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import InputLogin from '../../components/InputLogin';
import SubmitLogin from '../../components/SubmitLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import Loading from '../components/Loading';
import { postData } from '../../config/fetchData';
import { login_Url } from '../../config/configs';

import { SocketContext } from '../../App';

const cx = classNames.bind(styles);

function Login() {
   const navigate = useNavigate();

   const socket = useContext(SocketContext);
   //Check and get Current account
   const [isLoading, setIsLoading] = useState(false);
   const [errormsg, setErrormsg] = useState('');
   const [currentTK, setCurrentTK] = useState('');
   const onChangTk = (e) => {
      setCurrentTK(e.target.value);
      setErrormsg('');
   };

   const [currentMK, setCurrentMK] = useState('');
   const onChangMK = (e) => {
      setCurrentMK(e.target.value);
      setErrormsg('');
   };

   const onClickSubmitLogin = async () => {
      setIsLoading(true);
      const res = await postData(
         login_Url,
         {
            email: currentTK,
            password: currentMK,
         },
         '',
      );
      if (res.data.status == 1) {
         setIsLoading(false);
         await localStorage.setItem('accessToken', res.data.accessToken);
         await localStorage.setItem('idUser', res.data.userDetail.ID);
         await socket.emit('joinUser', localStorage.getItem('accessToken'));
         await navigate(`/home`);
      } else {
         setIsLoading(false);
         setErrormsg(res.data.message);
      }
   };

   return (
      <div className={cx('wrapper')}>
         <div className={cx('wrapper1')}>
            <div className={cx('login-title')}>Social App</div>
            <label
               for="#submit"
               onKeyPress={(e) => {
                  e.key === 'Enter' && onClickSubmitLogin();
               }}
            >
               <div>
                  <InputLogin placehodder={'Phone number, username, or email'} onchange={onChangTk} />
               </div>
               <div>
                  <InputLogin placehodder={'Password'} type={'password'} onchange={onChangMK} />
               </div>
               <div className={cx('error')}>{errormsg}</div>
               <div id="submit">
                  <SubmitLogin onClickSubmit={onClickSubmitLogin} />
               </div>
            </label>
            <div>
               <Link className={cx('forgotpassword')} to={'/forgotpassword'}>
                  Forgot password?
               </Link>
            </div>
         </div>
         <div className={cx('wrapper2')}>
            Don't have an account?{' '}
            <Link className={cx('signup')} to={'/register'}>
               Sign up
            </Link>
         </div>
         {isLoading && <Loading />}
      </div>
   );
}

export default Login;
