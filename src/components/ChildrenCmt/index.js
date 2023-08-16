import classNames from 'classnames/bind';
import styles from './ChildrenCmt.module.scss';
import ImgToProfile from '../ImgToProfile';

const cx = classNames.bind(styles);

function ChildrenCmt({ content, avatar, username, time, idUser }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('header-cmt')}>
            <ImgToProfile src={avatar} toLink={`/profile/${idUser}`} />
            <div className={cx('username')}>{username}</div>
            <div>{content}</div>
         </div>
         <div className={cx('time')}>{time}</div>
      </div>
   );
}

export default ChildrenCmt;
