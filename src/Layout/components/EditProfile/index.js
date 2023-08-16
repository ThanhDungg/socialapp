import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';
import AvatarProfile from '../../../components/AvatarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getData, postData, putData } from '../../../config/fetchData';
import { getUser, putAvatar, putInfo } from '../../../config/configs';

const cx = classNames.bind(styles);

function EditProfile({ handleEditProfile, handleCancelEditProfile, setLoading }) {
   const [owner, setOwner] = useState({});
   const [errorMes, setErrorMes] = useState('');
   const [gender, setGender] = useState('Male');

   const handleChangeInfo = async () => {
      if (document.querySelector('[name = "edit-username"]').value == '') {
         setErrorMes('UserName không được để trống.');
         return;
      } else if (document.querySelector('[name = "edit-fullname"]').value == '') {
         setErrorMes('FullName không được để trống.');
         return;
      } else if (document.querySelector('[name = "edit-mobile"]').value == '') {
         setErrorMes('Number phone không được để trống');
      } else if (document.querySelector('[name = "edit-mobile"]').value.length < 10) {
         setErrorMes('Mobile must 10 number');
      } else {
         try {
            setLoading(true);
            if (document.getElementById('men').checked) {
               await setGender('Male');
            } else {
               await setGender('Female');
            }
            const res = await putData(
               putInfo,
               {
                  username: document.querySelector('[name = "edit-username"]').value,
                  fullname: document.querySelector('[name = "edit-fullname"]').value,
                  mobile: document.querySelector('[name = "edit-mobile"]').value.trim(),
                  description: document.querySelector('[name = "edit-description"]').value,
                  address: document.querySelector('[name = "edit-address"]').value,
                  gender: gender,
               },
               localStorage.getItem('accessToken'),
            );
            console.log(res);
            if (res.data.status == 1) {
               window.location.reload();
            }
            setLoading(false);
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
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Address</td>
                  <td>
                     <input
                        name="edit-address"
                        className={cx('input')}
                        defaultValue={owner.ADDRESS}
                        onChange={onChangeInfo}
                     />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Mobile</td>
                  <td>
                     <input
                        name="edit-mobile"
                        className={cx('input')}
                        defaultValue={owner.MOBILE}
                        onChange={onChangeInfo}
                        onKeyPress={(event) => {
                           if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                           }
                        }}
                        maxLength={10}
                     />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Description</td>
                  <td>
                     <input
                        name="edit-description"
                        className={cx('input')}
                        defaultValue={owner.DESCRIPTION}
                        onChange={onChangeInfo}
                     />
                  </td>
               </tr>
               {owner.GENDER == 'Male' ? (
                  <div>
                     <input type="radio" name="gender" id="men" defaultChecked /> Nam
                     <input type="radio" name="gender" /> Nữ
                  </div>
               ) : (
                  <div>
                     <input type="radio" name="gender" id="men" /> Nam
                     <input type="radio" name="gender" defaultChecked /> Nữ
                  </div>
               )}
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
