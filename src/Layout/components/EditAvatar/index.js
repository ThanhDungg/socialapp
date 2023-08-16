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

function EditAvatar({ handleEditProfile, handleCancelEditAvatar, setLoading }) {
   const [Alt, setAlt] = useState();
   const [owner, setOwner] = useState({});

   const chooseFile = (inputFile) => {
      const file = inputFile.target.files[0];

      file.preview = URL.createObjectURL(file);

      setAlt(file);
      console.log();
   };

   const handleChangeInfo = async () => {
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
               <div className={cx('place-btn')}>
                  <button className={cx('btn-change')} onClick={handleChangeInfo}>
                     Edit
                  </button>
                  <button className={cx('btn-cancel')} onClick={handleCancelEditAvatar}>
                     Cancel
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default EditAvatar;
