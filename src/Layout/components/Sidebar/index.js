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
import { img } from '../../../config';

const cx = classNames.bind(styles);

function Sidebar({ handleCreatePost }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('title-app')}>Social app</div>
         <NavLink to={'/home'} className={cx('navlink')}>
            <div className={cx('btn-icon')}>
               <FontAwesomeIcon className={cx('icon')} icon={faHome} />
               HOME
            </div>
         </NavLink>
         <NavLink className={cx('navlink')}>
            <div className={cx('btn-icon')}>
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
            <div className={cx('btn-icon')}>
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
            <NavLink to={'/profile'} className={cx('navlink', 'profileNavLink')}>
               <ImgToProfile src={img} />
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
