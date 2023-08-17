import { useState } from 'react';
import Register from '../../Layout/Register';
import { useNavigate } from 'react-router-dom';
import OTP from '../../Layout/components/OTP';
import { postData } from '../../config/fetchData';
import { regis, regisOTP } from '../../config/configs';

import Loading from '../../Layout/components/Loading';

function RegisterPage() {
   const navigate = useNavigate();

   var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

   const [register, setRegister] = useState(true);
   const [otppage, setOtppage] = useState(false);

   //Check and get Current account
   const [isLoading, setIsLoading] = useState(false);
   const [errormsg, setErrormsg] = useState('');
   const [username, setUsername] = useState('');
   const [fullname, setFullname] = useState('');
   const [email, setEmail] = useState('');
   const [adress, setAdress] = useState('');
   const [phone, setPhone] = useState('');
   const [otp, setOtp] = useState('');
   const [password, setPassword] = useState('');
   const [rePassword, setRePassword] = useState('');
   const [gender, setGender] = useState('Nam');

   //Lấy tài khoản
   const onChangUsername = (e) => {
      setUsername(e.target.value);
      setErrormsg('');
   };

   //Lấy Full name
   const onChangfullname = (e) => {
      setFullname(e.target.value);
      setErrormsg('');
   };

   //Lấy Email
   const onChangEmail = (e) => {
      setEmail(e.target.value);
      setErrormsg('');
   };

   //Lấy adress
   const onChangAdress = (e) => {
      setAdress(e.target.value);
      setErrormsg('');
   };

   //Lấy sdt
   const onChangPhone = (e) => {
      setPhone(e.target.value);
      setErrormsg('');
   };

   //Lấy password
   const onChangePassword = (e) => {
      setPassword(e.target.value);
      setErrormsg('');
   };

   //Lấy repassword
   const onChangeRePassword = (e) => {
      setRePassword(e.target.value);
      setErrormsg('');
   };

   //Lấy repassword
   const onChangeOTP = (e) => {
      setOtp(e.target.value);
      setErrormsg('');
   };

   //submit Register Name
   const onClickSubmitLogin = async () => {
      if (username == '') {
         setErrormsg('Tài khoản không được để trống.');
      } else if (fullname == '') {
         setErrormsg('Họ tên không được để trống');
      } else if (email == '') {
         setErrormsg('Email không được để trống');
      } else if (!filter.test(email)) {
         setErrormsg('Bạn chưa nhập đúng định dạng Email');
      } else if (phone.length != 10) {
         setErrormsg('Số điện thoại phải có 10 số.');
      } else if (password == '') {
         setErrormsg('Mật khẩu không được để trống');
      } else if (rePassword == '' || rePassword != password) {
         setErrormsg('Nhập lại mật khẩu không đúng');
      } else {
         setIsLoading(true);
         if (document.getElementById('nam').checked) {
            setGender('Male');
         } else {
            setGender('Female');
         }
         var res = await postData(
            regisOTP,
            {
               email: email,
            },
            '',
         );
         if (res.data.status == 0) {
            setIsLoading(false);
            setErrormsg(res.data.message);
         } else {
            setIsLoading(false);
            setRegister(false);
            setOtppage(true);
         }
      }
   };

   //submit Register OTP
   const onClickSubmitOTP = async () => {
      if (otp == '') {
         setErrormsg('Bạn chưa nhập OTP');
      } else if (otp.length < 6) {
         setErrormsg('Bạn chưa nhập đúng định dạng OTP');
      } else {
         setIsLoading(true);
         const res = await postData(
            regis,
            {
               username: username,
               fullname: fullname,
               email: email,
               password: password,
               re_password: rePassword,
               gender: gender,
               address: adress,
               mobile: phone,
               otp: otp,
            },
            '',
         );
         console.log(res);
         if (res.data.status == 1) {
            setIsLoading(false);
            navigate('/');
         } else {
            setIsLoading(false);
            setErrormsg(res.data.message);
         }
      }
   };

   return (
      <div>
         {register && (
            <Register
               onClickSubmitLogin={onClickSubmitLogin}
               onChangPhone={onChangPhone}
               onChangAdress={onChangAdress}
               onChangEmail={onChangEmail}
               onChangfullname={onChangfullname}
               onChangUsername={onChangUsername}
               errormsg={errormsg}
               onChangPassword={onChangePassword}
               onChangRePassword={onChangeRePassword}
            />
         )}
         {otppage && <OTP onClickSubmitLogin={onClickSubmitOTP} onchangeOtp={onChangeOTP} errormsg={errormsg} />}
         {isLoading && <Loading />}
      </div>
   );
}

export default RegisterPage;
