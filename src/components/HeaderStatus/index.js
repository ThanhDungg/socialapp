import classNames from 'classnames/bind';
import styles from './HeaderStatus.module.scss';

import { img } from '../../config';
import ImgToProfile from '../ImgToProfile';

const cx = classNames.bind(styles);

function HeaderStatus({ fullname = '', caption = '', children, avatar }) {
   return (
      <div className={cx('header-status')}>
         <div className={cx('img-header')}>
            <ImgToProfile src={avatar} />
         </div>
         <div className={cx('name-header')}>
            <div className={cx('name-person-header')}>{fullname}</div>
            <div className={cx('time-status-header')}>{caption}</div>
            <div className={cx('more')}>{children}</div>
         </div>
      </div>
   );
}

export default HeaderStatus;
