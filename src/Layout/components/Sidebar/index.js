import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import SidebarChild from '../../../components/SidebarChild';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faBars,
   faBell,
   faHeart,
   faHome,
   faMagnifyingGlass,
   faMessage,
   faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import ImgToProfile from '../../../components/ImgToProfile';
import { useEffect, useState } from 'react';
import { getData } from '../../../config/fetchData';
import { getUser } from '../../../config/configs';
import SearchHome from '../SearchHome';
import Notifi from '../Notifi';

const cx = classNames.bind(styles);

function Sidebar({ handleCreatePost }) {
   const [user, setUser] = useState({ AVATAR: '' });
   const [showSearch, setShowSearch] = useState(false);
   const [showNoti, setShowNoti] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await getData(getUser + `/${localStorage.getItem('idUser')}`, '');
            console.log(res);
            setUser(res.data.result);
         } catch (e) {
            console.log(e);
         }
      };
      fetchData();
   }, []);

   const onClickSearch = () => {
      setShowSearch(!showSearch);
   };

   const onClickNoti = () => {
      setShowNoti(!showNoti);
   };

   return (
      <div className={cx('wrapper')}>
         {showSearch && <SearchHome handleHiddenShow={onClickSearch} />}
         {showNoti && <Notifi handleHiddenShow={onClickNoti} />}

         <div className={cx('title-app')}>Social app</div>
         <NavLink to={'/home'} className={cx('navlink')}>
            <div className={cx('btn-icon')}>
               <FontAwesomeIcon className={cx('icon')} icon={faHome} />
               HOME
            </div>
         </NavLink>
         <NavLink className={cx('navlink')}>
            <div className={cx('btn-icon')} onClick={onClickSearch}>
               <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
               SEARCH
            </div>
         </NavLink>
         <NavLink to={'/message'} className={cx('navlink')}>
            <div className={cx('btn-icon')}>
               <FontAwesomeIcon className={cx('icon')} icon={faMessage} />
               MESSAGE
            </div>
         </NavLink>

         <NavLink className={cx('navlink')}>
            <div className={cx('btn-icon')} onClick={onClickNoti}>
               <FontAwesomeIcon className={cx('icon')} icon={faBell} />
               NOTIFICATION
            </div>
         </NavLink>

         <NavLink className={cx('navlink')}>
            <div className={cx('btn-icon')} onClick={handleCreatePost}>
               <FontAwesomeIcon className={cx('icon')} icon={faSquarePlus} />
               CREATE
            </div>
         </NavLink>
         <div className={cx('btn-icon')}>
            <NavLink to={`/profile/${localStorage.getItem('idUser')}`} className={cx('navlink', 'profileNavLink')}>
               {/* <ImgToProfile src={user.AVATAR} /> */}
               <span className={cx('profile')}>PROFILE</span>
            </NavLink>
         </div>
         <div className={cx('btn-more')}>
            <FontAwesomeIcon className={cx('icon')} icon={faBars} />
            MORE
         </div>
      </div>
   );
}

export default Sidebar;
