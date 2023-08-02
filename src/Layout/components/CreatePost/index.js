import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import BtnNextPrev from '../../../components/BtnNextPrev';
import HeaderStatus from '../../../components/HeaderStatus';
import { postData } from '../../../config/fetchData';
import { postStatus } from '../../../config/configs';

const cx = classNames.bind(styles);

function CreatePost({ handleHiddenCreatePost, setIsLoading }) {
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
            setIsLoading(true);
            let formData = new FormData();
            formData.append('caption', document.getElementById('input-status').value);
            formData.append('file', listImg);
            const res = await postData(postStatus, formData, localStorage.getItem('accessToken'));
            console.log(res);
            if (res.data.status == 1) {
               setIsLoading(false);
               alert('Thanh cong');
            } else {
               setIsLoading(false);
               alert('That bai');
            }
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
                           <input id="input-img" name="files" type="file" hidden multiple onChange={chooseFile} />
                        </div>
                     ) : (
                        <div className={cx('place-img')}>
                           <img className={cx('img')} src={listImg[indexImg].preview} />
                           <BtnNextPrev handleNext={handleNext} handlePrev={handlePrev} />
                        </div>
                     )}
                  </div>
                  <div className={cx('status')}>
                     <div className={cx('header-status')}>
                        <HeaderStatus fullname="thanhdung2k" caption="" />
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
