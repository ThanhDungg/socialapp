import classNames from 'classnames/bind';
import styles from './EditProfile.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { img } from '../../../config';

const cx = classNames.bind(styles);

function EditProfile({ handleEditProfile, handleCancelEditProfile }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('form-changepassword')}>
            <div>
               <ImgToProfile src={img} />
            </div>
            <div className={cx('form-input')}>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>User name</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Full name</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Address</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <tr className={cx('tr-title')}>
                  <td className={cx('td-title')}>Mobile</td>
                  <td>
                     <input type="password" className={cx('input')} />
                  </td>
               </tr>
               <input type="radio" name="gender" /> Nam
               <input type="radio" name="gender" /> Nữ
               <div className={cx('place-btn')}>
                  <button className={cx('btn-change')} onClick={handleEditProfile}>
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
