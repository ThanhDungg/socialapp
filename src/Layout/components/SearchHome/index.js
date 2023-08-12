import classNames from 'classnames/bind';
import styles from './SearchHome.module.scss';
import ImgToProfile from '../../../components/ImgToProfile';
import { useEffect, useState } from 'react';
import { getData } from '../../../config/fetchData';
import { getListUser } from '../../../config/configs';
import Close from '../../../components/Close';

const cx = classNames.bind(styles);

function SearchHome({ handleHiddenShow }) {
   const [listUser, setListUser] = useState([]);

   const [nameUser, setNameUser] = useState('');

   const onChange = (e) => {
      setNameUser(e.target.value);
   };

   useEffect(() => {
      if (nameUser == '') {
         setListUser([]);
         return;
      } else {
         const fetchData = async () => {
            const res = await getData(getListUser + `?username=${nameUser}`, localStorage.getItem('accessToken'));
            console.log(res);
            setListUser(res.data.result);
         };
         fetchData();
      }
   }, [nameUser]);
   //    const listUser = [
   //       {
   //          ID: '202378142720426',
   //          USERNAME: 'khanh0710',
   //          FULLNAME: 'minh khánh',
   //          AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //       },
   //       {
   //          ID: '202378142720426',
   //          USERNAME: 'khanh0710',
   //          FULLNAME: 'minh khánh',
   //          AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //       },
   //       {
   //          ID: '202378142720426',
   //          USERNAME: 'khanh0710',
   //          FULLNAME: 'Nguyenasdasdasdadsdasdasdsasadsa minh khánh',
   //          AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //       },
   //       {
   //          ID: '202378142720426',
   //          USERNAME: 'khanh0710',
   //          FULLNAME: 'Nguyenasdasdasdadsdasdasdsasadsa minh khánh',
   //          AVATAR: 'https://drive.google.com/uc?export=view&id=1ykzTh94lBOt09jupQcdLeG1NflVo5jiq',
   //       },
   //    ];
   return (
      <div className={cx('wrapper')}>
         <Close onClick={handleHiddenShow} />
         <div className={cx('header')}>Search</div>
         <div className={cx('input-search')}>
            <input className={cx('input')} placeholder="Search" onChange={onChange} />
         </div>
         <div className={cx('body')}>
            <div className={cx('header-body')}>Recent</div>
            <div>
               {listUser.map((user) => {
                  return (
                     <div className={cx('user')}>
                        <ImgToProfile src={user.AVATAR} toLink={`/profile/${user.ID}`} />
                        <div>
                           <div className={cx('username')}>
                              <b>{user.USERNAME}</b>
                           </div>
                           <div>
                              <i>{user.FULLNAME}</i>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default SearchHome;
