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

function EditProfile({ handleEditProfile, handleCancelEditProfile }) {
   const [Alt, setAlt] = useState();
   const [owner, setOwner] = useState({});

   const chooseFile = (inputFile) => {
      const file = inputFile.target.files[0];

      file.preview = URL.createObjectURL(file);

      setAlt(file);
      console.log();
   };

   const handleChangeInfo = async () => {
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
            } else {
               alert('Update fail');
            }
            console.log('Success:', result);
         })
         .catch((error) => {
            console.error('Error:', error);
         });
   };

   useEffect(() => {
      const fetchData = async () => {
         const res3 = await getData(
            getUser + `/${localStorage.getItem('idUser')}`,
            localStorage.getItem('accessToken'),
         );
         setOwner(res3.data.result);
         console.log(res3.data.result);
      };
      fetchData();
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
            <input type="file" hidden name="avatar" id="avatar" onChange={chooseFile} />
            <div className={cx('form-input')}>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>User name</td>
                  <td>
                     <input className={cx('input')} defaultValue={owner.USERNAME} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Full name</td>
                  <td>
                     <input className={cx('input')} defaultValue={owner.FULLNAME} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
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
               </tr>
               <input type="radio" name="gender" /> Nam
               <input type="radio" name="gender" /> Nữ
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
