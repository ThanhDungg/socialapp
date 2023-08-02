import ForgotPassword from '../../Layout/ForgotPassword';
import { useState } from 'react';
import OTPPassword from '../../Layout/components/OTPPassword';
import Loading from '../../Layout/components/Loading';
import { useNavigate } from 'react-router-dom';
import { postData, putData } from '../../config/fetchData';
import { forgotEmail, putOTPChangePassword } from '../../config/configs';

function ForgotPasswordPage() {
   const navigate = useNavigate();

   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   const [inputEmail, setInputEmail] = useState(true);
   const [inputOtp, setInputOtp] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const [errormsg, setErrormsg] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [rePassword, setRePassword] = useState('');
   const [otp, setOtp] = useState('');

   const onChangEmail = (e) => {
      setEmail(e.target.value);
      setErrormsg('');
   };

   const onChangPassword = (e) => {
      setPassword(e.target.value);
      setErrormsg('');
   };

   const onChangRePassword = (e) => {
      setRePassword(e.target.value);
      setErrormsg('');
   };

   const onChangOTP = (e) => {
      setOtp(e.target.value);
      setErrormsg('');
   };

   const submitEmail = async () => {
      if (email == '') {
         setErrormsg('Email không đươc để trống');
      } else if (!filter.test(email)) {
         setErrormsg('Bạn chưa nhập đúng định dạng Email');
      } else {
         setIsLoading(true);
         const res = await postData(forgotEmail, { email: email }, '');
         if (res.data.status == 1) {
            setInputOtp(true);
            setInputEmail(false);
            setIsLoading(false);
         } else {
            setErrormsg('Error');
            setIsLoading(false);
         }
      }
   };

   const submitOTP = async () => {
      if (password == '') {
         setErrormsg('Bạn chưa nhập mật khẩu');
      } else if (rePassword != password) {
         setErrormsg('Nhập lại mật khẩu sai');
      } else if (otp == '') {
         setErrormsg('Bạn chưa nhập OTP');
      } else if (otp.length < 6) {
         setErrormsg('Bạn cần nhập đúng định dạng OTP');
      } else {
         setIsLoading(true);
         const res = await putData(
            putOTPChangePassword,
            {
               email: email,
               password: password,
               re_password: rePassword,
               otp: otp,
            },
            '',
         );
         if (res.data.status == 1) {
            setIsLoading(false);
            navigate('/');
         } else {
            setIsLoading(false);
            setErrormsg(res.data.message);
         }

         console.log(res.data);
      }
   };

   return (
      <div>
         {inputEmail && (
            <ForgotPassword onClickSubmitLogin={submitEmail} onChangEmail={onChangEmail} errormsg={errormsg} />
         )}
         {inputOtp && (
            <OTPPassword
               onClickSubmitLogin={submitOTP}
               onChangPassword={onChangPassword}
               onChangRePassword={onChangRePassword}
               onChangeOTP={onChangOTP}
               errormsg={errormsg}
            />
         )}
         {isLoading && <Loading />}
      </div>
   );
}

export default ForgotPasswordPage;
