import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import AvatarProfile from '../../../components/AvatarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getData, putData } from '../../../config/fetchData';
import { getUser, putAvatar } from '../../../config/configs';

const cx = classNames.bind(styles);

function EditProfile({ handleEditProfile, handleCancelEditProfile, setLoading }) {
   const [Alt, setAlt] = useState();
   const [owner, setOwner] = useState({});
   const [errorMes, setErrorMes] = useState('');

   const chooseFile = (inputFile) => {
      const file = inputFile.target.files[0];

      file.preview = URL.createObjectURL(file);

      setAlt(file);
      console.log();
   };

   const handleChangeInfo = async () => {
      if (document.querySelector('[name = "edit-username"]').value == '') {
         setErrorMes('UserName không được để trống.');
         return;
      } else if (document.querySelector('[name = "edit-fullname"]').value == '') {
         setErrorMes('FullName không được để trống.');
         return;
      } else {
         try {
            setLoading(true);
            const formData = new FormData();
            formData.append('file', Alt);

            fetch('https://ptit-social-app.onrender.com/api/user/avatar', {
               method: 'PUT',
               body: formData,
               credentials: 'same-origin', // include, *same-origin, omit,
               mode: 'cors',
               headers: {
                  accessToken: localStorage.getItem('accessToken'),
               },
            })
               .then((response) => response.json())
               .then((result) => {
                  if (result.status == 1) {
                     window.location.reload();
                     setLoading(false);
                     console.log('Success:', result);
                  } else {
                     alert('Update fail');
                  }
               })
               .catch((error) => {
                  console.error('Error:', error);
               });
         } catch (e) {
            console.log(e);
         }
      }
   };

   const onChangeInfo = () => {
      setErrorMes('');
   };

   useEffect(() => {
      try {
         const fetchData = async () => {
            const res3 = await getData(
               getUser + `/${localStorage.getItem('idUser')}`,
               localStorage.getItem('accessToken'),
            );
            setOwner(res3.data.result);
            console.log(res3.data.result);
         };
         fetchData();
      } catch (e) {
         console.log(e);
      }
   }, []);

   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-changepassword')}>
            <div>
               {!Alt ? <AvatarProfile img={owner.AVATAR} /> : <AvatarProfile img={Alt.preview} />}
               <label for="avatar" className={cx('avatar-profile')}>
                  <div>
                     <FontAwesomeIcon icon={faCamera} />
                  </div>
               </label>
            </div>
            <input type="file" hidden accept="image/*" name="avatar" id="avatar" onChange={chooseFile} />
            <div className={cx('form-input')}>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>User name</td>
                  <td>
                     <input
                        name="edit-username"
                        className={cx('input')}
                        defaultValue={owner.USERNAME}
                        onChange={onChangeInfo}
                     />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Full name</td>
                  <td>
                     <input
                        name="edit-fullname"
                        className={cx('input')}
                        defaultValue={owner.FULLNAME}
                        onChange={onChangeInfo}
                     />
                  </td>
               </tr>
               {/* <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Address</td>
                  <td>
                     <input className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Mobile</td>
                  <td>
                     <input className={cx('input')} />
                  </td>
               </tr> */}
               {/* <input type="radio" name="gender" /> Nam
               <input type="radio" name="gender" /> Nữ */}
               <div className={cx('errorMes')}>{errorMes}</div>
               <div className={cx('place-btn')}>
                  <button className={cx('btn-change')} onClick={handleChangeInfo}>
                     Edit
                  </button>
                  <button className={cx('btn-cancel')} onClick={handleCancelEditProfile}>
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditProfile;
