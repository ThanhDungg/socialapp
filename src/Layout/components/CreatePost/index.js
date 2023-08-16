import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BtnNextPrev from '../../../components/BtnNextPrev';
import HeaderStatus from '../../../components/HeaderStatus';
import { img } from '../../../config';

const cx = classNames.bind(styles);

function CreatePost({ handleHiddenCreatePost, setIsLoading, user }) {
   const [listImg, setListImg] = useState([]);
   const [indexImg, setIndexImg] = useState(0);

   const chooseFile = (inputFile) => {
      const file = inputFile.currentTarget.files;
      Array.from(file).forEach((fi) => {
         fi.preview = URL.createObjectURL(fi);
         listImg.push(fi);
      });
      setListImg(Array.from(file));
   };

   const handleNext = () => {
      indexImg >= listImg.length - 1 ? setIndexImg(indexImg) : setIndexImg((index) => index + 1);
   };

   const handlePrev = () => {
      indexImg == 0 ? setIndexImg(0) : setIndexImg((index) => index - 1);
   };

   const handleSharePost = async () => {
      if (listImg.length == 0) {
         alert('Bạn chưa chọn hình');
      } else {
         if (!window.confirm('Bạn có muốn đăng bài?')) {
            return;
         } else {
            // console.log(listImg);
            await setIsLoading(true);
            let formData = new FormData();
            await formData.append('caption', document.getElementById('input-status').value);
            var tempImg = document.querySelector('[name = "files"]').files;
            // console.log(tempImg);
            for (let i = 0; i < tempImg.length; i++) {
               await formData.append('file', tempImg[i]);
               console.log(tempImg[i]);
            }
            await fetch(`https://ptit-social-app.onrender.com/api/post`, {
               method: 'POST',
               body: formData,
               headers: {
                  accessToken: localStorage.getItem('accessToken'),
               },
            })
               .then((json) => json.json())
               .then((res) => {
                  console.log(res);
                  if (res.status == 1) {
                     setIsLoading(false);
                     window.location.reload();
                  } else {
                     setIsLoading(false);
                     alert('That bai');
                  }
               })
               .catch((e) => {
                  console.log(e);
               });
         }
      }
   };

   return (
      <div className={cx('wrapper')}>
         <FontAwesomeIcon className={cx('icon-close')} onClick={handleHiddenCreatePost} icon={faClose} />
         <div className={cx('form')}>
            <div className={cx('place')}>
               <div className={cx('title')}>
                  <span>CreatePost</span>
                  <span className={cx('btn-share')} onClick={handleSharePost}>
                     Share
                  </span>
               </div>
               <div className={cx('content')}>
                  <div className={cx('body')}>
                     {listImg.length == 0 ? (
                        <div className={cx('input-img-place')}>
                           <label for="input-img" className={cx('btn-select-computer')}>
                              Select from your computer
                           </label>
                        </div>
                     ) : (
                        <div className={cx('place-img')}>
                           <img className={cx('img')} name="img-post" src={listImg[indexImg].preview} />
                           <BtnNextPrev handleNext={handleNext} handlePrev={handlePrev} />
                        </div>
                     )}
                     <input
                        id="input-img"
                        name="files"
                        type="file"
                        accept="image/*"
                        hidden
                        multiple
                        onChange={chooseFile}
                     />
                  </div>
                  <div className={cx('status')}>
                     <div className={cx('header-status')}>
                        <HeaderStatus
                           fullname={user != undefined ? user.USERNAME : 'user'}
                           caption=""
                           avatar={user != undefined ? user.AVATAR : img}
                        />
                     </div>
                     <div className={cx('body-status')}>
                        <textarea id="input-status" className={cx('input-status')} placeholder="Write a caption..." />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default CreatePost;
